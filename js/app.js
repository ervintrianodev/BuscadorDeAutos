const resultadoContainer = document.getElementById("resultado");

//Selects
const selectMarca = document.getElementById('marca');
const selectYear = document.getElementById('year');
const selectMinimo = document.getElementById('minimo');
const selectMaximo = document.getElementById('maximo');
const selectPuertas = document.getElementById('puertas');
const selectTransmision = document.getElementById('transmision');
const selectColor = document.getElementById('color');

const maxDate = new Date().getFullYear();
const minDate = new Date().getFullYear() - 10;

const parametrosBusqueda = {
    marca: '',
    year: '',
    pMinimo: '',
    pMaximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos);
    //Rellenar el select
    fillSelect();
    selectMarca.addEventListener('change', (e) => {
        parametrosBusqueda.marca = e.target.value;
        filtrarAuto();

    });
    selectYear.addEventListener('change', (e) => {
        parametrosBusqueda.year = parseInt(e.target.value);
        filtrarAuto();
    });
    selectMinimo.addEventListener('change', (e) => {
        parametrosBusqueda.pMinimo = parseInt(e.target.value);
        filtrarAuto();
    })
    selectMaximo.addEventListener('change', (e) => {
        parametrosBusqueda.pMaximo = parseInt(e.target.value);
        filtrarAuto();
    });
    selectPuertas.addEventListener('change', (e) => {
        parametrosBusqueda.puertas = parseInt(e.target.value);
        filtrarAuto();
    });

    selectTransmision.addEventListener('change', (e) => {

        parametrosBusqueda.transmision = e.target.value.toLowerCase();
        filtrarAuto();
    });
    selectColor.addEventListener('change', (e) => {
        parametrosBusqueda.color = e.target.value;
        filtrarAuto();
    });


});

function mostrarAutos(autos) {
    clearHTML();
    autos.forEach((auto) => {
        const {
            marca,
            modelo,
            year,
            precio,
            puertas,
            color,
            transmision
        } = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            Marca: ${marca} - Modelo: ${modelo} - Anio: ${year} - Precio: ${precio} - Color: ${color} - Puertas: ${puertas} - Transmision: ${transmision}
        `
        resultadoContainer.appendChild(autoHTML);
    });
}
function noResult(){
    clearHTML();
    const noResultContainer = document.createElement('div');
    noResultContainer.classList.add('alerta','error');
    noResultContainer.textContent='No hay resultados, intenta con otros teminos de busqueda';
    resultadoContainer.appendChild(noResultContainer);
}

function clearHTML() {
    while (resultadoContainer.firstChild) {
        resultadoContainer.removeChild(resultadoContainer.firstChild);
    }
}

function fillSelect() {
    for (let i = maxDate; i >= minDate; i--) {
        const option = document.createElement('option');
        option.setAttribute('value', i);
        option.textContent = i;
        selectYear.appendChild(option)
    }
}

function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarPrecio).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    console.log(resultado);
    if(resultado.length>0){
        mostrarAutos(resultado);

    }else{
        noResult();
    }
}

function filtrarMarca(auto) {
    if (parametrosBusqueda.marca) {
        return parametrosBusqueda.marca === auto.marca;
    }
    return auto;
}

function filtrarYear(auto) {
    if (parametrosBusqueda.year) {
        return parametrosBusqueda.year === auto.year;
    }
    return auto;
}

function filtrarPrecio(auto) {
    if (parametrosBusqueda.pMinimo) {
        return auto.precio >= parametrosBusqueda.pMinimo;
    }
    if (parametrosBusqueda.pMaximo) {
        return auto.precio <= parametrosBusqueda.pMaximo;
    }
    if (parametrosBusqueda.pMinimo && parametrosBusqueda.pMaximo) {
        return auto.precio >= parametrosBusqueda.pMinimo && auto.precio <= parametrosBusqueda.pMaximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    if (parametrosBusqueda.puertas) {
        return auto.puertas === parametrosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    if (parametrosBusqueda.transmision) {
        return auto.transmision === parametrosBusqueda.transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    if (parametrosBusqueda.color) {
        return auto.color == parametrosBusqueda.color;
    }
    return auto;
}