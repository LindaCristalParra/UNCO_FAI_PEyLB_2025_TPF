// Función para ampliar imágenes
function ampliarImagen(img) {
    var modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';
    modal.onclick = function() {
        document.body.removeChild(modal);
    };
    
    var imagenAmpliada = document.createElement('img');
    imagenAmpliada.src = img.src;
    imagenAmpliada.alt = img.alt;
    imagenAmpliada.style.maxWidth = '90%';
    imagenAmpliada.style.maxHeight = '90%';
    
    modal.appendChild(imagenAmpliada);
    document.body.appendChild(modal);
}

// Función para guardar turnos en archivo de texto
function guardarTurno() {
    try {
        const form = document.forms["turnoForm"];
        const turno = {
            nombre: form.nombre.value.trim(),
            email: form.email.value.trim(),
            telefono: form.telefono.value.trim(),
            fecha: form.fecha.value,
            hora: form.hora.value,
            tipo: form.tipo.value,
            descripcion: form.descripcion.value.trim(),
            fechaReserva: new Date().toISOString()
        };

        // Validaciones
        if (!turno.nombre || !turno.email || !turno.telefono || 
            !turno.fecha || !turno.hora || !turno.tipo || !turno.descripcion) {
            alert("Todos los campos son obligatorios");
            return false;
        }

        if (!/^\d+$/.test(turno.telefono)) {
            alert("El teléfono solo debe contener números");
            return false;
        }

        if (!/^\S+@\S+\.\S+$/.test(turno.email)) {
            alert("Ingrese un email válido");
            return false;
        }

        // Guardar en LocalStorage
        const turnos = JSON.parse(localStorage.getItem('turnos') || '[]');
        turnos.push(turno);
        localStorage.setItem('turnos', JSON.stringify(turnos));

        alert("Turno reservado con éxito");
        form.reset();
        return true;
    } catch (error) {
        console.error("Error:", error);
        alert("Error al guardar el turno");
        return false;
    }
}


function errorHandler(e) {
    console.error("Error: ", e);
    alert("Ocurrió un error al guardar el turno. Por favor intente nuevamente.");
}

// Función para cotización automática de tatuajes
function calcularCosto() {
    var tamaño = document.getElementById('tamaño').value;
    var complejidad = document.getElementById('complejidad').value;
    var costoBase = 0;
    
    // Definir costo base según tamaño
    switch(tamaño) {
        case 'pequeño': costoBase = 1000; break;
        case 'mediano': costoBase = 2500; break;
        case 'grande': costoBase = 5000; break;
    }
    
    // Aplicar multiplicador de complejidad
    switch(complejidad) {
        case 'simple': costoBase *= 15; break;
        case 'moderado': costoBase *= 15.5; break;
        case 'complejo': costoBase *= 25.5; break;
    }
    
    document.getElementById('costo').textContent = "$" + costoBase.toFixed(2);
}

// Función para preguntas frecuentes
function alternarPreguntaFrecuente(elemento) {
    var respuesta = elemento.nextElementSibling;
    var icono = elemento.querySelector('.toggle-icon');
    
    if (respuesta.style.display === 'none' || !respuesta.style.display) {
        respuesta.style.display = 'block';
        icono.textContent = '-';
    } else {
        respuesta.style.display = 'none';
        icono.textContent = '+';
    }
}

// Función para enviar formulario de contacto
function enviarContacto() {
    var nombre = document.forms["contactoForm"]["nombre-contacto"].value;
    var email = document.forms["contactoForm"]["email-contacto"].value;
    var telefono = document.forms["contactoForm"]["telefono"].value;
    var asunto = document.forms["contactoForm"]["asunto"].value;
    var mensaje = document.forms["contactoForm"]["mensaje"].value;
    
    // Validación básica
    if (!nombre || !email || !asunto || !mensaje) {
        alert("Por favor complete todos los campos obligatorios.");
        return false;
    }
    
    // Validar que el teléfono solo contenga números si se proporciona
    if (telefono && !/^\d+$/.test(telefono)) {
        alert("El teléfono solo debe contener números.");
        document.forms["contactoForm"]["telefono"].classList.add('campo-error');
        return false;
    }
    
    // Crear objeto con los datos de contacto
    var contacto = {
        nombre: nombre,
        email: email,
        telefono: telefono || 'No proporcionado',
        asunto: asunto,
        mensaje: mensaje,
        fecha: new Date().toISOString()
    };
    
    try {
        // Guardar en LocalStorage usando dataHandler.js
        if (guardarDatos('contactos', contacto)) {
            alert("Gracias " + nombre + " por tu mensaje. Te responderé a la brevedad.");
            document.forms["contactoForm"].reset();
        } else {
            alert("Ocurrió un error al enviar el mensaje. Por favor intente nuevamente.");
        }
    } catch(e) {
        console.error("Error:", e);
        alert("Ocurrió un error al enviar el mensaje. Por favor intente nuevamente.");
    }
}

// Función para enviar formulario de diseño personalizado (en tatuajes.html)
function enviarDiseño() {
    var nombre = document.forms["diseñoForm"]["nombre-diseño"].value;
    if (nombre) {
        alert("Gracias " + nombre + " por tu solicitud de diseño. Analizaré tu idea y te contactaré pronto con una propuesta.");
        document.forms["diseñoForm"].reset();
    }
}