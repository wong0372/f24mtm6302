// Variables
const categories = ['All', 'T-Shirts', 'Pants', 'Shoes'];
const cart = [];

/**
 * Displays the list of categories as HTML list items on the page.
 */
function displayCategories() {
    // Retrieve the HTML element where the categories will be displayed
    const categoryContainer = document.getElementById('categories');
    
    // Map over each category to create HTML list items
    const categoryList = categories.map(category => `<li>${category}</li>`).join('');
    
    // Insert the combined HTML into the category container element
    categoryContainer.innerHTML = categoryList;
}

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
 * Updates the cart display on the webpage by generating a list of
 * the products currently in the cart.
 */
function displayCart() {
    // Get the cart <ol> element from the DOM
    const cartList = document.getElementById('cart');
    
    // Clear the current content of the cart display to avoid duplicates
    cartList.innerHTML = '';

    // Loop through the cart array and generate a list item for each product
    cart.forEach(item => {
        // Create a new <li> element for the cart item
        const listItem = document.createElement('li');

        // Set the text content of the <li> with the item
        listItem.textContent = item;

        // Append the list item to the cart <ol> element in the DOM
        cartList.appendChild(listItem);
    });
}

/**
 * Removes a product from the cart by filtering out the selected product,
 * and updates the cart display.
 * @param {string} product - The name of the product to be removed.
 */
function removeFromCartByProduct(product) {
    // Create a new cart array excluding the product to be removed
    cart = cart.filter(item => item !== product);
    // Refresh the cart display to reflect the changes
    displayCart();
}