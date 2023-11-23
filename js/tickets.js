import {
    saveProduct,
    getProduct,
    getProductListSize,
    deleteProduct,
    updateProduct,
    getProducts,
  } from "./firebase.js";

const idCliente = document.getElementById('idCliente');
const idInputNombre = document.getElementById('inputNombreCiente');
const idInputNumero = document.getElementById('inputNumero');
const idMonto = document.getElementById('idMonto');
const IsNiños = document.getElementById('selectIsNiños');
const btnCalcular = document.getElementById('idBtnCalcular');
const containerNinos = document.getElementById('idFormniños');
const containerFactura = document.getElementById('container-factura');


let numberNinos=0;
let priceNinos;

function id(){
    const id = uuid.v4();
    idCliente.value = id;
};

//Obtiene las tarifas de la base de datos y la coloca en el select
async function tarifas(){
    const table = "tarifas";
    const tarifas = await getProducts(table);
    
    tarifas.forEach((element) => {

        const actual = element.data();

        if(actual.nombre != 'Precio para niños'){
            idMonto.innerHTML +=`
            <option value="${actual.precio}">${actual.nombre} = $${actual.precio}</option>
            `
        }else{
            priceNinos = actual.precio;
        }
    
        
      })
};

//Funcion para mostrar el input de numero de niños cuando la casilla vendra con niños este activa
function putNinos(){
    IsNiños.onchange = function(){
        if(IsNiños.value == 1){
            containerNinos.innerHTML = `
        <label for="inputNinos">Numero de niños</label>
        <input type="number" class="form-control" name="inputNinos" id="inputNinos">
            `;
            const inputNinos = document.getElementById('inputNinos')
            inputNinos.onchange = function(){
                if(inputNinos.value > 0){
                    numberNinos = parseInt(inputNinos.value);
                }else{
                    inputNinos.value = '0';
                }
            }
        }else{
            containerNinos.innerHTML = '';
            numberNinos = 0;
        }
    }
};

function validar(){
    let error = true;
    if(idInputNombre.value != '' && idInputNumero.value != ''){
        if(idInputNumero.value.length == 8){
            calcular();
        }else{
            alertify.error('Ingrese un numero de telefono valido')
        }

    }else{
        alertify.error('Rellene todos los campos solicitados')
    }
}

function calcularPrecioTotal(montoEstandar){
    const total = montoEstandar + parseInt(numberNinos)*parseFloat(priceNinos);
    return total;
}

async function enviarTicket(id,clientName,cellphone,total){
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anno = fecha.getFullYear()
    const ticket ={
        id: id,
        nombre: clientName,
        numero: cellphone,
        monto: total,
        dia: dia,
        mes: mes,
        año: anno
    }

    await saveProduct(ticket, "tickets");
    alertify.alert('Ticket Guardado con exito');
    setTimeout(() =>{window.location.href = 'tickets.html'}, 1000)

}

function calcular(){
    const id = idCliente.value;
    const name = idInputNombre.value;
    const cellphone = idInputNumero.value;
    const tip = parseFloat(idMonto.value);
    const total = calcularPrecioTotal(tip);

    containerFactura.innerHTML = `
    <div class="container_U">
    <div class='row mt-3'>
    <div class="col-6">
    <h4>Id</h4>
    <p>${idCliente.value}</p>
    </div>
    <div class="col-6">
    <h4>Nombre del cliente</h4>
    <p>${idInputNombre.value}</p>
    </div>
    </div>
    <div class='row mt-3'>
    <div class="col-6">
    <h4>Numero de telefono</h4>
    <p>${idInputNumero.value}</p>
    </div>
    <div class="col-6">
    <h4>Costo de la tarifa elegida</h4>
    <p>$${idMonto.value}</p>
    </div>
    </div>
    <div class="row mt-3">
    <h3 class="fontCenter">Precio Total</h3>
    <p class="fontCenter">$${total}</p>
    </div>
    <div class='row mt-3 mb-3'>
    <div class="col-12 fontCenter">
    <button class="btn btn-success" id="btnAceptar">Aceptar</button>
    <div>
    </div>
    </div>
    `
    const btnAceptar = document.getElementById('btnAceptar');

    btnAceptar.onclick = function(){
        enviarTicket(id,name,cellphone,total);
    }
}

btnCalcular.onclick = function(){
    validar();
}

 id();
 putNinos();
 tarifas();