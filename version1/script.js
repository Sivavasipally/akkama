let cart = [];
let total = 0;

// Add to Cart
function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

// Update Cart
function updateCart() {
    const cartSummary = document.getElementById("cart-summary");
    const cartTotal = document.getElementById("cart-total");

    cartSummary.innerHTML = ""; // Clear cart items
    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        cartSummary.appendChild(li);
    });

    cartTotal.textContent = total;
}

// View Details
function viewDetails(name, description, price) {
    alert(`Item: ${name}\nDescription: ${description}\nPrice: ₹${price}`);
}

// Submit Cart
function submitCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const summary = cart.map((item) => `${item.name}: ₹${item.price}`).join("\n");
    alert(`Your Order Summary:\n\n${summary}\n\nTotal: ₹${total}\n\nThank you for shopping!`);

    // Clear Cart
    cart = [];
    total = 0;
    updateCart();
}
