const conteinerProductos = document.querySelector(".shoppingCartItemsContainer");
const productos = JSON.parse(localStorage.getItem("carrito"));



 Object.entries(productos).forEach(([key, value]) => {

  const elementsTitle = conteinerProductos.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === value.nombre) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }
  const contenidoCarrito = document.createElement("div");
  const item = `
  <div class="row shoppingCartItem">
  <div class="col-6">
      <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <img src=${value.imagen} class="shopping-cart-image">
          <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${value.nombre}</h6>
      </div>
  </div>
  <div class="col-2">
      <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <p class="item-price mb-0 shoppingCartItemPrice">${value.precio}</p>
      </div>
  </div>
  <div class="col-4">
      <div
          class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
          <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
              value="1">
          
      </div>
  </div>
</div>`

  contenidoCarrito.innerHTML = item
  conteinerProductos.append(contenidoCarrito) 

 /*  contenidoCarrito
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem); 
    <button class="btn btn-danger buttonDelete" type="button">X</button>ESTO VA EN EL ITEM
    */
    
  contenidoCarrito
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);
    
  updateShoppingCartTotal();
})

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();

}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

const borrarCarrito = document.querySelector(".botonEliminarCarrito")
borrarCarrito.addEventListener("click", function(event){
  borrarProductosDelTablero()
  localStorage.clear()
   

})

function borrarProductosDelTablero() {
  conteinerProductos.innerHTML = '';
  updateShoppingCartTotal();
} 