const cart = [];

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");

/* ===== 加入購物車 ===== */

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

    });

});


/* ===== 更新購物車 ===== */

function updateCart() {

    const totalQuantity = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalQuantity;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                購物車目前是空的
            </p>
        `;

        cartTotal.textContent = 0;

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        const itemElement = document.createElement("div");

        itemElement.classList.add("cart-item");

        itemElement.innerHTML = `

            <div>
                <strong>${item.name}</strong>

                <p>
                    NT$ ${item.price}
                </p>
            </div>


            <div class="quantity-control">

                <button onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${index}, 1)">
                    +
                </button>

                <button class="delete-btn"
                    onclick="removeItem(${index})">

                    🗑️

                </button>

            </div>

        `;

        cartItems.appendChild(itemElement);

    });


    cartTotal.textContent = total;

}


/* ===== 改變商品數量 ===== */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}


/* ===== 刪除商品 ===== */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* ===== 開啟購物車 ===== */

cartButton.addEventListener("click", () => {

    cartPanel.classList.add("open");

});


/* ===== 關閉購物車 ===== */

closeCart.addEventListener("click", () => {

    cartPanel.classList.remove("open");

});

/* ===== 結帳功能 ===== */

const checkoutButton = document.querySelector(".checkout-btn");

const checkoutModal =
    document.getElementById("checkoutModal");

const closeCheckout =
    document.getElementById("closeCheckout");

const checkoutForm =
    document.getElementById("checkoutForm");


/* 點擊前往結帳 */

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("購物車目前是空的");

        return;
    }

    cartPanel.classList.remove("open");

    checkoutModal.classList.add("show");

});


/* 關閉結帳視窗 */

closeCheckout.addEventListener("click", () => {

    checkoutModal.classList.remove("show");

});


/* 確認訂單 */

checkoutForm.addEventListener("submit", (event) => {

    event.preventDefault();

    alert("訂單已送出！感謝你的購買 📚");

    cart.length = 0;

    updateCart();

    checkoutModal.classList.remove("show");

    checkoutForm.reset();

});