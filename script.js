// Cart Data
let cart = [];

// Function to Add 1Kg of an Item to the Cart
function addToCart(itemName, itemCost) {
    const quantity = 1; // Predefined quantity for 1Kg
    addToCartCore(itemName, itemCost, quantity);
}

// Function to Add Items to the Cart from the Popup
function addToCartFromPopup() {
    const name = document.getElementById("product-name").innerText;
    const cost = parseFloat(document.getElementById("product-cost").innerText);
    const quantity = parseFloat(document.getElementById("product-quantity").value);

    if (validateQuantity(quantity)) {
        addToCartCore(name, cost, quantity);
        const productPopup = bootstrap.Modal.getInstance(document.getElementById("product-popup"));
        productPopup.hide();
        alert(`${name} added to cart!`);
    } else {
        alert("Please enter a valid quantity greater than 0.");
    }
}

// Core Logic for Adding Items to Cart
function addToCartCore(itemName, itemCost, quantity) {
    const existingItem = cart.find((item) => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: itemName, cost: itemCost, quantity: quantity });
    }

    updateCartCount();
    alert(`${itemName} (x${quantity.toFixed(2)}Kg) added to cart!`);
}

// Function to Validate Quantity
function validateQuantity(quantity) {
    return !isNaN(quantity) && quantity > 0;
}

// Update Cart Count in Header
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount.toFixed(2);
}

// Show Cart Popup
function toggleCartPopup() {
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = "";

    let totalCost = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.cost * item.quantity;
        totalCost += itemTotal;
        cartItemsList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.name} (x${item.quantity.toFixed(2)}Kg) - ₹${itemTotal.toFixed(2)}
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Delete</button>
            </li>`;
    });

    document.getElementById("cart-total").innerText = totalCost.toFixed(2);

    const cartModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("cart-popup"));
    cartModal.show();
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    toggleCartPopup();
}

// Submit Cart
function submitCart() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before submitting.");
        return;
    }

    let summary = "Order Summary:\n";
    cart.forEach((item) => {
        summary += `${item.name} - Quantity: ${item.quantity.toFixed(2)}Kg, Total: ₹${(item.cost * item.quantity).toFixed(2)}\n`;
    });
    summary += `\nTotal Amount: ₹${document.getElementById("cart-total").innerText}`;

    alert(summary);
    cart = []; // Clear the cart after submission
    updateCartCount();
    const cartPopup = bootstrap.Modal.getInstance(document.getElementById("cart-popup"));
    cartPopup.hide();
}

// Show Product Details Popup
function showProductDetails(name, description, weight, cost) {
    document.getElementById("product-name").innerText = name;
    document.getElementById("product-description").innerText = description;
    document.getElementById("product-weight").innerText = weight;
    document.getElementById("product-cost").innerText = cost;
    document.getElementById("product-quantity").value = 1;

    const productImage = document.getElementById("product-image");
    productImage.src = `images/${name.toLowerCase().replace(/ /g, "_")}.jpg`;
    productImage.alt = name;
    productImage.onerror = function () {
        if (!this.dataset.errorHandled) {
            this.src = "images/placeholder.jpg";
            this.dataset.errorHandled = true;
        }
    };

    const productModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("product-popup"));
    productModal.show();
}

// Filter Products Functionality
function filterProducts(sectionClass, searchText) {
    const section = document.querySelector(`.${sectionClass}`);
    const cards = section.querySelectorAll(".card");

    searchText = searchText.toLowerCase();

    cards.forEach((card) => {
        const title = card.querySelector(".card-title").innerText.toLowerCase();
        if (title.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
