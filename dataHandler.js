// dataHandler.js - Manejo de datos con LocalStorage

// Función para guardar datos en LocalStorage
function guardarDatos(tipo, datos) {
    try {
        // Obtener datos existentes
        const datosExistentes = JSON.parse(localStorage.getItem(tipo)) || [];
        
        // Agregar nuevos datos
        datosExistentes.push({
            ...datos,
            fechaRegistro: new Date().toISOString()
        });
        
        // Guardar en LocalStorage
        localStorage.setItem(tipo, JSON.stringify(datosExistentes));
        
        // Descargar copia de respaldo
        descargarBackup(tipo, datosExistentes);
        
        return true;
    } catch (error) {
        console.error("Error al guardar datos:", error);
        return false;
    }
}

// Función para descargar backup JSON
function descargarBackup(tipo, datos) {
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `backup_${tipo}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Limpieza
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

// Función para validar campos
function validarCampos(campos) {
    const errores = [];
    
    campos.forEach(campo => {
        const elemento = document.getElementById(campo.id);
        const valor = elemento.value.trim();
        
        if (campo.required && !valor) {
            errores.push(`El campo ${campo.label} es obligatorio`);
            elemento.classList.add('campo-error');
        } else {
            elemento.classList.remove('campo-error');
            
            // Validación adicional para email
            if (campo.type === 'email' && valor && !/^\S+@\S+\.\S+$/.test(valor)) {
                errores.push(`El email no es válido`);
                elemento.classList.add('campo-error');
            }
        }
    });
    
    return errores;
}

// Exportar funciones
export { guardarDatos, validarCampos };