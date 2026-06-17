const solicitudes = [];

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
    item.innerHTML = `<strong>${solicitud.nombre}</strong> (${solicitud.area}): ${solicitud.problema}`;
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
    id: solicitudes.length + 1,
    nombre,
    area,
    problema
  };

  solicitudes.push(solicitud);
  formulario.reset();
  renderizarSolicitudes();
}

formulario.addEventListener('submit', registrarSolicitud);
renderizarSolicitudes();
