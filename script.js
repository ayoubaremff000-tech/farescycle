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
let activeCategory = "all";

document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.dataset.cat;
        filterProducts();
    });
});

let selectedCategory = "all";

const catBox = document.getElementById("catBox");
const catList = document.querySelector(".cat-list");
const selectedCatText = document.getElementById("selectedCat");

/* OPEN / CLOSE CATEGORY */
catBox.onclick = () => {
    catList.style.display =
        catList.style.display === "block" ? "none" : "block";
};

/* SELECT CATEGORY */
document.querySelectorAll(".cat-list li").forEach(item => {
    item.onclick = () => {
        selectedCategory = item.dataset.cat;
        selectedCatText.innerText = item.innerText;
        catList.style.display = "none";
        filterUltra();
    };
});

/* FILTER */
function filterUltra() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const products = document.querySelectorAll(".product-card");
    let count = 0;

    products.forEach(p => {
        const name = p.querySelector("h3").innerText.toLowerCase();
        const cat = p.dataset.category;

        const matchSearch = name.includes(search);
        const matchCat = selectedCategory === "all" || cat === selectedCategory;

        if (matchSearch && matchCat) {
            p.style.display = "block";
            count++;
        } else {
            p.style.display = "none";
        }
    });

    document.getElementById("counter").innerText =
        count + " produit(s) trouvé(s)";
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

    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    var found = false;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty += 1;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // 🔥 التوجيه مباشرة للـ cart
    window.location.href = "cart.html";
}


document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // ===== FORM =====
    var nom = document.querySelector('input[name="Nom"]').value;
    var prenom = document.querySelector('input[name="prenom"]').value;
    var tel = document.querySelector('input[name="Téléphone"]').value;
    var adresse = document.querySelector('input[name="Adresse"]').value;
    var ville = document.querySelector('input[name="ville"]').value;

    // ===== CART =====
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Panier vide");
        return;
    }

    var livraison = 7;
    var total = 0;
    var produits = "";

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var subTotal = item.price * item.qty;
        total += subTotal;

        produits +=
            (i + 1) + ") " + item.name + "%0A" +
            "Quantité: " + item.qty + "%0A" +
            "Prix: " + item.price + " DT%0A" +
            "Sous-total: " + subTotal + " DT%0A%0A";
    }

    var totalFinal = total + livraison;

    // ===== MESSAGE =====
    var message =
        "NOUVELLE COMMANDE%0A%0A" +
        "Nom: " + nom + " " + prenom + "%0A" +
        "Téléphone: " + tel + "%0A" +
        "Adresse: " + adresse + "%0A" +
        "Ville: " + ville + "%0A%0A" +
        "Produits:%0A" +
        produits +
        "Livraison: " + livraison + " DT%0A" +
        "TOTAL: " + totalFinal + " DT";

    var phone = "21650548952"; // رقمك
    var url = "https://wa.me/" + phone + "?text=" + message;

    window.open(url, "_blank");
});

function toggleCategory(){
    const list = document.getElementById("categoryList");
    list.style.display = list.style.display === "block" ? "none" : "block";
}

function filterCategory(cat){
    const products = document.querySelectorAll(".product-card");

    products.forEach(product=>{
        if(cat === "all"){
            product.style.display = "block";
        }else{
            product.style.display = product.dataset.category === cat ? "block" : "none";
        }
    });

    // 🔥 تسكير القائمة بعد الاختيار
    document.getElementById("categoryList").style.display = "none";
}
document.addEventListener("click", function (e) {
    const box = document.getElementById("categoryBox");
    const list = document.getElementById("categoryList");

    if (!box.contains(e.target)) {
        list.classList.remove("open");
    }
});
