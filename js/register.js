import {
  saveProduct,
  getProduct,
  getProductListSize,
  deleteProduct,
  updateProduct,
  getProducts,
} from "./firebase.js";

const idNombre = document.getElementById("inputName");
const idLastName = document.getElementById("inputApellido");
const idCorreo = document.getElementById("inputCorreo");
const idUsername = document.getElementById("inputUsername");
const idContra = document.getElementById("inputPass");
const idRepContra = document.getElementById("inputRepPass");
const idPuesto = document.getElementById("selectCargo");
const btnRegistrar = document.getElementById("btnRegistrar");

function validar() {
  let errorValue = 0;
  const sesion = JSON.parse(sessionStorage.getItem("sesion"));
  if(sesion != null){
    if (sesion.admin == true) {
      if (
        idNombre.value != "" &&
        idCorreo.value != "" &&
        idLastName.value != "" &&
        idUsername.value != "" &&
        idContra.value != "" &&
        idRepContra.value != ""
      ) {
        if (idContra.value == idRepContra.value) {
          errorValue = 0;
        } else {
          errorValue = 2;
        }
      } else {
        errorValue = 1;
      }
  
      return errorValue;
    } else {
      errorValue = 5;
      return errorValue;
    }
  }else{
    errorValue = 5;
    return errorValue;
  }
}

function construirUser() {
  const isAdmin = false;
  if (idPuesto.value == 0) {
    isAdmin = true;
  }
  const user = {
    admin: isAdmin,
    nombre: `${idNombre.value}`,
    apellido: `${idLastName.value}`,
    correo: `${idCorreo.value}`,
    username: `${idUsername.value}`,
    password: `${idContra.value}`,
  };

  return user;
}

async function registrar() {
  const table = "usuarios";
  const user = await getProducts(table);
  let encontrado = false;

  user.forEach((element) => {
    const actual = element.data();

    if (idUsername.value == actual.username) {
      encontrado = true;
      return true;
    } else {
      encontrado = false;
    }
  });

  if (encontrado == false) {
    const user = construirUser();
    alertify.success("Usuario registrado");
    await saveProduct(user, "usuarios");
  } else {
    alertify.alert("El usuario ya existe");
  }
}

function errorCatch() {
  const errorType = validar();

  switch (errorType) {
    case 0:
      registrar();
      break;

    case 1:
      alertify.error("Por favor llene todos los campos");
      break;

    case 2:
      alertify.error("Las contraseñas no coinciden");
      break;
    case 5:
      alertify.alert("No tienes permiso para esto");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1500);
  }
}

btnRegistrar.onclick = function () {
  errorCatch();
};
