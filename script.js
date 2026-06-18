// ==========================================
// PARTE 1: ALMACENAMIENTO DE DATOS (Requerimiento N°4)
// ==========================================
// Creamos un arreglo vacío llamado exactamente "solicitudes" para guardar cada objeto.
const STORAGE_KEY = 'solicitudes';
let solicitudes = cargarSolicitudes();

// ==========================================
// PARTE 2: CAPTURA DE BOTONES DESDE EL HTML
// ==========================================
// Usamos el DOM para conectar las variables de JS con los botones reales que creamos en el HTML.
const btnRegistrar = document.getElementById('btnRegistrar');
const btnLimpiar = document.getElementById('btnLimpiar');

// Le decimos al navegador que "escuche" cuando el usuario haga clic en los botones.
btnRegistrar.addEventListener('click', registrar);
btnLimpiar.addEventListener('click', limpiar);

// ==========================================
// PARTE 3: FUNCIÓN REGISTRAR Y VALIDAR (Requerimiento N°2 y N°3)
// ==========================================
function registrar() {
    // 3.1. CAPTURA DE DATOS: Obtenemos lo que el usuario escribió en cada casilla del formulario.
    // .value sirve para extraer el texto de adentro del input, y .trim() borra espacios vacíos accidentales al inicio/final.
    let nombre = document.getElementById('nombre').value.trim();
    let correo = document.getElementById('correo').value.trim();
    let area = document.getElementById('area').value.trim();
    let tipo = document.getElementById('tipo').value;
    let descripcion = document.getElementById('descripcion').value.trim();

    // Traemos el contenedor de la pantalla donde mostraremos los mensajes de éxito o error.
    let mensajePantalla = document.getElementById('mensajePantalla');

    // 3.2. VALIDACIÓN CON CONDICIONALES (Requerimiento N°2 y N°6)
    // Condición A: Ningún campo puede quedar vacío.
    if (nombre === "" || correo === "" || area === "" || tipo === "" || descripcion === "") {
        // Manipulación del DOM: Inyectamos un mensaje de advertencia visual.
        mensajePantalla.innerHTML = `<div style="color: red; font-weight: bold; margin-top: 10px;">⚠️ Error: Todos los campos son obligatorios y no pueden quedar vacíos.</div>`;
        return; // El "return" detiene la función aquí para que no siga ejecutando el registro si hay error.
    }

    // Condición B: El correo debe contener obligatoriamente el símbolo @.
    // .includes('@') devuelve true si el texto tiene una @, o false si no la tiene. Usamos el signo ! para decir "Si NO incluye @".
    if (!correo.includes('@')) {
        mensajePantalla.innerHTML = `<div style="color: red; font-weight: bold; margin-top: 10px;">⚠️ Error: El correo electrónico debe ser válido (debe contener el símbolo @).</div>`;
        return; // Detiene la función.
    }

    // 3.3. CREACIÓN DEL OBJETO (Requerimiento N°4 y N°3)
    // Si pasó las validaciones de arriba, agrupamos los datos en un objeto estructurado.
    let nuevaSolicitud = {
        nombre: nombre,
        correo: correo,
        area: area,
        tipo: tipo,
        descripcion: descripcion
    };

    // 3.4. GUARDAR EN EL ARREGLO
    // Usamos estrictamente el método .push() para meter este objeto nuevo adentro de nuestro arreglo global.
    solicitudes.push(nuevaSolicitud);
    guardarSolicitudes();

    // 3.5. MENSAJE DE ÉXITO EN PANTALLA (Requerimiento N°2)
    // Mostramos un mensaje indicando que todo salió bien usando el DOM.
    mensajePantalla.innerHTML = `<div class="mensaje-estado mensaje-exito fade-in">✅ ¡Solicitud registrada exitosamente!</div>`;

    // 3.6. ACTUALIZAR LA INTERFAZ (Requerimiento N°5)
    // Llamamos a la función encargada de dibujar la tabla actualizada sin recargar la página.
    actualizarTabla();

    // Opcional: Limpiamos los campos del formulario automáticamente después de registrar con éxito.
    limpiar();
}

