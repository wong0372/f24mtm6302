// Array of product categories for the shop
const categories = ['All', 'T-Shirts', 'Pants', 'Shoes'];

// Array to store the products added to the shopping cart
let cart = [];

/**
 * Adds a product to the cart and updates the cart display.
 * @param {string} product - The name of the product to be added.
 */
function addToCart(product) {
    // Add the selected product to the cart array
    cart.push(product);
    // Refresh the cart display to show the updated cart
    displayCart();
}

/**
 * Removes a product from the cart by filtering out the selected product,
 * and updates the cart display.
 * @param {string} product - The name of the product to be removed.
 */
function removeFromCart(product) {
    // Create a new cart array excluding the product to be removed
    cart = cart.filter(item => item !== product);
    // Refresh the cart display to reflect the changes
    displayCart();
}

/**
 * Updates the cart display on the webpage by generating a list of
 * the products currently in the cart.
 */
function displayCart() {
    // Get the cart <ol> element from the DOM
    const cartList = document.getElementById('cart');
    
    // Clear the current content of the cart display to avoid duplicates
    cartList.innerHTML = '';

    // Loop through the cart array and generate a list item for each product
    cart.forEach( item => {
        // Create a new <li> element for the cart item
        const listItem = document.createElement('li');

        // Create a text node with the item
        const itemText = document.createTextNode(`${item}`);
        listItem.appendChild(itemText);  // Add the text to the <li> element

        // Append the list item to the cart <ol> element in the DOM
        cartList.appendChild(listItem);
    });
}
