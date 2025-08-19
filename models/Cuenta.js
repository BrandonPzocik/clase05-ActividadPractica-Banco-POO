export default class Cuenta {
  #saldo;
  constructor(titular, saldo) {
    this.titular = titular;
    this.#saldo = saldo;
  }

  get saldo() {
    return this.#saldo;
  }

  depositar(monto) {
    if (monto > 0) {
      this.#saldo += monto;
      console.log(`Depósito exitoso. Saldo actual: ${this.saldo}`);
    } else {
      console.log("Monto inválido para depositar.");
    }
  }

  _retirar(monto) {
    this.#saldo -= monto;
  }

  extraer(monto) {
    if (monto > 0 && monto <= this.#saldo) {
      this._retirar(monto);
      console.log(`Extracción exitosa. Saldo actual: ${this.saldo}`);
    } else {
      console.log("Fondos insuficientes en la cuenta.");
    }
  }
}