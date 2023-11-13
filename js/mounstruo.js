import { Personaje } from './personaje.js';

export class Monstruo extends Personaje {
    constructor(id, nombre, alias, defensa, miedo,tipo) {
        super(id, nombre);
        this.alias = alias;
        this.defensa = defensa;
        this.miedo = miedo;
        this.tipo = tipo;
    }

    mostrarInformacion() {
        super.mostrarInformacion();
        console.log(`Alias: ${this.alias}, Defensa: ${this.defensa}, Miedo: ${this.miedo}`);
    }
}
