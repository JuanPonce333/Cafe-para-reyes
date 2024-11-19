document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const role = document.getElementById('role').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    if (!role || !correo || !password) {
        alert("Por favor, complete todos los campos");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const usuarios = await response.json();
        
        // Verificar si existe un usuario con el correo y contraseña proporcionados
        const usuarioEncontrado = usuarios.find(user => 
            user.correo === correo && 
            user.contrasena === password
        );

        if (usuarioEncontrado) {
            switch(role) {
                case "employee":
                    alert("¡Bienvenido Empleado!");
                    window.location.href = "agregarproducto.html";
                    break;
                case "admin":
                    alert("¡Bienvenido Administrador!");
                    window.location.href = "administrador.html";
                    break;
                default:
                    alert("Rol no válido");
            }
        } else {
            alert("Credenciales incorrectas. Por favor, verifique su correo y contraseña.");
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor. Por favor, intente más tarde.');
    }
});