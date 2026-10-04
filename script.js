const orderList = document.getElementById("order-list");
const countEl = document.getElementById("count");
const totalEl = document.getElementById("total");
const cartCountEl = document.getElementById("cart-count");

let items = [];

function getTotal() {
  let sum = 0;
  items.forEach(function (item) {
    sum = sum + item.price;
  });
  return sum;
}

function render() {
  orderList.innerHTML = "";
  items.forEach(function (item, index) {
    const li = document.createElement("li");
    li.textContent = item.name + " - ฿" + item.price + " ";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "ยกเลิก";
    cancelBtn.className = "cancel-btn";
    cancelBtn.addEventListener("click", function () {
      item.btn.disabled = false;
      item.btn.textContent = "เพิ่ม";
      items.splice(index, 1);
      render();
    });

    li.appendChild(cancelBtn);
    orderList.appendChild(li);
  });
 countEl.textContent = items.length;
 totalEl.textContent = getTotal();
  cartCountEl.textContent = items.length;
}

const productList = document.getElementById("product-list");

PRODUCTS.forEach(function (p) {
  const card = document.createElement("div");
  card.className = "product";
  card.dataset.category = p.category;
  card.innerHTML =
    '<div class="product-img">รูปสินค้า</div>' +
    "<h3>" + p.name + "</h3>" +
    '<p class="price">฿' + p.price + "</p>" +
    '<button class="add-btn">เพิ่ม</button>';

  const addBtn = card.querySelector(".add-btn");
  addBtn.dataset.name = p.name;
  addBtn.dataset.price = p.price;

  productList.appendChild(card);
});
document.querySelectorAll(".product .add-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    items.push({
      name: btn.dataset.name,
      price: Number(btn.dataset.price),
      btn: btn
    });
    btn.disabled = true;
    btn.textContent = "เลือกแล้ว";
    render();
  });
});

const filterLinks = document.querySelectorAll("nav a");
const products = document.querySelectorAll(".product");

filterLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const filter = link.dataset.filter;
    products.forEach(function (p) {
      const cats = p.dataset.category.split(" ");
      if (filter === "all" || cats.includes(filter)) {
        p.style.display = "";
      } else {
        p.style.display = "none";
      }
    });
  });
});