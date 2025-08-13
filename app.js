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

class Banco {
  constructor(nombre) {
    this.nombre = nombre;
  }

  abrirCuenta() {
    console.log(`--- Abrir cuenta en ${this.nombre}`);

    const nombreTitular = prompt("ingrese nombre del titular: ");
    const dni = prompt("ingrese el DNI del titular: ");

    const titular = new Titular(nombreTitular, dni);

    console.log(`Cuenta creada para: ${titular.Datos}`);
  }
}

const banco = new Banco("Banco Formosa ");
banco.abrirCuenta();
