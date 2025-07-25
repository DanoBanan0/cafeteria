// Variables globales
let carrito = [];
let sidebar;
let overlay;

document.addEventListener("DOMContentLoaded", () => {
    sidebar = document.getElementById("carritoSidebar");
    overlay = document.getElementById("overlay");

    function mostrarCarritoSidebar() {
        const carritoVisible = sidebar.classList.contains("activa");

        if (carritoVisible) {
            sidebar.classList.remove("activa");
            overlay.style.display = "none";
        } else {
            sidebar.classList.add("activa");
            overlay.style.display = "block";
        }
    }

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("activa");
        overlay.style.display = "none";
    });

    window.mostrarCarritoSidebar = mostrarCarritoSidebar;
    window.finalizarCompra = finalizarCompra;
});

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
            <td><button class="btn btn-outline-danger btn-sm" onclick="eliminarDelCarrito('${item.nombre}')">X</button></td>
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

function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarCarrito();
}

function finalizarCompra() {
    sidebar.classList.remove("activa");
    overlay.style.display = "none";

    carrito = [];
    actualizarCarrito();

    const mensajeGeneral = document.getElementById("mensaje-general");
    mensajeGeneral.textContent = "¡Compra procesada con éxito!";
    mensajeGeneral.style.display = "block";

    setTimeout(() => {
        mensajeGeneral.style.display = "none";
        mensajeGeneral.textContent = "";
    }, 3000);
}