// Variables
const products = [
  {
    id: 1,
    title: "Maple Leaf T-Shirt",
    basePrice: 7.99,
    fabrics: {
      cotton: 7.99,
      polyester: 8.99,
      blend: 9.49
    },
    image: "blue-t-shirt-maple-leaf.webp"
  },
  {
    id: 2,
    title: "Ottawa T-Shirt",
    basePrice: 7.99,
    fabrics: {
      cotton: 7.99,
      "organic cotton": 9.99
    },
    image: "dark-green-t-shirt-parliament-hill.webp"
  },
  {
    id: 3,
    title: "Montreal T-Shirt",
    basePrice: 7.99,
    fabrics: {
      cotton: 7.99,
      "dry-fit": 9.99
    },
    image: "dark-navy-blue-t-shirt-montreal.webp"
  },
  {
    id: 4,
    title: "Landscape T-Shirt",
    basePrice: 7.99,
    fabrics: {
      polyester: 7.99,
      "eco-blend": 10.99
    },
    image: "green-t-shirt-landscape.webp"
  },
  {
    id: 5,
    title: "Quebec City T-Shirt",
    basePrice: 7.99,
    fabrics: {
      cotton: 7.99,
      "organic cotton": 9.99,
      "hemp blend": 10.99
    },
    image: "light-gray-t-shirt-quebec-city.webp"
  },
  {
    id: 6,
    title: "Beaver T-Shirt",
    basePrice: 7.99,
    fabrics: {
      cotton: 7.99,
      polyester: 8.49,
      "dry-fit": 9.99
    },
    image: "maroon-t-shirt-beaver.webp"
  }
];

// Get the container elements
const productsContainer = document.getElementById('products');
const cartItemsContainer = document.getElementById('cart-items');

// Cart array to store added products
let cart = [];


/** Rendering Products Dynamically */
function renderProducts() {
  products.forEach((product) => {
    // Create a product card
    const productCard = document.createElement('div');
    productCard.classList.add('col', 'col-12', 'col-md-6', 'col-lg-4', 'mb-4');

    // Get the first fabric and its price
    const firstFabric = Object.keys(product.fabrics)[0];
    const firstFabricPrice = product.fabrics[firstFabric];

    productCard.innerHTML = `
      <div class="card h-100 d-flex flex-column rounded-0">
        <a href="#" data-bs-toggle="modal" data-bs-target="#productModal" class="image-button">
          <img src="../../assets/images/${product.image}" class="img-fluid mb-3" alt="${product.title}">
        </a>
        <div class="card-body d-flex flex-column">
          <h3 class="card-title text-center mb-3">${product.title}</h3>
          <label for="fabric-${product.id}" class="form-label mb-0 me-2">Fabric:</label>
          <select 
            id="fabric-${product.id}" 
            name="fabric" 
            class="form-select mb-3 rounded-0"
            >
            ${Object.entries(product.fabrics)
              .map(
                (entry) =>
                  `<option value="${entry[0]}">${entry[0]} - $${entry[1]}</option>`
              )
              .join('')}
          </select>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <p class="mb-0" id="price-${product.id}"><strong>$${firstFabricPrice}</strong></p>
            <button class="btn btn-secondary rounded-0 add-to-cart-button" 
              data-product-id="${product.id}"
              data-product-title="${product.title}"
              data-product-image="${product.image}"
              data-product-fabric="${firstFabric}" 
              data-product-price="${firstFabricPrice}">
            Add to cart</button>
          </div>
        </div>
      </div>
    `;

    // Append the product card to the products container
    productsContainer.appendChild(productCard);

    /** 
     * Update the price when the fabric changes 
     * */
    const fabricSelect = productCard.querySelector(`#fabric-${product.id}`)

    fabricSelect.addEventListener('change', function(e){

      // Get the selected fabric option from the dropdown and update the custom data attribute on the add-to-cart-button
      const selectedFabric = e.target.value
      const addToCartButton = productCard.querySelector('.add-to-cart-button')
      addToCartButton.dataset.productFabric = selectedFabric

      // Find the price associated with the selected fabric and update the custom data attribute on the add-to-cart-button
      const price = product.fabrics[selectedFabric]
      addToCartButton.dataset.productPrice = price

      // Get the element that displays the price for this product by its ID.
      const priceElement = productCard.querySelector(`#price-${product.id}`)
      priceElement.innerHTML = "<strong>$" + price + "</strong>"
    })//close the update price event listener
  });// Close the forEach
}

/** 
 * "Add to cart" functionality using event delegation 
 * */
// Add a click event listener to the products container.
productsContainer.addEventListener('click', function(e){

  // Check if the clicked element is the "Add to cart" button.
  if(e.target.classList.contains('add-to-cart-button')){

    // Get the button element that was clicked.
    const addToCartButton = e.target

    // Retrieve the product ID, title, image, fabric and price from the button's data attributes and create a cart item object.
    const cartItem = {
      id: addToCartButton.dataset.productId,
      title: addToCartButton.dataset.productTitle,
      fabric: addToCartButton.dataset.productFabric,
      price: addToCartButton.dataset.productPrice,
      image: addToCartButton.dataset.productImage
    };

    // Add the cart item to the cart array
    cart.push(cartItem);

    // Save the cart array as a JSON string in localStorage; localStorage.setItem() & JSON.stringify()
    localStorage.setItem('cart', JSON.stringify(cart));

    // Display the cart item
    const cartItemElement = document.createElement('li');
    cartItemElement.classList.add('list-group-item', 'd-flex', 'align-items-center', 'mb-2');
    cartItemElement.innerHTML = `
      <img src="../../assets/images/${cartItem.image}" alt="${cartItem.title}" class="me-3" style="width: 50px; height: auto;">
      <div class="flex-grow-1">
        <h5 class="mb-1">${cartItem.title}</h5>
        <p class="mb-0">Fabric: ${cartItem.fabric}</p>
      </div>
      <div style="width: 80px; text-align: right;">
        <p class="mb-0"><strong>$${cartItem.price}</strong></p>
      </div>
    `;

    // Append the cart item to the cart items container
    cartItemsContainer.appendChild(cartItemElement);

  }//close if
})//close "Add to cart" event listener

renderProducts();

/** Week 11 */
// 1
// Save the cart array as a JSON string in localStorage; localStorage.setItem() & JSON.stringify()

// 2
// Load data from localStorage; localStorage.getItem()
const cartLS = localStorage.getItem('cart')
// Validate is not empty
if(cartLS){
  // Parse the JSON data and assign it to the cart array; JSON.parse()
  cart = JSON.parse(cartLS)
  // Display each saved item in the cart UI.
  cart.forEach( (cartItem) => {
    const cartItemElement = document.createElement('li');
    cartItemElement.classList.add('list-group-item', 'd-flex', 'align-items-center', 'mb-2');
    cartItemElement.innerHTML = `
      <img src="../../assets/images/${cartItem.image}" alt="${cartItem.title}" class="me-3" style="width: 50px; height: auto;">
      <div class="flex-grow-1">
        <h5 class="mb-1">${cartItem.title}</h5>
        <p class="mb-0">Fabric: ${cartItem.fabric}</p>
      </div>
      <div style="width: 80px; text-align: right;">
        <p class="mb-0"><strong>$${cartItem.price}</strong></p>
      </div>
    `;

    // Append the cart item to the cart items container
    cartItemsContainer.appendChild(cartItemElement);
  })
}



  
