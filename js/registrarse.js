document.getElementById('registrarseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene la recarga de la página

    const usuario = document.getElementById('usuario').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const confirmarContraseña = document.getElementById('confirmarContraseña').value;

    // Validar que las contraseñas coincidan antes de enviar al servidor
    if (contrasena !== confirmarContraseña) {
        alert('Las contraseñas no coinciden');
        return;
    }

    fetch('http://127.0.0.1:5000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, correo, contrasena }) // Solo envía lo necesario
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(err => Promise.reject(err));
        }
    })
    .then(data => {
        alert(data.message); // Mensaje exitoso
        window.location.href = "login.html"; // Redirige al login
    })
    .catch(err => {
        alert(`Error: ${err.message || 'Algo salió mal'}`); // Maneja errores genéricos
    });
});

