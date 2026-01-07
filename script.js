let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */
function Ajouteraupanier(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let found = cart.find(item => item.name === name);

    if (found) {
        found.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Ajouté au panier 🛒");
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

