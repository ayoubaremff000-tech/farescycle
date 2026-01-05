let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */
function Ajouteraupanier(name, price){
    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Ajouter 🛒");
}

/* DISPLAY CART */
function displayCart(){
    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("totalPrice");

    if(!container) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index)=>{
        total += item.price;

        container.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.price} DT</span>
                <button onclick="removeItem(${index})">X</button>
            </div>
        `;
    });

    totalEl.textContent = "Total: " + total + " DT";
}

/* REMOVE */
function removeItem(index){
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

displayCart();
function searchProducts() {
    const input = document.getElementById("search").value.toLowerCase();
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const name = product.dataset.name.toLowerCase();
        const category = product.dataset.category.toLowerCase();

        if (name.includes(input) || category.includes(input)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
function filterCategory(category) {
    const products = document.querySelectorAll(".product-card");
    const buttons = document.querySelectorAll(".cat-btn");

    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    products.forEach(product => {
        const productCat = product.dataset.category;

        if (category === "all" || productCat === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
function searchProducts() {
    const input = document.getElementById("search").value.toLowerCase();
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const text = product.textContent.toLowerCase();
        product.style.display = text.includes(input) ? "block" : "none";
    });
}
const categoryItems = document.querySelectorAll("#c li");

categoryItems.forEach(item => {
    item.addEventListener("click", () => {
        categoryItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    });
});
function searchProducts() {
    const input = document.getElementById("search").value.toLowerCase();
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const text = product.textContent.toLowerCase();

        if (text.includes(input)) {
            product.style.display = "block";
            product.classList.remove("hide");
            product.classList.add("show");
        } else {
            product.classList.add("hide");
            setTimeout(() => {
                product.style.display = "none";
            }, 300);
        }
    });
}
document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault(); // يمنع reload

    let nom = document.querySelector('input[name="Nom"]').value;
    let prenom = document.querySelector('input[name="prenom"]').value;
    let tel = document.querySelector('input[name="Téléphone"]').value;
    let adresse = document.querySelector('input[name="Adresse"]').value;
    let ville = document.querySelector('input[name="ville"]').value;

    let message =
        "🛒 Nouvelle Commande %0A%0A" +
        "👤 Nom: " + nom + " " + prenom + "%0A" +
        "📞 Téléphone: " + tel + "%0A" +
        "📍 Adresse: " + adresse + "%0A" +
        "🏙 Ville: " + ville;

    let phone = "21650548952"; // ❗ بدّل بالرقم متاعك (من غير +)

    let url = "https://wa.me/" + phone + "?text=" + message;

    window.open(url, "_blank");
});

function addToCart(name, price) {
    // نجيبو الكارت من localStorage ولا نعملوه جديد
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // نضيفو المنتج
    cart.push({
        name: name,
        price: price,
        quantity: 1
    });

    // نخزّنو في localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // ⬅️ نحولو مباشرة لصفحة cart
    window.location.href = "cart.html";
}
