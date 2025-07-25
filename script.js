
//Funcion para mostrar carrito

function mostrarCarritoSidebar() {
    const sidebar = document.getElementById("carritoSidebar");
    sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";

}


let carrito = [];

function actualizarCarrito() {
    const cuerpoTabla = document.getElementById("articulos-carrito");
    const totalCarrito = document.getElementById("carrito-total");
    cuerpoTabla.innerHTML = "";

    let total = 0;

    carrito.forEach(item => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${(item.precio * item.cantidad).toFixed(2)}</td>
        `;
        cuerpoTabla.appendChild(fila);
        total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}


function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
}