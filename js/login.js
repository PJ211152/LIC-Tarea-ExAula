const usuario = document.getElementById("Txtusuario");
const password = document.getElementById("TxtContrasena");
const btnLogin = document.getElementById("BtnLogin");
const contenedor = document.getElementById("impresion");


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
    let j2;
        if(employee.comprobarUsuario(user,pass) == true){
            j2 = 'employee'
        }else if(admin.comprobarUsuario(user,pass) == true){
            j2 = 'admin'
        }
        else{
            j2 = null;
        }
    return j2;

}

btnLogin.onclick = () =>{

    let user = usuario.value;
    let pass = password.value;

    if (user !='' && pass !=''){
        permisos();
    }else{
        usuario.placeholder = 'Por favor rellene este campo';
        password.placeholder = 'Por favor rellene este campo';
    }
}

function permisos() {

    let name = usuario.value;

    if(comprobarRango() == 'admin'){

    


    contenedor.innerHTML = impresion();

    alert(`Bienvenido administrador ${name}`);

    }else if(comprobarRango() == 'employee'){
        alert(`Bienvenido ${name}`);
    }else{
        alert('Informacion incorrecta');
        usuario.placeholder = 'Ingresar usuario';
        password.placeholder = 'Ingresar contraseña';
    }

}

function impresion() {

    let tarifas = "<div class='admin_container'>"
    tarifas += "<p>Tarifa Actual: $15</p>"
    tarifas += "<input id='TxtMonto' placeholder='Ingrese la nueva tarifa' type='number'>"
    tarifas += "</div>"

    return tarifas;
}

