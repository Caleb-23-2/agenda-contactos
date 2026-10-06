let contactos = [];

const formulario = document.getElementById("formContacto");
const mensaje = document.getElementById("mensaje");

function mostrarMensaje(texto, esError) {
  mensaje.innerText = texto;
  mensaje.className = esError ? "error" : "ok";
}

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const correo = document.getElementById("correo").value.trim();

  if (nombre === "" || telefono === "" || correo === "") {
    mostrarMensaje("Completa todos los campos.", true);
    return;
  }
  if (!correo.includes("@")) {
    mostrarMensaje("Ingresa un correo válido.", true);
    return;
  }

  contactos.push({ id: Date.now(), nombre, telefono, correo });
  formulario.reset();
    mostrarContactos();
  mostrarMensaje("Contacto agregado correctamente.", false);
});
function mostrarContactos() {
  const lista = document.getElementById("listaContactos");
  lista.innerHTML = "";

  if (contactos.length === 0) {
    lista.textContent = "No hay contactos registrados.";
    return;
  }

  contactos.forEach(function (c) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
        tarjeta.onclick = function () {
      verDetalle(c);
    };

    const h3 = document.createElement("h3");
    h3.textContent = c.nombre;
    const p1 = document.createElement("p");
    p1.textContent = "Teléfono: " + c.telefono;
    const p2 = document.createElement("p");
    p2.textContent = "Correo: " + c.correo;

        const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.className = "eliminar";
        btn.onclick = function (e) {
      e.stopPropagation();
      eliminarContacto(c.id);
    };

    tarjeta.append(h3, p1, p2, btn);
    lista.appendChild(tarjeta);
  });
}

mostrarContactos();

function eliminarContacto(id) {
  contactos = contactos.filter(function (c) {
    return c.id !== id;
  });
    document.getElementById("detalle").textContent = "";
  mostrarContactos();
  mostrarMensaje("Contacto eliminado.", false);
}

function verDetalle(c) {
  document.getElementById("detalle").textContent =
    "Detalle → Nombre: " + c.nombre +
    " | Teléfono: " + c.telefono +
    " | Correo: " + c.correo;
}