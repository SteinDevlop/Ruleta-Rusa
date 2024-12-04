class Nodo {
  constructor(valor) {
    this.dato = valor;
    this.siguiente = null;
  }
}

export class ColaArray {
  static CAPACIDAD = 4;
  constructor() {
    this.data = new Array(ColaArray.CAPACIDAD).fill(null);
    this.size = 0;
    this.front = 0;
  }

  len() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  first() {
    if (this.isEmpty()) {
      return null;
    } else {
      return this.data[this.front];
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    } else {
      const aux = this.data[this.front];
      this.data[this.front] = null;
      this.front = (this.front + 1) % this.data.length;
      this.size--;
      return aux;
    }
  }

  enqueue(data) {
    if (this.size === this.data.length) {
      console.log("La cola está llena");
      return null;
    }
    const avail = (this.front + this.size) % this.data.length;
    this.data[avail] = data;
    this.size++;
  }
}

export class ListaCircular {
  constructor() {
    this.ultimo = null;
    this.size = 0;
  }

  esta_vacia() {
    return this.ultimo === null;
  }

  insertar(valor) {
    const nuevo_nodo = new Nodo(valor);
    if (this.esta_vacia()) {
      this.ultimo = nuevo_nodo;
      nuevo_nodo.siguiente = nuevo_nodo;
    } else {
      nuevo_nodo.siguiente = this.ultimo.siguiente;
      this.ultimo.siguiente = nuevo_nodo;
      this.ultimo = nuevo_nodo;
    }
    this.size++;
  }

  borrado(entrada) {
    if (this.esta_vacia()) {
      console.log("La lista está vacía, no se puede eliminar ningún elemento.");
      return;
    }
    let actual = this.ultimo;
    let encontrado = false;
    while (actual.siguiente !== this.ultimo && !encontrado) {
      encontrado = actual.siguiente.dato === entrada;
      if (!encontrado) {
        actual = actual.siguiente;
      }
    }
    encontrado = actual.siguiente.dato === entrada;
    if (encontrado) {
      const p = actual.siguiente;
      if (this.ultimo === this.ultimo.siguiente) {
        this.ultimo = null;
      } else {
        if (p === this.ultimo) {
          this.ultimo = p.siguiente;
        }
        actual.siguiente = p.siguiente;
      }
      this.size--;
    } else {
      console.log(`El dato ${entrada} no se encontró en la lista.`);
    }
  }

  mostrar() {
    if (this.esta_vacia()) {
      console.log("La lista está vacía.");
      return;
    }
    let actual = this.ultimo.siguiente;
    let output = "";
    do {
      output += actual.dato + " ";
      actual = actual.siguiente;
    } while (actual !== this.ultimo.siguiente);
    return output.trimEnd();
  }

  contar_elementos() {
    if (this.esta_vacia()) {
      return 0;
    }
    let contador = 0;
    let actual = this.ultimo.siguiente;
    do {
      contador++;
      actual = actual.siguiente;
    } while (actual !== this.ultimo.siguiente);
    return contador;
  }

  existe_elemento(n) {
    if (this.esta_vacia()) {
      return false;
    }
    let actual = this.ultimo.siguiente;
    do {
      if (actual.dato === n) {
        return true;
      }
      actual = actual.siguiente;
    } while (actual !== this.ultimo.siguiente);
    return false;
  }
}
