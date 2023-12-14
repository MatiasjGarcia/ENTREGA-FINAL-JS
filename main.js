// Datos de productos
const productos = [
  { id: 1, nombre: "Remera", precio: 10.00 },
  { id: 2, nombre: "Pantalon", precio: 12.00 },
  { id: 3, nombre: "Campera", precio: 16.00 }
];

// Carrito de compras
const carrito = [];

// Renderizar la lista de productos
function renderizarProductos() {
  const productosContainer = document.getElementById("productos");
  productosContainer.innerHTML = "<h2>Productos</h2>";

  productos.forEach(producto => {
      const botonAgregar = document.createElement("button");
      botonAgregar.innerText = "Agregar al carrito";
      botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));

      const productoDiv = document.createElement("div");
      productoDiv.innerHTML = `<p>${producto.nombre} - $${producto.precio.toFixed(2)}</p>`;
      productoDiv.appendChild(botonAgregar);

      productosContainer.appendChild(productoDiv);
  });

  // Llamada a la función fetch
  fetchDataAndDisplay();
}

// Función para hacer una solicitud fetch y mostrar datos
function fetchDataAndDisplay() {
  fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
          console.log('Datos de los productos', data);

      })
      .catch(error => console.error('Error 404', error));
}

// Agregar un producto al carrito
function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarCarrito();

  // Agregar almacenamiento en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualizar carrito y total
function actualizarCarrito() {
  const carritoContainer = document.getElementById("carrito");
  const totalElement = document.getElementById("total");

  carritoContainer.innerHTML = "";
  let total = 0;

  carrito.forEach(producto => {
      const li = document.createElement("li");
      li.innerText = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
      carritoContainer.appendChild(li);

      total += producto.precio;
  });

  totalElement.innerText = total.toFixed(2);
}

// Iniciar pagina
renderizarProductos();
