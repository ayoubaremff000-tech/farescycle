document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("orderForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // ===== FORM DATA =====
        const nom = document.querySelector('input[name="nom"]').value.trim();
        const prenom = document.querySelector('input[name="prenom"]').value.trim();
        const telephone = document.querySelector('input[name="telephone"]').value.trim();
        const adresse = document.querySelector('input[name="adresse"]').value.trim();
        const ville = document.querySelector('input[name="ville"]').value.trim();

        if (!nom || !prenom || !telephone || !adresse || !ville) {
            alert("عمّر الفورم كامل");
            return;
        }

        // ===== PANIER =====
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            alert("❌ Panier vide");
            return;
        }

        let total = 0;
        let produits = "";

        cart.forEach((item, index) => {
            const qty = item.qty ? item.qty : 1;
            const sub = item.price * qty;
            total += sub;

            produits +=
                (index + 1) + ") " + item.name + "%0A" +
                "Quantité: " + qty + "%0A" +
                "Prix: " + item.price + " DT%0A" +
                "Sous-total: " + sub + " DT%0A%0A";
        });

        // ===== LIVRAISON =====
        const livraison = 7; // بدّلها كان تحب
        const totalFinal = total + livraison;

        // ===== WHATSAPP MESSAGE =====
        const message =
            "🛒 NOUVELLE COMMANDE%0A%0A" +
            "👤 " + nom + " " + prenom + "%0A" +
            "📞 " + telephone + "%0A" +
            "📍 " + adresse + " - " + ville + "%0A%0A" +
            "📦 Produits:%0A" +
            produits +
            "🚚 Livraison: " + livraison + " DT%0A" +
            "💰 TOTAL: " + totalFinal + " DT";

        const phone = "21650548952"; // رقمك (من غير +)
        const url = "https://wa.me/" + phone + "?text=" + message;

        window.open(url, "_blank");
    });

});
