export class Personaje {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    mostrarInformacion() {
        console.log(`ID: ${this.id}, Nombre: ${this.nombre}`);
    }
}
