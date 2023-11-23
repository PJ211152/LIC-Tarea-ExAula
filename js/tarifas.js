import {
  saveProduct,
  getProduct,
  getProductListSize,
  deleteProduct,
  updateProduct,
  getProducts,
} from "./firebase.js";

const inputTarifas = document.getElementById("idInputTarifas");
const inputCambioTarifa = document.getElementById("idNewPrice");
const btnAceptar = document.getElementById("btnCambiar");

function limpiarTarifas() {
    inputTarifas.innerHTML = '';
    inputCambioTarifa.value = 0;
}

//Funcion carga tarifas al select
async function cargarTarifas() {
  const table = "tarifas";
  const tarifas = await getProducts(table);

  tarifas.forEach((element) => {
    const actual = element.data();

    inputTarifas.innerHTML += `
        <option value="${element.id}">${actual.nombre} = $${actual.precio}</option>
                `;
  });
}

async function subirNuevaTarifa() {
  const table = "tarifas";
  const tarifas = await getProducts(table);

  tarifas.forEach((element) => {
    const actual = element.data();

    if (inputTarifas.value == element.id) {
      const tarifaId = inputTarifas.value;
      const newPrice = {
        nombre: actual.nombre,
        precio: inputCambioTarifa.value,
      };
      updateProduct(tarifaId, newPrice, table);
      alertify.alert("Precio Cambiado con exito");
    }
  });
}

function refresh() {
  limpiarTarifas();
  cargarTarifas();
}

inputTarifas.onchange = function () {
  inputCambioTarifa.value = 0;
};

inputCambioTarifa.onchange = function () {
  if (inputCambioTarifa.value > 0) {
    btnAceptar.disabled = false;
  } else {
    inputCambioTarifa.value = 0;
    btnAceptar.disabled = true;
  }
};

btnAceptar.onclick = function () {
  subirNuevaTarifa();
  setTimeout(() => {
    refresh();
  }, 1000);
};

cargarTarifas();
