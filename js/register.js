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

function limpiar() {
  idNombre.value = "";
  idLastName.value = "";
  idCorreo.value = "";
  idUsername.value = "";
  idContra.value = "";
  idRepContra.value = "";
  focus(idNombre);
}

function validarEmail(inputText) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.value.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

function validar() {
  let errorValue = 0;
  const sesion = JSON.parse(sessionStorage.getItem("sesion"));
  if (sesion != null) {
    if (sesion.admin == true) {
      if (
        idNombre.value != "" &&
        idCorreo.value != "" &&
        idLastName.value != "" &&
        idUsername.value != "" &&
        idContra.value != "" &&
        idRepContra.value != ""
      ) {
        if (validarEmail(idCorreo) == true) {
          if (idContra.value == idRepContra.value) {
            errorValue = 0;
          } else {
            errorValue = 2;
          }
        } else {
          errorValue = 3;
        }
      } else {
        errorValue = 1;
      }

      return errorValue;
    } else {
      errorValue = 5;
      return errorValue;
    }
  } else {
    errorValue = 5;
    return errorValue;
  }
}

function construirUser() {
  let isAdmin = false;
  if (idPuesto.value == "0") {
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

    if (
      idUsername.value == actual.username ||
      idCorreo.value == actual.correo
    ) {
      encontrado = true;
      return true;
    }
  });

  if (encontrado == false) {
    const user = construirUser();
    alertify.success("Usuario registrado");
    await saveProduct(user, "usuarios");
    limpiar();
  } else {
    alertify.alert("El usuario o correo ya existe");
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
      case 3:
        alertify.error('Email invalido');
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
