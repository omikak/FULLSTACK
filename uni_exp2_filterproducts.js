const products = [
    { name: "Laptop", category: "electronics" },
    { name: "T-Shirt", category: "clothing" },
    { name: "Novel", category: "books" },
    { name: "Headphones", category: "electronics" },
    { name: "Jeans", category: "clothing" }
];
const container = document.getElementById("productContainer");
function displayProducts(items) {
    container.innerHTML = "";

    items.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.textContent = product.name;
        container.appendChild(div);
    });
}

// Filter function
function filterProducts() {
    const selected = document.getElementById("categoryFilter").value;

    if (selected === "all") {
        displayProducts(products);
    } else {
        const filtered = products.filter(
            product => product.category === selected
        );
        displayProducts(filtered);
    }
}

// Initial display
displayProducts(products);
