import {
  saveProduct,
  getProduct,
  getProductListSize,
  deleteProduct,
  updateProduct,
  getProducts,
} from "./firebase.js";

const btnLogin = document.getElementById("BtnLogin");
const inputUser = document.getElementById("Txtusuario");
const inputPass = document.getElementById("TxtContrasena");

function validar() {
  if (inputUser.value != "" && inputPass.value != "") {
    return true;
  } else {
    return false;
  }
}

function saveLocalSesion(user) {
  sessionStorage.setItem("sesion", JSON.stringify(user));
}

//Funcion principal para el inicio de sesion
async function login() {
  const table = "usuarios";
  const user = await getProducts(table);
  let encontrado = false;

  user.forEach((element) => {
    console.log(element.data());
    const actual = element.data();
    console.log(actual);

    if (
      inputUser.value == actual.username &&
      inputPass.value == actual.password
    ) {
      encontrado = true;
      saveLocalSesion(actual);
      window.location.href = "../index.html";
      return true;
    } else {
      encontrado = false;
    }
  });

  if (encontrado == false) {
    alertify.error("Contraseña o usuario incorrecto");
  }
}

async function getUser() {
  if (validar() != false) {
    login();
  } else {
    alertify.error("Ingrese los datos solicitados");
  }
}

btnLogin.onclick = function () {
  getUser();
};
