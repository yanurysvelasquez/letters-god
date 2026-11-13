
const USUARIO = "admin";
const CLAVE = "esther2026";

const formLogin = document.getElementById("form-login");
const zonaAdmin = document.getElementById("zona-admin");
const lista = document.getElementById("admin-lista");

function mostrarPanel() {
  formLogin.style.display = "none";
  zonaAdmin.style.display = "block";
  const cartas = JSON.parse(localStorage.getItem("cartas")) || [];
  document.getElementById("total").textContent = cartas.length;
  lista.innerHTML = "";
  cartas.forEach(function (c) {
    const card = document.createElement("article");
    card.className = "card abierta";
    card.innerHTML = '<span class="etiqueta">' + c.categoria + "</span><h3></h3>" +
                     '<p class="fecha">' + c.fecha + '</p><p class="contenido"></p>';
    card.querySelector("h3").textContent = c.titulo;
    card.querySelector(".contenido").textContent = c.texto;
    lista.appendChild(card);
  });
}

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  const u = document.getElementById("usuario").value.trim();
  const c = document.getElementById("clave").value;
  if (u === USUARIO && c === CLAVE) {
    sessionStorage.setItem("admin", "si");
    mostrarPanel();
  } else {
    document.getElementById("error-login").textContent = "Usuario o contraseña incorrectos.";
  }
});

document.getElementById("btn-salir").addEventListener("click", function () {
  sessionStorage.removeItem("admin");
  location.reload();
});


if (sessionStorage.getItem("admin") === "si") mostrarPanel();
