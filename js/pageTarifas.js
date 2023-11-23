import {
    saveProduct,
    getProduct,
    getProductListSize,
    deleteProduct,
    updateProduct,
    getProducts,
  } from "./firebase.js";

const container = document.getElementById('idInfoContainer');

async function cargarTarifas() {
    const table = "tarifas";
    const tarifas = await getProducts(table);

    container.innerHTML = `
    Nuestros viajes guiados son los mejores que puedas encontrar, por lo que tenemos varias opciones para toda la familia y gustos, entre ellas tenemos:


    `
  
    tarifas.forEach((element) => {
      const actual = element.data();
      container.innerHTML += `<hr>${actual.nombre} con un precio de $${actual.precio}  
      `
        
    });
  }

  cargarTarifas();