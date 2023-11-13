
document.addEventListener('DOMContentLoaded', function () {
    const formularioContainer = document.getElementById('monstruo-form-container');
    const monstruosGuardados = JSON.parse(localStorage.getItem('listaMonstruos')) || [];
    monstruosGuardados.forEach(monstruo => {
        const formulario = document.createElement('form');
        agregarCampoAlFormulario(formulario, 'Alias', monstruo.alias);
        agregarCampoAlFormulario(formulario, 'Nombre', monstruo.nombre);
        agregarCampoAlFormulario(formulario, 'Miedo', monstruo.miedo);
        agregarCampoAlFormulario(formulario, 'Defensa', monstruo.defensa);
        agregarCampoAlFormulario(formulario, 'Tipo', monstruo.tipo);
        formularioContainer.appendChild(formulario);
    });

    function agregarCampoAlFormulario(formulario, etiqueta, valor) {

        const etiquetaElemento = document.createElement('label');
        etiquetaElemento.textContent = `${etiqueta}: ${valor}`;
        formulario.appendChild(etiquetaElemento);

    }
});