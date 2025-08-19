export default class Titular {
  constructor(nombre, dni) {
    this.nombre = nombre;
    this.dni = dni;
  }

  get Datos() {
    return `${this.nombre} DNI: ${this.dni}`;
  }
}
