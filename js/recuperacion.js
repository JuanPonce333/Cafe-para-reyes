document.getElementById('recuperar').addEventListener('submit', async function(event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value;

    if(!correo){
        document.getElementById('mensajeRecuperacion').innerText = 'Por favor, ingrese un correo valido'
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/usuarios/contrasena', {  // Usar 127.0.0.1
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: correo })
        });
        const data = await response.json();

        if(data.success){
            document.getElementById('mensajeRecuperacion').innerText = `La contraseña es: ${data.contrasena}`;
        }else{
            document.getElementById('mensajeRecuperacion').innerText = `Error: ${data.message}`;
        }
    }catch (error){
        document.getElementById('mensajeRecuperacion').innerText = 'Hubo un error al procesar la solicitud. Intente más tarde.';
    }
});