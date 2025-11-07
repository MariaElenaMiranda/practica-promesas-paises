import { regionesDB } from '../../public/data/info.js';

//Función para obtener el nombre de la región del pais mediante una promesa
export function getRegion(id) {
  console.log('----------------------------------------------');
  console.log('Llamando a función getRegion();');
  console.log('----------------------------------------------');

  const promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      const region = regionesDB.find( region => region.id === Number(id))?.region;
      if(region) {
        resolve(region);
      }else {
        reject(`La región con ID ${id} no existe.`)
      }
    },800);
  });
  return promesa;
}