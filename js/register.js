const idNombre = document.getElementById("fullName");
const idCorreo = document.getElementById("eMail");
const idTelefono = document.getElementById("telefono");
const idContra = document.getElementById("pass");
const idRepContra = document.getElementById("repPass");
const idPuesto = document.getElementById("cargo");
const btnRegistrar = document.getElementById("registrar");

function validar() {
  let errorValue = 0;
  if (
    idNombre != "" &&
    idCorreo != "" &&
    idTelefono != "" &&
    idContra != "" &&
    idRepContra != ""
  ) {
    if (idTelefono.value.length == 8) {
    } else {
      errorValue = 2;
    }
  } else {
    errorValue = 1;
  }

  return errorValue;
}

btnRegistrar.onclick = function () {
  if (validar() == 0) {
    alert("si");
  } else if (validar() == 1) {
    alert("Rellene todos los campos");
  } else if (validar() == 2) {
    alert("ingrese un numero telefonico valido");
  }
};
