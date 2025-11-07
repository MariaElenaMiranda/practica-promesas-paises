import { dataDB } from '../../public/data/info.js';

//Función para obtener el nombre del pais mediante una promesa
export function getPais(id) {
  console.log('----------------------------------------------');
  console.log('Llamando a función getPais();');
  console.log('----------------------------------------------');

  const promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      const pais = dataDB.find(pais => pais.id === Number(id))?.pais;
      if(pais) {
        resolve(pais);
      }else {
        reject(`El país con ID ${id} no existe.`)
      }
    },800);
  });
  return promesa;
}