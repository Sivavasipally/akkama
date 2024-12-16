let cart = [];
let total = 0;

// Open Details Popup
function openDetails(name, description, price, imgSrc) {
    document.getElementById('popup-modal').style.display = 'flex';
    document.getElementById('popup-name').innerText = name;
    document.getElementById('popup-description').innerText = description;
    document.getElementById('popup-cost').innerText = price;
    document.getElementById('popup-img').src = imgSrc;

    const popupAddToCart = document.getElementById('popup-add-to-cart');
    popupAddToCart.onclick = () => {
        addToCart(name, price);
        closeDetails();
    };
}

function closeDetails() {
    document.getElementById('popup-modal').style.display = 'none';
}

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartSummary = document.getElementById("cart-summary");
    const cartTotal = document.getElementById("cart-total");

    cartSummary.innerHTML = "";
    cart.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td><a href="#" onclick="removeFromCart(${index})">Remove</a></td>
            </tr>
        `;
        cartSummary.innerHTML += row;
    });

    cartTotal.textContent = total;
}

function submitCart1() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const summary = cart.map(item => `${item.name}: ₹${item.price}`).join("\n");
    alert(`Order Summary:\n${summary}\nTotal: ₹${total}`);

    testaler = urlEncodeText(`Order Summary:\n${summary}\nTotal: ₹${total}`)

    alert(testaler);
    
    cart = [];
    total = 0;
    updateCart();
}


// Function to URL-encode a given text
function urlEncodeText(text) {
    return encodeURIComponent(text);
}


// Function to submit the cart
function submitCart() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add some items before submitting.");
        return;
    }

    // Ask for confirmation to proceed
    let summary = cart.map(item => `${item.name}: ₹${item.price}`).join("\n");
    const confirmation = confirm(`Do you want to proceed with your order? \n${summary}\n\nTotal: ₹${total}`);
    if (confirmation) {
        let summary = cart.map(item => `${item.name}: ₹${item.price}`).join("\n");
        //alert(`Order Submitted Successfully!\n\nOrder Summary:\n${summary}\n\nTotal: ₹${total}`);
        testaler = urlEncodeText(`Order Summary:\n${summary}\nTotal: ₹${total}`)
        const url = `https://wa.me/+916305727289/?text=${testaler}`;
        console.log(url)
        window.open(url, '_blank');
        
        // Clear the cart after submission
        cart = [];
        total = 0;
        updateCart();
    } else {
        alert("Order submission canceled.");
    }
}