let cart = [];
let total = 0;

// Open Details Popup
function openDetails(name, description, price, imgSrc) {
    document.getElementById('popup-modal').style.display = 'flex';
    document.getElementById('popup-name').innerText = name;
    document.getElementById('popup-description').innerText = description;
    document.getElementById('popup-cost').innerText = price;
    document.getElementById('popup-img').src = imgSrc;

    // Add to Cart button in popup
    const popupAddToCart = document.getElementById('popup-add-to-cart');
    popupAddToCart.onclick = function () {
        addToCart(name, price);
        closeDetails();
    };
}

// Close Details Popup
function closeDetails() {
    document.getElementById('popup-modal').style.display = 'none';
}

// Add to Cart
function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

// Remove from Cart
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

// Update Cart
function updateCart() {
    const cartSummary = document.getElementById("cart-summary");
    const cartTotal = document.getElementById("cart-total");

    cartSummary.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price} 
            <button onclick="removeFromCart(${index})">Delete</button>
        `;
        cartSummary.appendChild(li);
    });

    cartTotal.textContent = total;
}

// Submit Cart
function submitCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const summary = cart.map((item) => `${item.name}: ₹${item.price}`).join("\n");
    alert(`Your Order:\n${summary}\n\nTotal: ₹${total}`);
    cart = [];
    total = 0;
    updateCart();
}
