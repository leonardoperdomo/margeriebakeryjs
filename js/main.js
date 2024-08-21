let products = [];

document.addEventListener("DOMContentLoaded", () => {
  const getProducts = fetch("../js/data.json");
  getProducts
    .then((res) => res.json())
    .then((res) => {
      products = res;
      renderProducts(products);
    });
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const renderProducts = (ArrayProductos) => {
  const containerProducts = document.getElementById("productsContainer");
  containerProducts.innerHTML = "";

  ArrayProductos.forEach((product) => {
    let productCard = document.createElement("div");
    productCard.className = "boxArticulos";
    productCard.innerHTML = `<img src="${product.image}" alt="${product.title}" />
      <p>${product.title}</p>
      <p>Precio: ${product.price}</p>
      <button class="botoncomprar" onclick="AddToCart(${product.id})">Comprar</button>`;
    containerProducts.appendChild(productCard);
  });
};

const AddToCart = (id) => {
  let product = products.find((elemento) => elemento.id === id);
  productOnTheCart = cart.find((elemento) => elemento.id === id);
  if (productOnTheCart) {
    productOnTheCart.quantity += 1;
    Toastify({
      text: "Se ha sumado 1 al stock",
      duration: 3000,
      style: {
        background: "#84C0C6",
      },
    }).showToast();
  } else {
    cart.push({ ...product, quantity: 1 });
    Toastify({
      text: "Producto agregado exitosamente al carrito",
      duration: 3000,
      style: {
        background: "#84C0C6",
      },
    }).showToast();
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

const inputSearch = document.getElementById("searchInput");
if (inputSearch) {
  inputSearch.addEventListener("input", (evento) => {
    let value = evento.target.value.toLowerCase();
    let ArrayFilter = products.filter((product) =>
      product.title.toLocaleLowerCase().includes(value)
    );
    renderProducts(ArrayFilter);
  });
}

renderProducts(products);
