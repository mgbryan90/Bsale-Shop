import { getAllCategories } from "../services/categories-services.js";
import {
  getAllProducts,
  getFilterProductsByCategory,
  getFilterProductsByQuery,
} from "../services/products-services.js";
const contenedorLinks = document.querySelector(".navbar-links");
const contenedorProducts = document.querySelector(".container-products");

// Funcion para mostrar los productos.
function showProducts(arregloProducts) {
  // Limpiamos la lista de productos
  contenedorProducts.innerHTML = "";
  arregloProducts.forEach((product) => {
    const cardProduct = document.createElement("div");
    const imgProduct = document.createElement("img");
    const infoProduct = document.createElement("div");
    const priceProduct = document.createElement("div");
    const nameProduct = document.createElement("div");

    // Agregando las clases para sus styles
    cardProduct.className = "card-product";
    infoProduct.className = "infoProduct";
    priceProduct.className = "priceProduct";
    nameProduct.className = "nameProduct";

    // Asignando los datos de cada producto
    imgProduct.src = `${
      product.url_image ? product.url_image : "./images/photocomingsoon.jpg"
    }`;
    priceProduct.textContent = `Precio Referido: $${product.price}`;
    nameProduct.textContent = product.name;

    // Adjuntando los elementos
    infoProduct.appendChild(priceProduct);
    infoProduct.appendChild(nameProduct);
    cardProduct.appendChild(imgProduct);
    cardProduct.appendChild(infoProduct);
    contenedorProducts.appendChild(cardProduct);
  });
}

async function getCategories() {
  const categories = await getAllCategories();
  // Recorremos las categories para listarlas dentro de un li.
  categories.forEach((category) => {
    const li = document.createElement("li");
    // Agregamos una clase para asignar a cada categoria
    li.classList.add("btn-category");
    // Para asignar una id para cada categoria
    li.dataset.id = category.id;
    li.textContent = category.name.toUpperCase();
    contenedorLinks.appendChild(li);
  });
}

async function getProducts() {
  // Guardando todos los productos
  const products = await getAllProducts();
  showProducts(products);
}

async function eventfilterProductsByQuery() {
  // Seleccionando el input y el boton
  const productFinded = document.querySelector("#filter-input");
  const button = document.querySelector("#button");

  const filter = async () => {
    const queryInput = productFinded.value;
    const products = await getFilterProductsByQuery(queryInput);
    showProducts(products);
    // Condicional para cuando en el filtrado no se encuentre un producto muestra "Producto no encontrado..."
    if (contenedorProducts.innerHTML === "") {
      contenedorProducts.innerHTML += `
      <div class="productNofinded">
        <p>Producto no Encontrado...</p>
        <img src="./images/productoNoEncontrado.png" alt="noEncontrado" class = "noEncontrado"/>
      </div>
      `;
    }
  };

  // Evento para el button, cuando se precione se haga el filtro
  button.addEventListener("click", filter);
  // Evento sobre el input, asi valla filtrando por cada letra digitada, gracias al keyup.
  productFinded.addEventListener("keyup", filter);
  // Agregamos un evento al input, cuando se precione Escape o ya no tenga ninguna letra o valor limpie el contenido y vuelva a cargar la lista de productos
  productFinded.addEventListener("keyup", (e) => {
    if (e.key === "Escape" || e.target.value.length === 0) {
      e.target.value = "";
      contenedorProducts.innerHTML = "";
      getProducts();
    }
  });
}

// Funcion para filtrar los productos por cada Categoria.
function eventListenGetProductsByCategory() {
  const btnCategories = document.querySelectorAll(".btn-category");
  btnCategories.forEach((btnCategory) => {
    btnCategory.addEventListener("click", async (e) => {
      const idCategory = e.target.dataset.id;
      const products = await getFilterProductsByCategory(idCategory);
      console.log(products);

      showProducts(products);
    });
  });
}

// Agrego un await para esperar la respuesta de las categorias.
await getCategories();

getProducts();
eventfilterProductsByQuery();
eventListenGetProductsByCategory();
