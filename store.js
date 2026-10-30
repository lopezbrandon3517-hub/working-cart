
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {

    // Remove buttons
    let removeButtons = document.getElementsByClassName("btn-danger");

    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", removeCartItem);
    }

    // Quantity inputs
    let quantityInputs = document.getElementsByClassName("cart-quantity-input");

    for (let i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", quantityChanged);
    }

    // Add to cart buttons
    let addButtons = document.getElementsByClassName("shop-item-button");

    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", addToCartClicked);
    }

    // Purchase button
    let purchaseButton = document.getElementsByClassName("btn-purchase")[0];
    purchaseButton.addEventListener("click", purchaseClicked);

    updateCartTotal();
}


// Remove an item from the cart
function removeCartItem(event) {

    let button = event.target;

    button.parentElement.parentElement.remove();

    updateCartTotal();
}


// Change the quantity
function quantityChanged(event) {

    let input = event.target;

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateCartTotal();
}


// Add to cart button clicked
function addToCartClicked(event) {

    let button = event.target;

    let shopItem = button.parentElement.parentElement;

    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;

    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;

    let image = shopItem.getElementsByClassName("shop-item-image")[0].src;

    addItemToCart(title, price, image);

    updateCartTotal();
}


// Add an item to the cart
function addItemToCart(title, price, image) {

    let cartRow = document.createElement("div");

    cartRow.classList.add("cart-row");

    let cartItems = document.getElementsByClassName("cart-items")[0];

    let cartItemNames = cartItems.getElementsByClassName("cart-item-title");

    // Check if the item is already in the cart
    for (let i = 0; i < cartItemNames.length; i++) {

        if (cartItemNames[i].innerText == title) {
            alert("This item is already in your cart!");
            return;
        }
    }

    // Create the new cart row
    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${image}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>

        <span class="cart-price cart-column">${price}</span>

        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" min="1">

            <button class="btn btn-danger" type="button">
                REMOVE
            </button>
        </div>
    `;

    cartRow.innerHTML = cartRowContents;

    cartItems.append(cartRow);

    // Make the new remove button work
    let removeButton = cartRow.getElementsByClassName("btn-danger")[0];

    removeButton.addEventListener("click", removeCartItem);

    // Make the new quantity input work
    let quantityInput = cartRow.getElementsByClassName("cart-quantity-input")[0];

    quantityInput.addEventListener("change", quantityChanged);
}


// Purchase button
function purchaseClicked() {

    alert("Thank you for your purchase!");

    let cartItems = document.getElementsByClassName("cart-items")[0];

    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }

    updateCartTotal();
}


// Update the total price
function updateCartTotal() {

    let cartItems = document.getElementsByClassName("cart-items")[0];

    let cartRows = cartItems.getElementsByClassName("cart-row");

    let total = 0;

    for (let i = 0; i < cartRows.length; i++) {

        let cartRow = cartRows[i];

        let priceElement = cartRow.getElementsByClassName("cart-price")[0];

        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];

        let price = parseFloat(priceElement.innerText.replace("$", ""));

        let quantity = quantityElement.value;

        total = total + (price * quantity);
    }

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total.toFixed(2);
}
