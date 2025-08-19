import Banco from "./services/Banco.js";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });
const banco = new Banco("Banco Formosa");

let opcion;
do {
  console.log("\n--- MENU BANCO ---");
  console.log("1. Abrir cuenta");
  console.log("2. Mostrar cuentas");
  console.log("3. Depositar");
  console.log("4. Extraer");
  console.log("5. Transferir");
  console.log("6. Salir");

  opcion = parseInt(prompt("Elija una opción: "));

  switch (opcion) {
    case 1: banco.abrirCuenta(); break;
    case 2: banco.mostrarCuentas(); break;
    case 3: banco.depositarEnCuenta(); break;
    case 4: banco.extraerDeCuenta(); break;
    case 5: banco.transferirEntreCuenta(); break;
    case 6: console.log("Saliendo..."); break;
    default: console.log("Opción inválida.");
  }
} while (opcion !== 6);
