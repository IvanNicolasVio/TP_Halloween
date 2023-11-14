import { Monstruo } from './mounstruo.js';
import {displaySpinner} from './funciones.js';
import {mostrar2botones} from './funciones.js';
import {normalizar} from './funciones.js';
import {obtenerNuevoID} from './funciones.js';
//localStorage.clear();

document.addEventListener('DOMContentLoaded', function () {
  displaySpinner(true);
  normalizar();
  const tipoSelect = document.getElementById('tipo');
  const tipos = ["Esqueleto", "Zombie", "Vampiro", "Fantasma", "Bruja", "Hombre lobo"];
  tipos.forEach(function (tipo) {
    const option = document.createElement('option');
    option.value = tipo.toLowerCase();
    option.textContent = tipo;
    tipoSelect.appendChild(option);
  });
  mostrarMonstruosEnTabla();
  document.getElementById('modificar').style.visibility = 'hidden';
  document.getElementById('eliminar').style.visibility = 'hidden';
  displaySpinner(false);
});


document.getElementById('guardar').addEventListener('click', function () {
  displaySpinner(true);
  const defensaOptions = document.getElementsByName('defensa');
  const defensa = [...defensaOptions].find(option => option.checked).value;
  const monstruo = new Monstruo(obtenerNuevoID(),document.getElementById('nombre').value,document.getElementById('alias').value,defensa,document.getElementById('miedo').value,document.getElementById('tipo').value,obtenerValor())
  const listaMonstruos = JSON.parse(localStorage.getItem('listaMonstruos')) || [];
  listaMonstruos.push(monstruo);
  localStorage.setItem('listaMonstruos', JSON.stringify(listaMonstruos));
  mostrarMonstruosEnTabla();
  normalizar();
  displaySpinner(false);
});


function obtenerValor()
{
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
  console.log(checkboxes.values);
  var valoresSeleccionados = [];
  checkboxes.forEach(function(checkbox) {
    valoresSeleccionados.push(checkbox.value);
  });
  return valoresSeleccionados
}

function mostrarMonstruosEnTabla() {
  const listaMonstruos = JSON.parse(localStorage.getItem('listaMonstruos')) || [];
  const cuerpoTabla = document.querySelector('table tbody');
  cuerpoTabla.innerHTML = '';
  listaMonstruos.forEach(monstruo => {
      const fila = cuerpoTabla.insertRow();
      fila.id = monstruo.id;
      fila.insertCell(0).textContent = monstruo.nombre;
      fila.insertCell(1).textContent = monstruo.alias;
      fila.insertCell(2).textContent = monstruo.defensa;
      fila.insertCell(3).textContent = monstruo.miedo;
      fila.insertCell(4).textContent = monstruo.tipo;
      fila.insertCell(5).textContent = monstruo.origen;
  });
}

document.getElementById('tabla').addEventListener('click', function (event) {
  mostrar2botones();
  if (event.target.tagName === 'TD') {
    var fila = event.target.parentNode;
  }
  const idFila = fila.id;
  const nombre = fila.cells[0].innerHTML;
  const alias = fila.cells[1].innerHTML;
  const defensa = fila.cells[2].innerHTML;
  const miedo = fila.cells[3].innerHTML;
  const tipo = fila.cells[4].innerHTML;
  const origen = fila.cells[5].innerHTML;
  document.getElementById('nombre').value = nombre;
  document.getElementById('alias').value = alias;
  var radios = document.getElementsByName('defensa');
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].value === defensa) {
      radios[i].checked = true;
    }
  }
  marcarCheckboxes(origen);
  document.getElementById('miedo').value = miedo;
  document.getElementById('tipo').value = tipo;
  document.getElementById('modificar').setAttribute('data-idfila', idFila);
  document.getElementById('eliminar').setAttribute('data-idfila', idFila);
});

function marcarCheckboxes(string) {
  var checkboxes = document.querySelectorAll('input[type=checkbox]');
  var palabras = string.split(',');
  checkboxes.forEach(function(checkbox) {
      palabras.forEach(function(palabra) {
          if (checkbox.value.trim() === palabra.trim()) {
              checkbox.checked = true;
          }
      });
  });
}



document.getElementById('modificar').addEventListener('click', function () {
  displaySpinner(true);
  const listaMonstruos = JSON.parse(localStorage.getItem('listaMonstruos')) || [];
  const idFila = document.getElementById('modificar').getAttribute('data-idfila');
  console.log(idFila);
  const defensaOptions = document.getElementsByName('defensa');
  const defensa = [...defensaOptions].find(option => option.checked).value;
  const origen = obtenerValor()
  for (const monstruo of listaMonstruos) {
    if (monstruo.id.toString() === idFila) {
      monstruo.nombre = document.getElementById('nombre').value;
      monstruo.alias = document.getElementById('alias').value;
      monstruo.defensa = defensa;
      monstruo.miedo = document.getElementById('miedo').value;
      monstruo.tipo = document.getElementById('tipo').value;
      monstruo.origen = origen;
    }
  }
  localStorage.setItem('listaMonstruos', JSON.stringify(listaMonstruos));
  mostrarMonstruosEnTabla();
  normalizar();
  displaySpinner(false);
});

document.getElementById('eliminar').addEventListener('click', function () {
  displaySpinner(true);
  const listaMonstruos = JSON.parse(localStorage.getItem('listaMonstruos')) || [];
  const idFila = document.getElementById('eliminar').getAttribute('data-idfila');
  console.log(idFila);
  const index = listaMonstruos.findIndex(monstruo => monstruo.id.toString() === idFila);
  listaMonstruos.splice(index, 1);
  localStorage.setItem('listaMonstruos', JSON.stringify(listaMonstruos));
  mostrarMonstruosEnTabla();
  normalizar();
  displaySpinner(false);
});

