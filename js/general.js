const dropSesionMenu = document.getElementById("formSesion");

function cerrarSesion() {
  sessionStorage.removeItem("sesion");
  if (document.URL.includes("index.html")) {
    window.location.href = "pages/login.html";
  } else {
    window.location.href = "login.html";
  }
}

function general() {
  if (sessionStorage.getItem("sesion")) {
    const sesion = JSON.parse(sessionStorage.getItem("sesion"));

    if(sesion.admin == true){
        if (document.URL.includes("index.html")) {
            dropSesionMenu.innerHTML = `
          <li><a class="dropdown-item" href="pages/registro.html" >Registrar Empleados</a></li>
          <li><a class="dropdown-item" href="pages/tarifa.html" >Tarifas</a></li>
          <li><a class="dropdown-item" href="pages/tickets.html" >Tickets</a></li>
          <li><a class="dropdown-item" href="pages/grafica.html" >Graficos</a></li>
          <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesion</a></li>
          `;
          const btnCerrarSesion = document.getElementById('btnCerrarSesion');
          btnCerrarSesion.onclick = function(){cerrarSesion()}
          } else {
              dropSesionMenu.innerHTML = `
          <li><a class="dropdown-item" href="registro.html" >Registrar Empleados</a></li>
          <li><a class="dropdown-item" href="tarifa.html">Tarifas</a></li>
          <li><a class="dropdown-item" href="tickets.html">Tickets</a></li>
          <li><a class="dropdown-item" href="grafica.html">Graficos</a></li>
          <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesion</a></li>
          `;
          const btnCerrarSesion = document.getElementById('btnCerrarSesion');
          btnCerrarSesion.onclick = function(){cerrarSesion()}
          }
    }else{
        if (document.URL.includes("index.html")) {
            dropSesionMenu.innerHTML = `
          <li><a class="dropdown-item" href="pages/grafica.html" >Graficos</a></li>
          <li><a class="dropdown-item" href="pages/tickets.html">Tickets</a></li>
          <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesion</a></li>
          `;
          const btnCerrarSesion = document.getElementById('btnCerrarSesion');
          btnCerrarSesion.onclick = function(){cerrarSesion()}
          } else {
              dropSesionMenu.innerHTML = `
          <li><a class="dropdown-item" href="grafica.html">Graficos</a></li>
          <li><a class="dropdown-item" href="tickets.html">Tickets</a></li>
          <li><a class="dropdown-item" id="btnCerrarSesion">Cerrar sesion</a></li>
          `;
          const btnCerrarSesion = document.getElementById('btnCerrarSesion');
          btnCerrarSesion.onclick = function(){cerrarSesion()}
          }
    }
  }
}

general();
