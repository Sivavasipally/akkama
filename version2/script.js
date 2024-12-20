let cart = [];
let total = 0;

// Function to add an item to the cart with quantity
function addToCart(name, price, quantity) {
    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a quantity greater than 0.");
        return;
    }

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.price += price * quantity;
    } else {
        cart.push({ name, price: price * quantity, quantity });
    }

    total += price * quantity;
    alert(`${quantity} x ${name} added to cart.`);
    updateCartPopup();
    updateCartCounter();
}

// Function to update the cart popup dynamically
function updateCartPopup() {
    const cartSummary = document.getElementById("cart-popup-summary");
    const cartTotal = document.getElementById("cart-popup-total");
    cartSummary.innerHTML = "";
    let tempTotal = 0;

    cart.forEach((item, index) => {
        tempTotal += item.price;
        cartSummary.innerHTML += `
            <tr>
                <td>${item.name} (x${item.quantity})</td>
                <td>₹${item.price}</td>
                <td><a href="#" onclick="removeFromCart(${index})">Remove</a></td>
            </tr>`;
    });

    total = tempTotal;
    cartTotal.textContent = total;
}

// Function to update the cart counter
function updateCartCounter() {
    const cartCounter = document.getElementById("cart-counter");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCartPopup();
    updateCartCounter();
}

// Function to open the cart popup
function openCartPopup() {
    updateCartPopup();
    document.getElementById('cart-popup').style.display = 'flex';
}

// Function to close the cart popup
function closeCartPopup() {
    document.getElementById('cart-popup').style.display = 'none';
}

// Function to submit the cart
function submitCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Order Submitted! Total: ₹${total}`);
    cart = [];
    total = 0;
    updateCartPopup();
    updateCartCounter();
}

// Function to display item details in a popup card with an image
function openDetails(name, description, price, imageSrc) {
    const detailsPopup = document.getElementById('details-popup');
    const detailsContent = document.getElementById('details-popup-content');

    detailsContent.innerHTML = `
        <h2>${name}</h2>
        <img src="${imageSrc}" alt="${name}" style="width: 100%; border-radius: 8px; margin: 10px 0;">
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Price:</strong> ₹${price}</p>
        <button onclick="closeDetails()">Close</button>
    `;
    detailsPopup.style.display = 'flex';
}

function closeDetails() {
    document.getElementById('details-popup').style.display = 'none';
}
