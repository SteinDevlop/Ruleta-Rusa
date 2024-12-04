import { ListaCircular } from "./estructuras.js";

class Pistola {
  constructor(nmaxP = 6) {
    this.tambor = this.generar_nodos(nmaxP);
    this.num_espacios_tambor = this.tambor.contar_elementos();
  }

  generar_nodos(capacidad) {
    const tambor = new ListaCircular();
    for (let i = 0; i < capacidad; i++) {
      tambor.insertar(0);
    }
    return tambor;
  }

  cargar(n, nMax = null, nMin = 1) {
    if (nMax === null) {
      nMax = this.num_espacios_tambor - 1;
    }
    let balas_cargadas = 0;
    while (balas_cargadas < n) {
      const pasos = Math.floor(Math.random() * (nMax + 1)) + 1;
      let actual = this.tambor.ultimo.siguiente;
      for (let i = 0; i < pasos; i++) {
        actual = actual.siguiente;
      }
      if (actual.dato === 0) {
        actual.dato = 1;
        balas_cargadas++;
      }
    }
  }

  girar() {
    const pasos =
      Math.floor(Math.random() * (this.num_espacios_tambor + 1)) + 1;
    let actual = this.tambor.ultimo.siguiente;
    for (let i = 0; i < pasos; i++) {
      actual = actual.siguiente;
    }
    this.tambor.ultimo = actual;
    return pasos + 1;
  }

  contar_balas_cargadas() {
    if (this.tambor.esta_vacia()) {
      return 0;
    }
    let contador = 0;
    let actual = this.tambor.ultimo.siguiente;
    do {
      if (actual.dato === 1) {
        contador++;
      }
      actual = actual.siguiente;
    } while (actual !== this.tambor.ultimo.siguiente);
    return contador;
  }

  disparar() {
    let actual = this.tambor.ultimo.siguiente;
    if (actual.dato === 1) {
      console.log("¡BANG!");
      actual.dato = 0;
    } else {
      console.log("Clic");
    }
    this.tambor.ultimo = actual;
  }
}

export class PistolaSolo extends Pistola {
  constructor(tam_tambor, num_balas) {
    super();
    this.tambor = this.generar_nodos(tam_tambor);
    this.cargar(num_balas, tam_tambor - 1);
  }
}

export class PistolaCoop extends Pistola {
  constructor(jugadores, balas) {
    super();
    this.cargar(balas, null, jugadores - 1);
  }
}
