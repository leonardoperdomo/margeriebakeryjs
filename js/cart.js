let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

const renderProducts = (ArrayProductos) => {
  let containerCart = document.getElementById("container-cart");
  containerCart.innerHTML = "";

  if (ArrayProductos.length === 0) {
    containerCart.innerHTML = "<p>Su carrito de compra esta vacio.</p>";
    document.getElementById("total-price").textContent = "Total: $0.00";
    return;
  }

  ArrayProductos.forEach((producto) => {
    let productCard = document.createElement("div");
    productCard.className = "boxArticulos";
    productCard.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}" />
      <p>${producto.title}</p>
      <p>Precio: ${producto.price}</p>
      <div class="container-btns">
        <button onclick="RestarQuantity(${producto.id})">-</button>
        <p>${producto.quantity}</p>
        <button onclick="SumarQuantity(${producto.id})">+</button>
      </div>
      <button class="botoncomprar" onclick="DeleteItemCart(${producto.id})">Eliminar</button>
    `;
    containerCart.appendChild(productCard);
  });

  updateTotal();
};

const SumarQuantity = (id) => {
  const productFound = cart.find((elemento) => elemento.id === id);
  if (productFound) {
    productFound.quantity += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderProducts(cart);
};

const RestarQuantity = (id) => {
  const productFound = cart.find((elemento) => elemento.id === id);
  if (productFound) {
    productFound.quantity -= 1;
  }
  if (productFound.quantity === 0) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "El mínimo de compra es 1",
      showConfirmButton: true,
      timer: 1500,
    });
    SumarQuantity(id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderProducts(cart);
};

const DeleteItemCart = (id) => {
  Swal.fire({
    title: "¿Quieres eliminar el artículo del carrito?",
    showDenyButton: true,
    confirmButtonText: "Sí, quiero eliminar",
    denyButtonText: "No, no quiero eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      cart = cart.filter((elemento) => elemento.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderProducts(cart);
    }
  });
};

const updateTotal = () => {
  const total = cart.reduce(
    (sum, producto) => sum + producto.price * producto.quantity,
    0
  );
  document.getElementById("total-price").textContent = `Total: $${total.toFixed(
    2
  )}`;
};

const finishBuy = () => {
  Swal.fire({
    title: "Desea confirmar la compra?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Si",
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Compra exitosa");
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      renderProducts(cart);
    } else if (result.isDenied) {
      Swal.fire("Cancelado");
    }
  });
};

const finishbuybtn = document.getElementById("btn-finishBuy");
finishbuybtn.addEventListener("click", () => {
  finishBuy();
});

renderProducts(cart);
