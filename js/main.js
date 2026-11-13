
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", function () {
  menu.classList.toggle("abierto");
});

menu.querySelectorAll("a").forEach(function (enlace) {
  enlace.addEventListener("click", function () {
    menu.classList.remove("abierto");
  });
});



function mostrarVersiculoDelDia() {
  const dias = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const v = versiculos[dias % versiculos.length];
  document.getElementById("versiculo-texto").textContent = "“" + v.texto + "”";
  document.getElementById("versiculo-ref").textContent = "— " + v.ref;
}
mostrarVersiculoDelDia();



const rellenos = document.querySelectorAll(".relleno");
const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.style.width = entrada.target.dataset.nivel + "%";
    }
  });
});
rellenos.forEach(function (r) { observador.observe(r); });


const formCarta = document.getElementById("form-carta");
const listaCartas = document.getElementById("lista-cartas");

function leerCartas() {
  return JSON.parse(localStorage.getItem("cartas")) || [];
}
function guardarCartas(cartas) {
  localStorage.setItem("cartas", JSON.stringify(cartas));
}

function mostrarCartas() {
  const cartas = leerCartas();
  listaCartas.innerHTML = "";

   cartas.forEach(function (c) {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML =
      "<h3></h3>" +
      '<p class="fecha">' + c.fecha + "</p>" +
      '<p class="contenido"></p>' +
      '<button class="borrar">Borrar</button>';

    card.querySelector("h3").textContent = c.titulo;
    card.querySelector(".contenido").textContent = c.texto;


    card.addEventListener("click", function () {
      card.classList.toggle("abierta");
    });

    card.querySelector(".borrar").addEventListener("click", function (e) {
      e.stopPropagation();
      guardarCartas(leerCartas().filter(function (x) { return x.id !== c.id; }));
      mostrarCartas();
    });
    listaCartas.appendChild(card);
  });
}

formCarta.addEventListener("submit", function (e) {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value.trim(); // ew
  const texto = document.getElementById("texto").value.trim();
  const error = document.getElementById("error-carta");

  if (titulo.length < 3 || texto.length < 10) {
    error.textContent = "Escribe un título (mín. 3 letras) y una carta (mín. 10 letras).";
    return;
  }
  error.textContent = "";

  const cartas = leerCartas();
  cartas.unshift({
    id: Date.now(),
    titulo: titulo,
    texto: texto,
    fecha: new Date().toLocaleDateString("es-CO")
  });
  guardarCartas(cartas);
  formCarta.reset();
  mostrarCartas();
});


document.querySelectorAll(".filtro").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filtro").forEach(function (b) { b.classList.remove("activo"); });
    btn.classList.add("activo");
    mostrarCartas();
  });
});
mostrarCartas();


document.getElementById("animo-select").addEventListener("change", function (e) {
  const animo = e.target.value;
  const caja = document.getElementById("resultado-animo");
  if (animo === "") { caja.classList.remove("visible"); return; }


  const opciones = versiculos.filter(function (v) { return v.animos.includes(animo); });
  const v = opciones[Math.floor(Math.random() * opciones.length)];

  caja.innerHTML = "<p><em>“" + v.texto + "”</em></p><p><strong>" + v.ref + "</strong></p>" +
                   "<p>🙏 " + oraciones[animo] + "</p>";
  caja.classList.add("visible");
});


const campos = {
  nombre: { el: document.getElementById("nombre"), min: 3, msg: "El nombre debe tener al menos 3 letras." },
  correo: { el: document.getElementById("correo"), msg: "Escribe un correo válido." },
  mensaje: { el: document.getElementById("mensaje"), min: 10, msg: "El mensaje debe tener al menos 10 letras." }
};

function esValido(clave) {
  const valor = campos[clave].el.value.trim();
  if (clave === "correo") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  return valor.length >= campos[clave].min;
}

function revisar(clave) {
  const ok = esValido(clave);
  const el = campos[clave].el;
  el.classList.toggle("valido", ok);
  el.classList.toggle("invalido", !ok);
  document.getElementById("error-" + clave).textContent = ok ? "" : campos[clave].msg;
  return ok;
}


Object.keys(campos).forEach(function (clave) {
  campos[clave].el.addEventListener("input", function () { revisar(clave); });
});

document.getElementById("form-contacto").addEventListener("submit", function (e) {
  e.preventDefault();
  let todoBien = true;
  Object.keys(campos).forEach(function (clave) {
    if (!revisar(clave)) todoBien = false;
  });
  if (!todoBien) return;


  const form = e.target;
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" }
  }).then(function (resp) {
    const ok = document.getElementById("ok-contacto");
    if (resp.ok) {
      ok.textContent = "¡Gracias! Tu mensaje fue enviado.";
      form.reset();
      Object.keys(campos).forEach(function (c) { campos[c].el.classList.remove("valido"); });
    } else {
      ok.textContent = "Hubo un problema al enviar. Intenta de nuevo.";
    }
  }).catch(function () {
    document.getElementById("ok-contacto").textContent = "Sin conexión. Intenta de nuevo.";
  });
});
