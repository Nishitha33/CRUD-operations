const api = "http://localhost:5000/products";
const form = document.getElementById("productForm");
const table = document.getElementById("productTable");

// 🔹 Load Products
async function loadProducts() {
  table.innerHTML = "";
  const res = await fetch(api);
  const data = await res.json();

  data.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input value="${p.name}" id="name-${p._id}"></td>
      <td><input value="${p.price}" id="price-${p._id}" type="number"></td>
      <td><input value="${p.category}" id="category-${p._id}"></td>
      <td>
        <button onclick="updateProduct('${p._id}')">Update</button>
        <button onclick="deleteProduct('${p._id}')">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// 🔹 Add Product
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    category: document.getElementById("category").value,
  };

  await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  form.reset();
  loadProducts();
});

// 🔹 Update Product
async function updateProduct(id) {
  const product = {
    name: document.getElementById(`name-${id}`).value,
    price: document.getElementById(`price-${id}`).value,
    category: document.getElementById(`category-${id}`).value,
  };

  await fetch(`${api}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  loadProducts();
}

// 🔹 Delete Product
async function deleteProduct(id) {
  await fetch(`${api}/${id}`, { method: "DELETE" });
  loadProducts();
}

// Initial Load
loadProducts();
