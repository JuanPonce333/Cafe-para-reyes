from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Configuración de conexión a la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="cafereyes"
)

cursor = db.cursor(dictionary=True)

# Endpoint para crear un usuario (POST)
@app.route('/usuarios', methods=['POST'])
def crear_usuario():
    data = request.json
    usuario = data.get('usuario')
    correo = data.get('correo')
    contrasena = data.get('contrasena')

    if not usuario or not correo or not contrasena:
        return jsonify({'message': 'Todos los campos son obligatorios'}), 400

    try:
        # Insertar datos en la tabla usuarios
        cursor.execute(
            "INSERT INTO usuarios (usuario, correo, contrasena) VALUES (%s, %s, %s)",
            (usuario, correo, contrasena)
        )
        db.commit()
        return jsonify({'message': 'Usuario creado con éxito'}), 201
    except mysql.connector.Error as err:
        if err.errno == 1062:  # Error de clave única
            return jsonify({'message': 'El correo ya está registrado'}), 409
        return jsonify({'message': 'Error al crear el usuario'}), 500

# Endpoint para crear un usuario (POST)
@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    try:
        cursor.execute("SELECT correo, contrasena FROM usuarios")
        resultados = cursor.fetchall()
        return jsonify(resultados), 200
    except mysql.connector.Error as err:
        return jsonify({'message': 'Error al obtener los usuarios', 'error': str(err)}), 500


# **Nuevo endpoint para obtener la contraseña por correo**
@app.route('/usuarios/contrasena', methods=['POST'])
def obtener_contrasena():
    data = request.json
    correo = data.get('correo')

    if not correo:
        return jsonify({'message': 'El correo es obligatorio'}), 400

    try:
        # Consultar la contraseña asociada al correo
        cursor.execute("SELECT contrasena FROM usuarios WHERE correo = %s", (correo,))
        resultado = cursor.fetchone()

        if resultado:
            return jsonify({'success': True, 'correo': correo, 'contrasena': resultado['contrasena']}), 200
        else:
            return jsonify({'success': False, 'message': 'Correo no registrado'}), 404
    except mysql.connector.Error as err:
        return jsonify({'message': 'Error al obtener la contraseña', 'error': str(err)}), 500


if __name__ == '__main__':
    app.run(debug=True)
