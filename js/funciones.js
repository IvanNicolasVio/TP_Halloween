export function obtenerNuevoID() {
    var listaMonstruos = JSON.parse(localStorage.getItem('listaMonstruos')) || [];
    if (listaMonstruos.length === 0) {
      return 0;
    } else {
      var maxId = Math.max(...listaMonstruos.map(monstruo => monstruo.id));
      return maxId + 1;
    }
}

export function mostrar2botones()
{
  document.getElementById('guardar').style.visibility = 'hidden';
  document.getElementById('modificar').style.visibility = 'visible';
  document.getElementById('eliminar').style.visibility = 'visible';
}

export function normalizar()
{
  document.getElementById('guardar').style.visibility = 'visible';
  document.getElementById('modificar').style.visibility = 'hidden';
  document.getElementById('eliminar').style.visibility = 'hidden';
  document.getElementById('nombre').value = '';
  document.getElementById('alias').value = '';
  desmarcarCheckboxes();
  var radios = document.getElementsByName('defensa');
  radios[0].checked = true;
  document.getElementById('miedo').value = 50;
  document.getElementById('tipo').value = '';
}

function desmarcarCheckboxes() {
  var checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
  });
}

export function displaySpinner(display){
  var spinner = document.getElementById("spinner");
  if(display)
  {
    spinner.style.display = 'block';
  }else
  {
    setTimeout(() => {
      spinner.style.display = 'none';
    }, 2000);
    
  }
}