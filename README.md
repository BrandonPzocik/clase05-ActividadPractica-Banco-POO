# Actividad Practica - POO - Sistema de Banco

## Integrantes:

#### Pzocik Brandon

#### Aquino Nazarena

#### Leger Axel

## Descripción

Este programa simula el funcionamiento básico de un banco con diferentes tipos de cuentas:

- **Caja de Ahorro**
- **Cuenta Corriente**

Permite:

- Abrir cuentas
- Mostrar cuentas existentes
- Depositar dinero
- Extraer dinero
- Salir del programa

La interacción se realiza por **consola** usando [`prompt-sync`].

---

## 📂 Diagrama de Clases (ASCII)

             +------------------+
             |     Titular       |
             +-------------------+
             | - nombre          |
             | - dni             |
             +-------------------+
             | + Datos           |
             +-------------------+

            +------------------+
            | Cuenta           |
            +------------------+
            | - #saldo         |
            | + titular        |
            +------------------+
            | + saldo()        |
            | + depositar()    |
            | + extraer()      |
            +------------------+

                +----------------------+
                | CajaDeAhorro         |
                +----------------------+
                | extraer()            |
                +----------------------+

                +----------------------+
                | CuentaCorriente      |
                +----------------------+
                | - limiteDescubierto  |
                | + extraer()          |
                +----------------------+

                +----------------------+
                |        Banco         |
                +----------------------+
                | - nombre             |
                | - cuentas[]          |
                +----------------------+
                | + abrirCuenta()      |
                | + mostrarCuentas()   |
                +----------------------+

---

## 🛠 Decisiones de Diseño

1. **Encapsulamiento:**  
   El saldo (`#saldo`) en la clase `Cuenta` es privado para evitar modificaciones directas fuera de la clase.
2. **Herencia:**  
   `CajaDeAhorro` y `CuentaCorriente` extienden `Cuenta` y redefinen el método `extraer()` para manejar reglas específicas.
3. **Banco como controlador:**  
   La clase `Banco` gestiona todas las cuentas y centraliza las operaciones de apertura y visualización.

---

## ▶️ Cómo correr el programa

### 1️⃣ Requisitos previos

- Tener instalado **Node.js** en tu sistema.

### 2️⃣ Clonar o descargar el código

```bash
git clone https://github.com/BrandonPzocik/clase05-ActividadPractica-Banco-POO.git
cd Clase05-ActividadPractica
node ./app.js
```

## Ejemplo de uso

--- MENU BANCO ---

1. Abrir cuenta
2. Mostrar cuentas
3. Depositar
4. Extraer
5. Salir
   Elija una opción: 1
   ingrese nombre del titular: Juan Perez
   ingrese el DNI del titular: 12345678
   Ingrese el tipo de cuenta (1: Ahorro, 2: Corriente): 1
   Ingrese saldo inicial: 1000
   Cuenta abierta exitosamente para Juan Perez DNI: 12345678 con saldo inicial de $1000.
