const usuario = document.getElementById("Txtusuario");
const password = document.getElementById("TxtContrasena");
const btnLogin = document.getElementById("BtnLogin");


//Esto de momento es para probar cosas
const user = {
    name: "",
    lastName: "",
    age: 0,
    username: "",
    password: ""
}

const admin = {
    name: "Admin",
    lastName: "Admin",
    username: "Admin",
    password: "123456",

    comprobarUsuario(username,pass){
        let ver;
        if(this.username == username && this.password == pass){
            ver = true;
        }else{
            ver = false;
        }
        return ver;
    }
}

const employee = {
    name: "Marl",
    lastName: "Admin",
    age: 20,
    username: "employee",
    password: "123456",
    comprobarUsuario(username,pass){
        let ver;
        if(this.username == username && this.password == pass){
            ver = true;
        }else{
            ver = false
        }
        return ver;
    }
}

function comprobarRango(){
    let user = usuario.value;
    let pass = password.value;

    if(employee.comprobarUsuario(user,pass) == true){
        alert(`Bienvenido ${user}`);
    }else if(admin.comprobarUsuario(user,pass) == true){
        alert(`Bienvenido administrador ${user}`);
    }
    else{
        alert(`Campo incorrecto`)
    }

}

btnLogin.onclick = () =>{
    comprobarRango();
}

