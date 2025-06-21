// Función para mostrar el formulario de turnos
function mostrarFormularioTurno() {
    document.getElementById('formulario-turno').style.display = 'block';
}

// Función para ocultar el formulario de turnos
function ocultarFormularioTurno() {
    document.getElementById('formulario-turno').style.display = 'none';
}

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
    var nombre = document.forms["turnoForm"]["nombre"].value;
    var email = document.forms["turnoForm"]["email"].value;
    var fecha = document.forms["turnoForm"]["fecha"].value;
    var hora = document.forms["turnoForm"]["hora"].value;
    var tipo = document.forms["turnoForm"]["tipo"].value;
    var descripcion = document.forms["turnoForm"]["descripcion"].value;
    
    // Validación básica
    if (!nombre || !email || !fecha || !hora) {
        alert("Por favor complete todos los campos obligatorios.");
        return false;
    }
    
    // Crear objeto con los datos del turno
    var turno = {
        nombre: nombre,
        email: email,
        fecha: fecha,
        hora: hora,
        tipo: tipo,
        descripcion: descripcion,
        fechaReserva: new Date().toISOString()
    };
    
    // Convertir a JSON
    var turnoJSON = JSON.stringify(turno);
    
    // Usar el API FileSystem para guardar en un archivo de texto (solo Chrome)
    try {
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        
        window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
            fs.root.getFile('turnos/reservas.txt', {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.seek(fileWriter.length); // Mover al final del archivo
                    
                    var blob = new Blob([turnoJSON + "\n"], {type: 'text/plain'});
                    fileWriter.write(blob);
                    
                    alert("Turno reservado con éxito. Te contactaremos para confirmar.");
                    ocultarFormularioTurno();
                    document.forms["turnoForm"].reset();
                }, errorHandler);
            }, errorHandler);
        }, errorHandler);
    } catch(e) {
        // Fallback para navegadores que no soportan FileSystem API
        alert("Turno reservado (simulado). En un entorno real, esto se guardaría en el servidor.");
        ocultarFormularioTurno();
        document.forms["turnoForm"].reset();
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
        case 'simple': costoBase *= 1; break;
        case 'moderado': costoBase *= 1.5; break;
        case 'complejo': costoBase *= 2.5; break;
    }
    
    document.getElementById('costo').textContent = "$" + costoBase.toFixed(2);
}

// Función para el toggle de FAQs
function toggleFAQ(element) {
    var answer = element.nextElementSibling;
    var icon = element.querySelector('.toggle-icon');
    
    if (answer.style.display === 'none' || !answer.style.display) {
        answer.style.display = 'block';
        icon.textContent = '-';
    } else {
        answer.style.display = 'none';
        icon.textContent = '+';
    }
}

// Función para filtrar obras
function filtrarObras(categoria) {
    var obras = document.querySelectorAll('.obra-item');
    var botones = document.querySelectorAll('.filtro-btn');
    
    // Actualizar botones activos
    botones.forEach(function(boton) {
        if (boton.textContent.toLowerCase().includes(categoria) || 
            (categoria === 'todas' && boton.textContent === 'Todas')) {
            boton.classList.add('active');
        } else {
            boton.classList.remove('active');
        }
    });
    
    // Mostrar/ocultar obras
    obras.forEach(function(obra) {
        if (categoria === 'todas' || obra.getAttribute('data-categoria').includes(categoria)) {
            obra.style.display = 'block';
        } else {
            obra.style.display = 'none';
        }
    });
}

// Función para consultar por una obra
function consultarObra(nombreObra) {
    var nombre = prompt("Por favor ingresa tu nombre para contactarte sobre la obra '" + nombreObra + "':");
    if (nombre) {
        alert("Gracias " + nombre + ". Me pondré en contacto contigo pronto para brindarte más información sobre '" + nombreObra + "'.");
    }
}

// Función para enviar formulario de contacto
function enviarContacto() {
    var nombre = document.forms["contactoForm"]["nombre-contacto"].value;
    if (nombre) {
        alert("Gracias " + nombre + " por tu mensaje. Te responderé a la brevedad.");
        document.forms["contactoForm"].reset();
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