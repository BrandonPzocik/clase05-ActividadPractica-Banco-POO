import Cuenta from "./Cuenta.js";

export default class CuentaCorriente extends Cuenta {
  constructor(titular, saldo, limiteDescubierto) {
    super(titular, saldo);
    this.limiteDescubierto = limiteDescubierto;
  }

  extraer(monto) {
    if (monto <= 0) {
      console.log("Monto inválido.");
    } else if (monto <= this.saldo + this.limiteDescubierto) {
      this._retirar(monto);
      console.log(`Extracción exitosa. Saldo actual: ${this.saldo}`);
    } else {
      console.log("Fondos insuficientes en la Cuenta Corriente.");
    }
  }
}
