document.addEventListener('DOMContentLoaded', () => {
    // Array to hold the items currently in the cart
    let cart = [];
    
    // Get references to key DOM elements
    const cartCountSpan = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Function to update the entire cart display
    function updateCartDisplay() {
        let total = 0;
        
        // Clear the current list of items
        cartItemsList.innerHTML = ''; 

        // Loop through the items in the cart array
        cart.forEach(item => {
            // Calculate the item's subtotal
            const itemSubtotal = item.price * item.quantity;
            total += itemSubtotal;
            
            // Create a list item element for the cart display
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} x ${item.quantity} - $${itemSubtotal.toFixed(2)}`;
            cartItemsList.appendChild(listItem);
        });

        // Update the cart count in the header
        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Update the cart total
        cartTotalSpan.textContent = `$${total.toFixed(2)}`;
    }

    // Attach event listeners to all 'Add to Cart' buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Get product info from the button's data attributes
            const productName = event.target.dataset.name;
            const productPrice = parseFloat(event.target.dataset.price);

            // Check if the item is already in the cart
            const existingItem = cart.find(item => item.name === productName);

            if (existingItem) {
                // If it exists, just increase the quantity
                existingItem.quantity += 1;
            } else {
                // If it's new, add it to the cart array
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            // Refresh the display
            updateCartDisplay();
            
            console.log(`${productName} added to cart!`);
        });
    });

    // Initialize the display on page load
    updateCartDisplay();
});
