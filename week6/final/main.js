/** Variables */
// 1. Create a Categories Array
const categories = ['All', 'T-Shirts', 'Pants', 'Shoes'];
let cart = [];

/** Functions */
//2. Display Categories Dynamically
/* 
function displayCategories() {
    // Retrieve the HTML element where the categories will be displayed
    const categoryContainer = document.getElementById('categories');
    
    // Clear the container in case there are existing categories
    categoryContainer.innerHTML = '';

    // Iterate over each category and create HTML list items
    categories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.textContent = category;
        categoryContainer.appendChild(listItem);
    });
}
*/


//3. Refactor with map()
function displayCategories() {
    // Retrieve the HTML element where the categories will be displayed
    const categoryContainer = document.getElementById('categories');
    
    // Map over each category to create HTML list items
    const categoryList = categories.map(category => `<li>${category}</li>`).join('');
    
    // Insert the combined HTML into the category container element
    categoryContainer.innerHTML = categoryList;
}


// 4. Add Products to the Cart
function addToCart(product) {
    // Add the selected product to the cart array
    cart.push(product);
    // Refresh the cart display to show the updated cart
    displayCart();
}

// 5. Create a specific function to display the cart. Obtain the code from the addToCart function.
/* 
function displayCart() {
    // Get the cart <ol> element from the DOM
    const cartList = document.getElementById('cart');
    
    // Generate HTML list items for each product in the cart array
    const cartItems = cart.map(item => `<li>${item}</li>`).join('');

    // Insert the combined HTML into the cart <ol> element
    cartList.innerHTML = cartItems;
}
*/


// 6. Refactor Using JavaScript Methods to Create HTML Elements
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

// 7. Remove a Product from the Cart by index
/*
function removeFromCartByProduct(index) {
    // Remove an element from the cart array by its index
    cart.splice((index - 1), 1)
    // Refresh the cart display to reflect the changes
    displayCart();
}
*/


// 8. Remove a Product from the Cart using filter()
function removeFromCartByProduct(product) {
    // Create a new cart array excluding the product to be removed
    cart = cart.filter(item => item !== product);
    // Refresh the cart display to reflect the changes
    displayCart();
}