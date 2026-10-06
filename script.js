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
  mostrarMensaje("Contacto agregado correctamente.", false);
});