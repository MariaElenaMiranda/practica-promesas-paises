import { getPais } from './services/getPaisService.js';
import { getRegion } from './services/getRegionService.js';

//Elementos del DOM
const inputId = document.getElementById('id-input-pais');
const btnSeeCountry = document.getElementById('boton-ver-pais');
const containerResponse = document.getElementById('contenedor-resultados');
const btnSeeRegion = document.getElementById('boton-ver-región');

//Función Botón: Consume la promesa con .then() y .catch() y muestra el país mediante el id
//Si tiene éxito, habilita el botón de la región
function mostrarPaisThen(id) {
  console.log('----------------------------------------------');
  console.log('Llamando a función mostrarPaisThen();');
  console.log('----------------------------------------------');

  containerResponse.textContent = '';
  containerResponse.className = '';
  let mensaje = document.createElement('p');
  btnSeeRegion.disabled = true;

  getPais(id)
  .then((pais) => {
    mensaje.textContent =`El país con ID ${id} es: ${pais}.`;
    mensaje.className = 'text-success-emphasis';
    containerResponse.appendChild(mensaje);
    console.log('Promise resolve: La promesa está resulta y pasa por el then()');
    btnSeeRegion.disabled = false; //habilitamos el botón ahora
    console.log(mensaje);
  })
  .catch((error) => {
    mensaje.textContent = error;
    mensaje.className = 'text-danger-emphasis';
    containerResponse.appendChild(mensaje);
    console.log('Promise reject: La promesa está rechazada y pasa por el catch()');
    console.log(mensaje);
  })
}

//Función Botón 2: Utiliza Promise.All y muestra el país junto a su región
function mostrarPaisRegion(id) {
  console.log('----------------------------------------------');
  console.log('Llamando a función mostrarPaisRegion();');
  console.log('----------------------------------------------');

  containerResponse.textContent = '';
  containerResponse.className = '';
  let mensaje = document.createElement('p');

  Promise.all([getPais(id), getRegion(id)])
  .then((paisRegion) => {
    const [pais, region] = paisRegion;
    mensaje.textContent =`La región del país ${pais} con ID ${id} es: ${region}.`;
    mensaje.className = 'text-success-emphasis';
    containerResponse.appendChild(mensaje);
    console.log('Promise resolve: La promesa está resulta y pasa por el then()');
    console.log(mensaje);
  })
  .catch((error) => {
    mensaje.textContent = error;
    mensaje.className = 'text-danger-emphasis';
    containerResponse.appendChild(mensaje);
    console.log('Promise reject: La promesa está rechazada y pasa por el catch()');
    console.log(mensaje);
  })
}

//Botón "Ver País, que obtiene el ID y llama a la función mostrarPaisThen"
btnSeeCountry.addEventListener('click', () => {
  console.log('----------------------------------------------');
  console.log('Click en el botón "Ver País"(addEventListener)');
  console.log('----------------------------------------------');

  const id = inputId.value;
  let mensaje = document.createElement('p');
  if(isNaN(id) || id === '' || id === null) {
    containerResponse.textContent = '';
    containerResponse.className = '';
    mensaje.textContent = 'Por favor, ingresa un ID válido';
    mensaje.className = 'text-warning-emphasis';
    containerResponse.appendChild(mensaje);
    console.log(mensaje);
    btnSeeRegion.disabled = true;
  }else {
    mostrarPaisThen(id);
  }
});

//Botón "Ver Región, que obtiene el ID y llama a la función mostrarPaisRegion"
btnSeeRegion.addEventListener('click', () => {
  console.log('----------------------------------------------');
  console.log('Click en el botón "Ver región"(addEventListener)');
  console.log('----------------------------------------------');
  const id = inputId.value;

  if(id) {
    mostrarPaisRegion(id);
  }
  });