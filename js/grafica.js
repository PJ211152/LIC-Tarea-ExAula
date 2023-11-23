import {
  saveProduct,
  getProduct,
  getProductListSize,
  deleteProduct,
  updateProduct,
  getProducts,
} from "./firebase.js";

const fecha = new Date();
let hoy = 0;
let ayer = 0;
let antier = 0;
let hace3Dias = 0;
let hace4Dias = 0;

let dinerohoy = 0;
let dineroayer = 0;
let dineroantier = 0;
let dinerohace3Dias = 0;
let dinerohace4Dias = 0;

async function tickets() {
  const table = "tickets";
  const tickets = await getProducts(table);

  tickets.forEach((element) => {
    const actual = element.data();

    if (actual.dia == fecha.getDate()) {
      hoy = hoy + 1;
      dinerohoy = dinerohoy + actual.monto;
    }

    if (actual.dia == fecha.getDate() - 1) {
      ayer = ayer + 1;
      dineroayer = dineroayer + actual.monto;
    }

    if (actual.dia == fecha.getDate() - 2) {
      antier = antier + 1;
      dineroantier = dineroantier + actual.monto;
    }

    if (actual.dia == fecha.getDate() - 3) {
      hace3Dias = hace3Dias + 1;
      dinerohace3Dias = dinerohace3Dias + actual.monto;
    }

    if (actual.dia == fecha.getDate() - 4) {
      hace4Dias = hace4Dias + 1;
      dinerohace4Dias = dinerohace4Dias + actual.monto;
    }
    /*idMonto.innerHTML +=`
          <option value="${actual.precio}">${actual.nombre} = $${actual.precio}</option>
          `*/
  });
}

tickets();

function general() {
  //Variable creada para trabajar con el el lienzo dentro del div
  const ctx = document.getElementById("myChart");
  //Creación de objeto, usando la variable anterior, donde se van a establecer
  //las propiedades de los gráficos
  new Chart(ctx, {
    //Se establece que será un gráfico de barras
    type: "line",
    data: {
      //Los labels son las opciones que estaran en la grafica abajo
      labels: [
        `${fecha.getDate() - 4}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
        `${fecha.getDate() - 3}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
        `${fecha.getDate() - 2}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
        `${fecha.getDate() - 1}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
        `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
      ],
      datasets: [
        {
          //Este label representa el título de la gráfica
          label: "Personas",
          //Data indicara la cantidad de votos, en este caso, recibidos
          data: [hace4Dias, hace3Dias, antier, ayer, hoy],
          borderWidth: 1,
        },
      ],
    },
    //Las opciones son para agregar más estetica a los gráficos
    //En este caso el eje y del gráfico empezará desde el 0
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  //Variable creada para trabajar con el el lienzo dentro del div
  const ctx2 = document.getElementById("myChart2");
  //Creación de objeto, usando la variable anterior, donde se van a establecer
  //las propiedades de los gráficos
  new Chart(ctx2, {
    //Se establece que será un gráfico de barras
    type: "line",
    data: {
      //Los labels son las opciones que estaran en la grafica abajo
      labels: [
        `${fecha.getDate() - 4}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
        `${fecha.getDate() - 3}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
        `${fecha.getDate() - 2}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
        `${fecha.getDate() - 1}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
        `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
      ],
      datasets: [
        {
          //Este label representa el título de la gráfica
          label: "Dinero ingresado",
          //Data indicara la cantidad de votos, en este caso, recibidos
          data: [dinerohace4Dias, dinerohace3Dias, dineroantier, dineroayer, dinerohoy],
          borderWidth: 1,
        },
      ],
    },
    //Las opciones son para agregar más estetica a los gráficos
    //En este caso el eje y del gráfico empezará desde el 0
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

setTimeout(() => {
  if(localStorage.getItem('sesion')){
    general();
  }else{
    alertify.alert('No tienes permiso para estar aqui');
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 2000);
  }
}, 1000);
