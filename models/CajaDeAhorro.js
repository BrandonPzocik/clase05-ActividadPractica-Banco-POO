import Cuenta from "./Cuenta.js";

export default class CajaDeAhorro extends Cuenta {
  extraer(monto) {
    if (monto > 0 && monto <= this.saldo) {
      super.extraer(monto);
    } else {
      console.log("Fondos insuficientes en la Caja de Ahorro.");
    }
  }
}