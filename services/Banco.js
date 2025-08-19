import Titular from "../models/Titular.js";
import CajaDeAhorro from "../models/CajaDeAhorro.js";
import CuentaCorriente from "../models/cuentaCorriente.js";

import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

export default class Banco {
  constructor(nombre) {
    this.nombre = nombre;
    this.cuentas = [];
  }

  abrirCuenta() {
    console.log(`--- Abrir cuenta en ${this.nombre} ---`);

    const nombreTitular = prompt("Ingrese nombre del titular: ");
    const dni = prompt("Ingrese el DNI del titular: ");
    const titular = new Titular(nombreTitular, dni);

    let tipoCuenta;
    do {
      tipoCuenta = parseInt(
        prompt("Ingrese el tipo de cuenta (1: Ahorro, 2: Corriente): ")
      );
      if (tipoCuenta !== 1 && tipoCuenta !== 2) {
        console.log("Tipo de cuenta inválido. Debe elegir 1 o 2.");
      }
    } while (tipoCuenta !== 1 && tipoCuenta !== 2);

    // validar saldo inicial
    let saldo;
    do {
      saldo = parseFloat(prompt("Ingrese saldo inicial: "));
      if (isNaN(saldo) || saldo < 0) {
        console.log("❌ Ingrese un número válido para el saldo.");
      }
    } while (isNaN(saldo) || saldo < 0);

    let cuenta;
    if (tipoCuenta === 1) {
      cuenta = new CajaDeAhorro(titular, saldo);
    } else {
      // validar límite descubierto
      let limiteDescubierto;
      do {
        limiteDescubierto = parseFloat(
          prompt("Ingrese el límite descubierto: ")
        );
        if (isNaN(limiteDescubierto) || limiteDescubierto < 0) {
          console.log(
            "❌ Ingrese un número válido para el límite descubierto."
          );
        }
      } while (isNaN(limiteDescubierto) || limiteDescubierto < 0);

      cuenta = new CuentaCorriente(titular, saldo, limiteDescubierto);
    }

    this.cuentas.push(cuenta);
    console.log(
      `✅ Cuenta abierta exitosamente para ${titular.Datos} con saldo inicial de $${saldo}.`
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

  depositarEnCuenta() {
    const numDeposito = parseInt(prompt("Número de cuenta: ")) - 1;
    if (numDeposito < 0 || numDeposito >= this.cuentas.length) {
      console.log("Número de cuenta inválido.");
      return;
    }
    const montoDep = parseFloat(prompt("Monto a depositar: "));
    this.cuentas[numDeposito].depositar(montoDep);
  }

  extraerDeCuenta() {
    const numExtraer = parseInt(prompt("Número de cuenta: ")) - 1;
    if (numExtraer < 0 || numExtraer >= this.cuentas.length) {
      console.log("Número de cuenta inválido.");
      return;
    }
    const montoExt = parseFloat(prompt("Monto a extraer: "));
    this.cuentas[numExtraer].extraer(montoExt);
  }

  transferirEntreCuenta() {
    console.log("---Transferencias---");
    this.mostrarCuentas();

    const numOrigen =
      parseInt(
        prompt("Elija la cuenta que va transferir la plata  (número): ")
      ) - 1;
    const numDestino =
      parseInt(
        prompt("Elija la cuenta que va recibir la transferencia (número): ")
      ) - 1;

    // validaciones
    if (
      numOrigen < 0 ||
      numOrigen >= this.cuentas.length ||
      numDestino < 0 ||
      numDestino >= this.cuentas.length
    ) {
      console.log("Número de cuenta inválido.");
      return;
    }

    if (numOrigen === numDestino) {
      console.log("No puede transferirse a la misma cuenta.");
      return;
    }

    const monto = parseFloat(prompt("Ingrese cuanto quiere transferir: "));

    const saldoAntes = this.cuentas[numOrigen].saldo;
    this.cuentas[numOrigen].extraer(monto);

    if (this.cuentas[numOrigen].saldo < saldoAntes) {
      this.cuentas[numDestino].depositar(monto);
      console.log(
        `Transferencia exitosa de $${monto} de ${this.cuentas[numOrigen].titular.nombre} a ${this.cuentas[numDestino].titular.nombre}`
      );
    } else {
      console.log("No se pudo realizar la transferencia.");
      return;
    }
  }
}
