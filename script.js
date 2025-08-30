

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navlinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`header nav a[href="#${id}"]`).classList.add('active');
        }
    });
};

let cart = [];
let total = 0;
const cartCount = document.getElementById("cartCount");
const cartItemsContainer = document.querySelector(".sidebar-info");
const cartTotal = document.querySelector(".card-total");

document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const title = btn.dataset.title;
        const price = parseInt(btn.dataset.price);
        const existing = cart.find(item => item.title === title);
        if (existing) existing.qty++;
        else cart.push({ title, price, qty: 1 });
        total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        cartCount.innerText = cart.length;
        cartItemsContainer.innerHTML = '<h2>My Card</h2>';
        cart.forEach(item => {
            const div = document.createElement("div");
            div.className = "card-item";
            div.innerText = `${item.title} : $${item.price} x ${item.qty}`;
            cartItemsContainer.appendChild(div);
        });
        cartTotal.innerText = "$" + total.toFixed(2);
        document.querySelector(".sidebar").classList.add("open");
    });
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
    if(cart.length === 0) { alert("Your cart is empty!"); return; }
    localStorage.setItem("cartItems", JSON.stringify(cart));
    window.location.href = "payment.html";
});

document.querySelector('a[href="#addcard"]').addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(".sidebar").classList.add("open");
});
document.getElementById("closeSidebar").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.remove("open");
});

const cards = document.querySelectorAll('.card, .card1, .card2, .card3');

function showOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if(cardTop < triggerBottom) {
            card.classList.add('visible');
        } else {
            card.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);


