
let carrito =  JSON.parse(localStorage.getItem("carrito")) || [] ;

const botonAgregarCarrito = document.querySelector("#boton-agregar-carrito");
botonAgregarCarrito.addEventListener("click", agregarProductoCarritoCliked);




function agregarProductoCarritoCliked(event){
    Swal.fire(
        'Añadido Al Carrito!',
        'success'
      )
    const boton = event.target;
    const producto = boton.closest('#seccion-producto-principal');
    
    const nombreProducto = producto.querySelector(".nombre-producto").textContent;
    const precioProducto = producto.querySelector("#precio-producto").textContent;
    const imagenProducto = producto.querySelector("#imagen-producto-principal").src;
    
    pushearProductoAlCarrito(nombreProducto,imagenProducto,precioProducto);
}

function pushearProductoAlCarrito(nombreProducto,imagenProducto,precioProducto){
    carrito.push({
    nombre: nombreProducto,
    imagen: imagenProducto,
    precio: precioProducto
   })
   console.log((carrito))
    saveLocal(); 
}

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

