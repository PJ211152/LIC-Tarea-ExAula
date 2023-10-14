const usuario = document.getElementById("Txtusuario");
const password = document.getElementById("TxtContrasena");
const btnLogin = document.getElementById("BtnLogin");
const contenedor = document.getElementById("impresion");
const divClear = document.getElementById("idDivLogin");
const btn1 = document.getElementById("idBtnInfo");
const btn2 = document.getElementById("idBtnGaleria");
const btn3 = document.getElementById("idBtnLogin");
const btn4 = document.getElementById("idBtnInicio");


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
    divClear.innerHTML = clear();
    btn3.parentNode.removeChild(btn3);
    btn1.innerHTML = 'Tarifas';
    btn1.href = 'tarifa.html';
    btn2.innerHTML = 'Registro';
    btn2.href = 'registro.html';
    btn4.innerHTML = 'Tickets';
    btn4.href = 'tickets.html';

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
    tarifas += "<h3 class='mid_title'>Herramientas de administrador:</h3>"
    tarifas += "<button class='btnAzul'><a href='tarifa.html' class='linkDefault'>Gestionar tarifas</a></button>"
    tarifas += "<button class='btnAzul'><a href='registro.html' class='linkDefault'>Ingresar nuevo usuario</a></button>"
    tarifas += "<button class='btnAzul'><a href='tickets.html' class='linkDefault'>Gestionar tickets</a></button>"
    tarifas += "<br>"
    tarifas += "<p>Deseas desconectar la sesion?</p>"
    tarifas += "<button class='btnAzul'><a href='login.html' class='linkDefault'>Desconectar</a></button>"
    tarifas += "</div>"

    return tarifas;
}

function clear() {
    let limpiar = "<div></div>";

    return limpiar;
}
    


