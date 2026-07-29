// Mini-Project: Shopping Cart

const STORAGE_KEY = "shoppingCart";

// Centralized State
const state = {
    products: [
        { id: 1, name: "Laptop", price: 999, image: "https://placehold.co/200x120/3498db/fff?text=Laptop" },
        { id: 2, name: "Phone", price: 699, image: "https://placehold.co/200x120/27ae60/fff?text=Phone" },
        { id: 3, name: "Headphones", price: 199, image: "https://placehold.co/200x120/e74c3c/fff?text=Headphones" },
        { id: 4, name: "Smartwatch", price: 299, image: "https://placehold.co/200x120/f39c12/fff?text=Watch" },
        { id: 5, name: "Keyboard", price: 89, image: "https://placehold.co/200x120/9b59b6/fff?text=Keyboard" },
        { id: 6, name: "Mouse", price: 49, image: "https://placehold.co/200x120/1abc9c/fff?text=Mouse" }
    ],
    cart: loadCart()
};

// DOM Elements
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");

// Storage functions
function loadCart() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
}

function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

// Cart operations
function addToCart(productId) {
    const existing = state.cart.find(item => item.productId === productId);

    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }

    saveCart();
    renderCart();
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = state.cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = quantity;
        saveCart();
        renderCart();
    }
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId !== productId);
    saveCart();
    renderCart();
}

function clearCart() {
    state.cart = [];
    saveCart();
    renderCart();
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId);
        return total + (product.price * item.quantity);
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

// Render functions
function renderProducts() {
    productList.innerHTML = state.products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
    `).join("");
}

function renderCart() {
    if (state.cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
    } else {
        cartItems.innerHTML = state.cart.map(item => {
            const product = state.products.find(p => p.id === item.productId);
            return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${product.name}</h4>
                        <p>$${product.price} x ${item.quantity}</p>
                    </div>
                    <div class="qty-controls">
                        <button class="qty-btn" data-id="${product.id}" data-action="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" data-id="${product.id}" data-action="increase">+</button>
                    </div>
                    <button class="remove-btn" data-id="${product.id}">Remove</button>
                </div>
            `;
        }).join("");
    }

    cartCount.textContent = getCartCount();
    cartTotal.textContent = getCartTotal().toFixed(2);
}

// Event Listeners
productList.addEventListener("click", function(event) {
    if (event.target.classList.contains("add-to-cart-btn")) {
        const productId = Number(event.target.dataset.id);
        addToCart(productId);
    }
});

cartItems.addEventListener("click", function(event) {
    const productId = Number(event.target.dataset.id);

    if (event.target.classList.contains("qty-btn")) {
        const action = event.target.dataset.action;
        const item = state.cart.find(item => item.productId === productId);

        if (action === "increase") {
            updateQuantity(productId, item.quantity + 1);
        } else if (action === "decrease") {
            updateQuantity(productId, item.quantity - 1);
        }
    }

    if (event.target.classList.contains("remove-btn")) {
        removeFromCart(productId);
    }
});

clearCartBtn.addEventListener("click", clearCart);

// Initialize
renderProducts();
renderCart();