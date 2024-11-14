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
    // Get the fabric dropdown element for the specific product by its ID.
    // fabricSelect = find element by ID `fabric-${product.id}`
    const fabricSelect = document.getElementById(`fabric-${product.id}`)

    // Add an event listener to the fabric dropdown that listens for changes.
    // On 'change' event:
    fabricSelect.addEventListener('change', function(e){

      // Get the selected fabric option from the dropdown and update the custom data attribute on the add-to-cart-button
      // selectedFabric = get value of the changed dropdown option (event.target.value)
      const selectedFabric = e.target.value
      const addToCartButton = productCard.querySelector('.add-to-cart-button')
      addToCartButton.dataset.productFabric = selectedFabric

      // Find the price associated with the selected fabric and update the custom data attribute on the add-to-cart-button
      // price = product's fabric options at selectedFabric key
      const price = product.fabrics[selectedFabric]
      addToCartButton.dataset.productPrice = price

      // Get the element that displays the price for this product by its ID.
      // priceElement = find element by ID `price-${product.id}`
      const priceElement = document.getElementById(`price-${product.id}`)

      // Update the inner HTML of the price element to show the new price.
      // Set priceElement’s innerHTML to `"<strong>$" + price + "</strong>"`
      priceElement.innerHTML = "<strong>$" + price + "</strong>"
    })//close the update price event listener

    /** 
     * Refactor the "Add to cart" functionality using event delegation 
     * */
    // // Add event listener to the "Add to cart" button
    // const addToCartButton = productCard.querySelector('.add-to-cart-button');
    // addToCartButton.addEventListener('click', () => {
    //   const selectedFabric = fabricSelect.value;
    //   const price = product.fabrics[selectedFabric];

    //   // Create a cart item object
    //   const cartItem = {
    //     id: product.id,
    //     title: product.title,
    //     fabric: selectedFabric,
    //     price: price,
    //     image: product.image
    //   };

    //   // Add the cart item to the cart array
    //   cart.push(cartItem);

    //   // Display the cart item
    //   const cartItemElement = document.createElement('li');
    //   cartItemElement.classList.add('list-group-item', 'd-flex', 'align-items-center', 'mb-2');
    //   cartItemElement.innerHTML = `
    //     <img src="../../assets/images/${cartItem.image}" alt="${cartItem.title}" class="me-3" style="width: 50px; height: auto;">
    //     <div class="flex-grow-1">
    //       <h5 class="mb-1">${cartItem.title}</h5>
    //       <p class="mb-0">Fabric: ${cartItem.fabric}</p>
    //     </div>
    //     <div style="width: 80px; text-align: right;">
    //       <p class="mb-0"><strong>$${cartItem.price}</strong></p>
    //     </div>
    //   `;

    //   // Append the cart item to the cart items container
    //   cartItemsContainer.appendChild(cartItemElement);
    // }); // Close addToCartButton event listener

  });// Close the forEach
}

// Add a click event listener to the products container.
// When a click occurs in the container:
productsContainer.addEventListener('click', function(e){

  // Check if the clicked element is the "Add to cart" button.
  // If event target has class 'add-to-cart-button':
  if(e.target.classList.contains('add-to-cart-button')){

    // Get the button element that was clicked.
    // addToCartButton = event target
    const addToCartButton = e.target

    // Retrieve the product ID, title, image, fabric and price from the button's data attributes.
    // productId = addToCartButton's 'data-product-id' attribute
    const productId = addToCartButton.dataset.productId
    const productTitle = addToCartButton.dataset.productTitle
    const productImage = addToCartButton.dataset.productImage
    const productFabric = addToCartButton.dataset.productFabric
    const productPrice = addToCartButton.dataset.productPrice

    /** */
    // Create a cart item object
      const cartItem = {
      id: productId,
      title: productTitle,
      fabric: productFabric,
      price: productPrice,
      image: productImage
    };

    // Add the cart item to the cart array
    cart.push(cartItem);

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

// Call the renderProducts function to display products
renderProducts();