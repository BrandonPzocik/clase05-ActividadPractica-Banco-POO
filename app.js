const prompt = require("prompt-sync")({ sigint: true });

class Titular {
  constructor(nombre, dni) {
    this.nombre = nombre;
    this.dni = dni;
  }

  get Datos() {
    return `${this.nombre} DNI: ${this.dni}`;
  }
}

class Cuenta {
  #saldo;
  constructor(titular, saldo) {
    this.titular = titular;
    this.#saldo = saldo;
  }

  get saldo() {
    return this.#saldo;
  }

  depositar(monto) {
    this.#saldo += monto;
  }

  extraer(monto) {
    if (monto > 0 && monto <= this.#saldo) {
      this.#saldo -= monto;
      console.log(`Extracción exitosa. Saldo actual: ${this.saldo}`);
    } else {
      console.log("Fondos insuficientes en la cuenta.");
    }
  }
}

class CajaDeAhorro extends Cuenta {
  extraer(monto) {
    if (monto > 0 && monto <= this.saldo) {
      super.extraer(monto);
      console.log(`Extracción exitosa. Saldo actual: ${this.saldo}`);
    } else {
      console.log("Fondos insuficientes en la Caja de Ahorro.");
    }
  }
}

class CuentaCorriente extends Cuenta {
  constructor(titular, saldo, limiteDescubierto) {
    super(titular, saldo);
    this.limiteDescubierto = limiteDescubierto;
  }

  extraer(monto) {
    if (monto > 0 && monto <= this.saldo + this.limiteDescubierto) {
      super.extraer(monto);
      console.log(`Extracción exitosa. Saldo actual: ${this.saldo}`);
    } else {
      console.log("Fondos insuficientes en la Cuenta Corriente.");
    }
  }
}

class Banco {
  constructor(nombre) {
    this.nombre = nombre;
    this.cuentas = [];
  }

  abrirCuenta() {
    console.log(`--- Abrir cuenta en ${this.nombre}`);

    const nombreTitular = prompt("ingrese nombre del titular: ");
    const dni = prompt("ingrese el DNI del titular: ");

    const titular = new Titular(nombreTitular, dni);

    const tipoCuenta = parseInt(
      prompt("Ingrese el tipo de cuenta (1: Ahorro, 2: Corriente): ")
    );

    if (tipoCuenta !== 1 && tipoCuenta !== 2) {
      console.log(
        "Tipo de cuenta invalido, debe elegir entre una de las opciones: 1 o 2."
      );
      return;
    }
    const saldo = parseFloat(prompt("Ingrese saldo inicial: "));
    let cuenta;
    if (tipoCuenta === 1) {
      cuenta = new CajaDeAhorro(titular, saldo);
    } else if (tipoCuenta === 2) {
      const limiteDescubierto = parseFloat(
        prompt("Ingrese el limite descubierto: ")
      );
      cuenta = new CuentaCorriente(titular, saldo, limiteDescubierto);
    }
    this.cuentas.push(cuenta);
    console.log(
      `Cuenta abierta exitosamente para ${titular.Datos} con saldo inicial de $${saldo}.`
    );
  }

  mostrarCuentas() {
    console.log(`--- Cuentas de ${this.nombre} ---`);
    this.cuentas.forEach((cuenta, i) => {
      console.log(
        `${i + 1}. ${cuenta.titular.Datos} - Saldo: $${cuenta.saldo}`
      );
    });
  }
}

const banco = new Banco("Banco Formosa ");
let opcion;
do {
  console.log("\n--- MENU BANCO ---");
  console.log("1. Abrir cuenta");
  console.log("2. Mostrar cuentas");
  console.log("3. Depositar");
  console.log("4. Extraer");
  console.log("5. Salir");

  opcion = parseInt(prompt("Elija una opción: "));

  switch (opcion) {
    case 1:
      banco.abrirCuenta();
      break;
    case 2:
      banco.mostrarCuentas();
      break;
    case 3:
      const numDeposito = parseInt(prompt("Número de cuenta: ")) - 1;
      const montoDep = parseFloat(prompt("Monto a depositar: "));
      banco.cuentas[numDeposito].depositar(montoDep);
      console.log("Depósito realizado");
      break;
    case 4:
      const numExtraer = parseInt(prompt("Número de cuenta: ")) - 1;
      if (numExtraer < 0 || numExtraer >= banco.cuentas.length) {
        console.log("Número de cuenta inválido.");
        break;
      }
      const montoExt = parseFloat(prompt("Monto a extraer: "));
      banco.cuentas[numExtraer].extraer(montoExt);
      break;
    case 5:
      console.log("Saliendo...");
      break;
    default:
      console.log("Opción inválida");
  }
} while (opcion !== 5);
