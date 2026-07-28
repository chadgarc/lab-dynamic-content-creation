// First we're getting an inctance of every element related to data entry
// And container cart
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById("product-price");
const productQuantityInput = document.getElementById('product-qty');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');

// To keep track of the total
let totalPrice = 0;

// Function to update the total price
function updateTotalPrice(amount) {
    totalPrice += amount;
    totalPriceSpan.textContent = `$\t${Math.round(totalPrice * 100) / 100}`;
}

// Function to remove an item
function removeItem(event) {
    const item = event.target.closest('li');
    const price = parseFloat(item.dataset.price);
    updateTotalPrice(-price);
    item.remove();
}

// Just how I want to represent the data
formatText = (itemName, quantity, price) => `${quantity} ${itemName}'s for $ ${price} each.`;

// For any time we'll add a new pdoduct
addItem = (itemName, quantity, price) => {

    // This way works excelent for rounding to 2 decimals
    const subtotal = Math.round(quantity * price * 100) / 100;

    const textContent = formatText(itemName, quantity, price); 

    updateTotalPrice(subtotal);

    return textContent;
}

// To capitalize any text
capitalize = (someText) => someText.charAt(0).toUpperCase() + someText.slice(1).toLowerCase();

// I don'r want text into this textfield, using regex
productPriceInput.addEventListener("input", () => {
    productPriceInput.value = productPriceInput.value
    .replace(/[^0-9.]/g, "")   // accept numbers and dots only
    .replace(/(\..*)\./g, "$1"); // accept one dot only
});
// I don't want text or dots into this textfield, using regex
cart.addEventListener("input", event => {
    if(event.target.classList.contains("qtyInput")){

        event.target.value = event.target.value
            .replace(/[^0-9]/g, "");
    }
});

// For the html document, get the element with ID add-product, and add an
// event listener when it si clicked
document.getElementById("add-product").addEventListener("click", () =>{
    const nameInput = capitalize(productNameInput.value.trim());
    const priceInput = Number(productPriceInput.value);
    const qtyInput = Number(productQuantityInput.value);

    let subtotal = 0;

    // A flag to validate if that item is already on cart
    // If not, we'll validate the operation
    let exist = false;
    const spans = cart.querySelectorAll("span");
    spans.forEach(span => {
        if(span.textContent.split(" ")[1].slice(0,-2) === nameInput){
            exist = true;
        }
    })
    if( exist === false ){

        const newList = document.createElement("li");
        const listText = document.createElement("span");
        const newLine = document.createElement("br");

        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Add";
        updateBtn.classList.add("updateBtn");

        const qtyInputBox = document.createElement("input");
        qtyInputBox.classList.add("qtyInput");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("removeBtn");
        
        listText.innerText = addItem(nameInput, qtyInput, priceInput);

        updateTotalPrice(subtotal);

        newList.appendChild(listText);
        newList.appendChild(newLine);
        newList.appendChild(updateBtn);
        newList.appendChild(qtyInputBox);
        newList.appendChild(removeBtn);
        cart.appendChild(newList);

        productNameInput.value = "";
        productPriceInput.value = "";
        productQuantityInput.value = "";

        document.getElementById('addModal').close();
    }
});

// for cart, when an element is clicked
// for the target event, if contains a class updateBtn
// And for the target event if contains a class removeBtn
cart.addEventListener("click", event => {
    if(event.target.classList.contains("updateBtn")){

        // From the button we'll take tha ancestor li
        const li = event.target.closest("li");
        // Then we'll take span
        const span = li.querySelector("span");
        // Input field
        let newQty = Number(li.querySelector("input").value);

        const arrayList = span.textContent.split(" ");

        const [quantity, productItem, price] = [Number(arrayList[0]), arrayList[1].slice(0,-2), Number(arrayList[4])];

        updateTotalPrice(newQty*price);

        newQty += quantity;

        span.textContent = formatText(productItem, newQty, price);
        console.log(span.textContent = formatText(productItem, newQty, price))

        li.querySelector("input").value = "";

    } else if(event.target.classList.contains("removeBtn")){

        // From the button we'll take tha ancestor li
        const li = event.target.closest("li");
        // Then we'll take span
        const span = li.querySelector("span");
        // Input field
        let newQty = Number(li.querySelector("input").value);

        const arrayList = span.textContent.split(" ");

        const [quantity, productItem, price] = [Number(arrayList[0]), arrayList[1].slice(0,-2), Number(arrayList[4])];

        if(quantity <= newQty){
            li.remove()
            updateTotalPrice(-(quantity*price));
        } else{
            updateTotalPrice(-(newQty * price))
            newQty -= quantity;
            newQty = -(newQty);
            span.textContent = formatText(productItem,newQty, price);
            console.log(span.textContent = formatText(productItem, newQty, price))
        }

        li.querySelector("input").value = "";

    }
});