// ==========================================
// PARTE 4: MANIPULACIÓN DEL DOM Y CICLOS (Requerimiento N°5 y N°6)
// ==========================================
function actualizarTabla() {
    let contenedorTabla = document.getElementById('contenedorTabla');

    // Si el arreglo está vacío, le mostramos un mensaje amigable al usuario.
    if (solicitudes.length === 0) {
        contenedorTabla.innerHTML = `
            <div class="tabla-vacia-contenedor">
                <div class="tabla-vacia-icono">🛸</div>
                <h4>Panel de Monitoreo Vacío</h4>
                <p style="font-size: 13px; color: #94a3b8;">Esperando el ingreso de nuevas solicitudes de soporte</p>
            </div>
        `;
        return;
    }

    // Iniciamos la estructura básica de una tabla en HTML con sus columnas requeridas por el Mockup.
    let tablaHTML = `
        <table border="1" style="width: 100%; border-collapse: collapse; text-align: left; margin-top: 15px;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th>N°</th>
                    <th>Nombre</th>
                    <th>Área</th>
                    <th>Tipo de Solicitud</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
    `;

    // CICLO OBLIGATORIO (Requerimiento N°6): Recorremos el arreglo de solicitudes para añadir cada fila.
    // Usamos "forEach". El primer parámetro (solicitud) es el objeto actual, y el segundo (indice) nos da la posición (0, 1, 2...).
    solicitudes.forEach((solicitud, indice) => {
        tablaHTML += `
            <tr>
                <td>${indice + 1}</td>
                <td>${solicitud.nombre}</td>
                <td>${solicitud.area}</td>
                <td>${obtenerBadgeTipo(solicitud.tipo)}</td>
                <td>${solicitud.descripcion}</td>
            </tr>
        `;
    });

    // Cerramos las etiquetas de la tabla.
    tablaHTML += `
            </tbody>
        </table>
        <div class="total-registros">ℹ️ Total de solicitudes registradas: ${solicitudes.length}</div>
    `;

    // Inyectamos todo el código de la tabla generado dinámicamente adentro del contenedor en el HTML.
    contenedorTabla.innerHTML = tablaHTML;
}

// ==========================================
// PARTE 5: FUNCIÓN LIMPIAR (Requerimiento N°3)
// ==========================================
function limpiar() {
    // Vacía por completo cada uno de los elementos de entrada del formulario.
    document.getElementById('nombre').value = "";
    document.getElementById('correo').value = "";
    document.getElementById('area').value = "";
    document.getElementById('tipo').value = "";
    document.getElementById('descripcion').value = "";
}

// ==========================================
// PARTE 6: PERSISTENCIA Y BADGES VISUALES
// ==========================================
function cargarSolicitudes() {
    let solicitudesGuardadas = localStorage.getItem(STORAGE_KEY);

    if (!solicitudesGuardadas) {
        return [];
    }

    try {
        let datos = JSON.parse(solicitudesGuardadas);
        return Array.isArray(datos) ? datos : [];
    } catch (error) {
        return [];
    }
}

function guardarSolicitudes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solicitudes));
}

function obtenerBadgeTipo(tipo) {
    let tipoNormalizado = (tipo || '').trim();
    let configuracion = {
        Hardware: { clase: 'badge-hardware', emoji: '🖥️', texto: 'Hardware' },
        Software: { clase: 'badge-software', emoji: '💾', texto: 'Software' },
        Redes: { clase: 'badge-redes', emoji: '🌐', texto: 'Redes' },
        Seguridad: { clase: 'badge-seguridad', emoji: '🔒', texto: 'Seguridad' }
    };

    let badge = configuracion[tipoNormalizado] || { clase: 'badge-generico', emoji: '📌', texto: tipoNormalizado || 'Sin tipo' };

    return `<span class="badge-solicitud ${badge.clase}">${badge.emoji} ${badge.texto}</span>`;
}

