class Producto {
    constructor(nombre, valor, stock) {
        this.nombre = nombre;
        this.valor = valor;
        this.stock = stock;
    }

    toArray() {
        return [this.nombre, this.valor, this.stock];
    }
}

const productos = [];
const tblRegister = document.getElementById('tblRegister').getElementsByTagName('tbody')[0];

document.getElementById('btnAgregar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const valor = document.getElementById('valor').value;
    const stock = document.getElementById('stock').value;

    const nuevoProducto = new Producto(nombre, valor, stock);
    productos.push(nuevoProducto);
    agregarFila(nuevoProducto);
    limpiarCampos();
});

function agregarFila(producto) {
    const fila = tblRegister.insertRow();
    const cNombre = fila.insertCell(0);
    const cValor = fila.insertCell(1);
    const cStock = fila.insertCell(2);

    cNombre.textContent = producto.nombre;
    cValor.textContent = producto.valor;
    cStock.textContent = producto.stock;

    fila.addEventListener('click', () => {
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('valor').value = producto.valor;
        document.getElementById('stock').value = producto.stock;
    });
}

function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('stock').value = '';
}

document.getElementById('btnEliminarTodo').addEventListener('click', () => {
    while (tblRegister.rows.length > 0) {
        tblRegister.deleteRow(0);
    }
    productos.length = 0; // Limpiar el array
});

document.getElementById('btnEliminar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const index = productos.findIndex(p => p.nombre === nombre);
    if (index !== -1) {
        productos.splice(index, 1);
        tblRegister.deleteRow(index);
        limpiarCampos();
    }
});

document.getElementById('btnEditar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const index = productos.findIndex(p => p.nombre === nombre);
    if (index !== -1) {
        const valor = document.getElementById('valor').value;
        const stock = document.getElementById('stock').value;
        productos[index] = new Producto(nombre, valor, stock);
        actualizarTabla();
        limpiarCampos();
    }
});

function actualizarTabla() {
    while (tblRegister.rows.length > 0) {
        tblRegister.deleteRow(0);
    }
    productos.forEach(agregarFila);
}