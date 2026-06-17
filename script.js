const solicitudes = [];
let siguienteId = 1;

const formulario = document.getElementById('support-form');
const listaSolicitudes = document.getElementById('request-list');
const mensajeVacio = document.getElementById('no-requests');

function renderizarSolicitudes() {
  listaSolicitudes.innerHTML = '';

  if (solicitudes.length === 0) {
    mensajeVacio.style.display = 'block';
    return;
  }

  mensajeVacio.style.display = 'none';

  for (let i = 0; i < solicitudes.length; i += 1) {
    const solicitud = solicitudes[i];
    const item = document.createElement('li');
    const nombre = document.createElement('strong');
    nombre.textContent = solicitud.nombre;

    const detalle = document.createTextNode(` (${solicitud.area}): ${solicitud.problema}`);
    item.appendChild(nombre);
    item.appendChild(detalle);
    listaSolicitudes.appendChild(item);
  }
}

function registrarSolicitud(evento) {
  evento.preventDefault();

  const nombre = formulario.nombre.value.trim();
  const area = formulario.area.value.trim();
  const problema = formulario.problema.value.trim();

  if (!nombre || !area || !problema) {
    return;
  }

  const solicitud = {
    id: siguienteId,
    nombre,
    area,
    problema
  };

  solicitudes.push(solicitud);
  siguienteId += 1;
  formulario.reset();
  renderizarSolicitudes();
}

formulario.addEventListener('submit', registrarSolicitud);
renderizarSolicitudes();
