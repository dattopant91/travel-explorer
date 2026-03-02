const destinations = [
    { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80" },
    { name: "Maldives", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" },
    { name: "New York", img: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=800&q=80" },
    { name: "Dubai", img: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80" }
];

const packages = [
    { name: "Paris Getaway", price: 1200, img: destinations[0].img },
    { name: "Maldives Luxury", price: 2500, img: destinations[1].img },
    { name: "NY Budget Trip", price: 800, img: destinations[2].img },
    { name: "Dubai Adventure", price: 1500, img: destinations[3].img }
];

function loadDestinations() {
    const container = document.getElementById("destinationContainer");
    container.innerHTML = "";
    destinations.forEach(dest => {
        container.innerHTML += `
        <div class="col-md-3 mb-4">
            <div class="card shadow">
                <img src="${dest.img}" class="card-img-top">
                <div class="card-body text-center">
                    <h5>${dest.name}</h5>
                </div>
            </div>
        </div>`;
    });
}

function loadPackages(filter = "all") {
    const container = document.getElementById("packageContainer");
    container.innerHTML = "";

    packages
        .filter(pkg =>
            filter === "all" ||
            (filter === "low" && pkg.price < 1000) ||
            (filter === "high" && pkg.price >= 1000)
        )
        .forEach(pkg => {
            container.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card shadow">
                    <img src="${pkg.img}" class="card-img-top">
                    <div class="card-body text-center">
                        <h5>${pkg.name}</h5>
                        <p>$${pkg.price}</p>
                    </div>
                </div>
            </div>`;
        });
}

document.getElementById("priceFilter").addEventListener("change", e => {
    loadPackages(e.target.value);
});

document.getElementById("searchInput").addEventListener("keyup", e => {
    const value = e.target.value.toLowerCase();
    document.querySelectorAll("#destinationContainer .card").forEach(card => {
        card.parentElement.style.display =
            card.innerText.toLowerCase().includes(value) ? "block" : "none";
    });
});

document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

const sections = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

sections.forEach(section => observer.observe(section));

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

loadDestinations();
loadPackages();