
//Funcion para mostrar carrito y agregar overlay completo.
const sidebar = document.getElementById("carritoSidebar");
const overlay = document.getElementById("overlay");

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

// Cierra el carrito si se hace clic en el fondo oscuro
overlay.addEventListener("click", () => {
    sidebar.classList.remove("activa");
    overlay.style.display = "none";
});

//Funcion para actualizar carrito.

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
            <td><button class="btn btn-outline-danger btn-sm" onclick="eliminarDelCarrito('${item.nombre}')">X</button></td>
        `;
        cuerpoTabla.appendChild(fila);
        total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

//Funcion para agregar elementos al carrito incluyendo el precio y sumar el total.

function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
}


//Funcion para eliminar los elementos del carrito

function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarCarrito();
}


//Funcion para funcionalidad del boton finalizar compra y mostrar mensaje de compra procesada.

function finalizarCompra() {
  sidebar.classList.remove("activa");
  overlay.style.display = "none";

  carrito = [];
  actualizarCarrito();

  // Mostrar mensaje
  const mensajeGeneral = document.getElementById("mensaje-general");
  mensajeGeneral.textContent = "¡Compra procesada con éxito!";
  mensajeGeneral.style.display = "block";

  setTimeout(() =>{
    mensajeGeneral.style.display = "none";
    mensajeGeneral.textContent = "";
  }, 3000);
}