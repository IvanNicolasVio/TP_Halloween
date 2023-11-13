import { Monstruo } from './mounstruo.js';

let idAutoincremental = 1;
function obtenerNuevoID() {
  return idAutoincremental++;
}

document.addEventListener('DOMContentLoaded', function () {
  const tipoSelect = document.getElementById('tipo');
  const tipos = ["Esqueleto", "Zombie", "Vampiro", "Fantasma", "Bruja", "Hombre lobo"];
  tipos.forEach(function (tipo) {
    const option = document.createElement('option');
    option.value = tipo.toLowerCase();
    option.textContent = tipo;
    tipoSelect.appendChild(option);
  });
  mostrarMonstruosEnTabla();
});


document.getElementById('guardar').addEventListener('click', function () {
  const defensaOptions = document.getElementsByName('defensa');
  const defensa = [...defensaOptions].find(option => option.checked).value;
  const monstruo = new Monstruo(obtenerNuevoID(),document.getElementById('nombre').value,document.getElementById('alias').value,defensa,document.getElementById('miedo').value,document.getElementById('tipo').value)
  const listaMonstruos = JSON.parse(localStorage.getItem('listaMonstruos')) || [];
  listaMonstruos.push(monstruo);
  localStorage.setItem('listaMonstruos', JSON.stringify(listaMonstruos));
  mostrarMonstruosEnTabla();
  alert('Monstruo guardado exitosamente');
});


function mostrarMonstruosEnTabla() {
  const listaMonstruos = JSON.parse(localStorage.getItem('listaMonstruos')) || [];
  const cuerpoTabla = document.querySelector('table tbody');
  cuerpoTabla.innerHTML = '';
  listaMonstruos.forEach(monstruo => {
      const fila = cuerpoTabla.insertRow();
      fila.insertCell(0).textContent = monstruo.nombre;
      fila.insertCell(1).textContent = monstruo.alias;
      fila.insertCell(2).textContent = monstruo.defensa;
      fila.insertCell(3).textContent = monstruo.miedo;
      fila.insertCell(4).textContent = monstruo.tipo;
  });
}

//localStorage.clear();



