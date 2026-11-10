
const PRODUCTS = {
  "goat-original": {
    name: "Sữa dê tươi nguyên chất",
    image: "assets/sua-de-nguyen-chat.png",
    category: "Sữa dê tươi",
    size: "1L",
    price: 69000
  },
  "goat-low": {
    name: "Sữa dê tươi ít đường",
    image: "assets/sua-de-it-duong.png",
    category: "Sữa dê tươi",
    size: "1L",
    price: 72000
  },
  "goat-organic": {
    name: "Sữa dê Organic",
    image: "assets/sua-de-organic.png",
    category: "Sữa dê tươi",
    size: "1L",
    price: 79000
  },
  "almond": {
    name: "Sữa hạt hạnh nhân",
    image: "assets/sua-hat-hanh-nhan.png",
    category: "Sữa hạt",
    size: "1L",
    price: 59000
  },
  "yogurt": {
    name: "Sữa chua YoooMILK",
    image: "assets/sua-chua-yooomilk.png",
    category: "Sữa chua",
    size: "Lốc 4 hộp × 100g",
    price: 49000
  }
};

// ===== SELECT ELEMENTS =====

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

// ===== SHOPPING CART =====

let cart = {};

try {
  cart = JSON.parse(localStorage.getItem("yoomilk-cart") || "{}");
} catch {
  cart = {};
}

const money = n =>
  new Intl.NumberFormat("vi-VN").format(n) + "đ";

function saveCart() {
  localStorage.setItem("yoomilk-cart", JSON.stringify(cart));
  renderCart();
}

function countCart() {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

function toast(msg) {
  const t = $("#toast");

  if (!t) return;

  t.textContent = msg;
  t.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => {
    t.classList.remove("show");
  }, 2400);
}

function addItem(id) {
  if (!PRODUCTS[id]) return;

  cart[id] = (cart[id] || 0) + 1;

  saveCart();
  toast("Đã thêm sản phẩm vào giỏ hàng.");
}

function renderCart() {
  const count = countCart();

  $("#cartCount").textContent = count;
  $("#drawerCount").textContent = `(${count})`;

  const box = $("#cartItems");

  if (!count) {
    box.innerHTML = `
      <div class="cart-empty">
        Giỏ hàng đang trống.<br>
        <a href="#products" id="continueShopping">
          Khám phá sản phẩm ↗
        </a>
      </div>
    `;
    return;
  }

  const items = Object.entries(cart)
    .filter(([id, q]) => PRODUCTS[id] && q > 0);

  const total = items.reduce(
    (sum, [id, q]) => sum + PRODUCTS[id].price * q,
    0
  );

  box.innerHTML = items.map(([id, q]) => {
    const p = PRODUCTS[id];

    return `
      <div class="cart-row">
        <div class="cart-thumb">
          <img
            src="${p.image}"
            alt="${p.name}"
            loading="lazy"
          >
        </div>

        <div>
          <h4>${p.name}</h4>
          <small>${p.size} · ${money(p.price)}</small>

          <div class="qty">
            <button
              data-qty="${id}"
              data-delta="-1"
              aria-label="Giảm số lượng ${p.name}"
            >−</button>

            <b>${q}</b>

            <button
              data-qty="${id}"
              data-delta="1"
              aria-label="Tăng số lượng ${p.name}"
            >+</button>
          </div>

          <small>
            Thành tiền: ${money(p.price * q)}
          </small>
        </div>

        <button
          class="remove-btn"
          data-remove="${id}"
          aria-label="Xóa ${p.name} khỏi giỏ hàng"
        >
          Xóa
        </button>
      </div>
    `;
  }).join("") + `
    <div class="cart-total">
      <strong>Tổng cộng: ${money(total)}</strong>
    </div>
  `;
}

function openCart() {
  const drawer = $("#cartDrawer");

  drawer.removeAttribute("inert");
  drawer.setAttribute("aria-hidden", "false");

  drawer.classList.add("open");
  $("#overlay").classList.add("show");

  $("#cartClose").focus();
}

function closeCart() {
  const drawer = $("#cartDrawer");

  drawer.classList.remove("open");
  $("#overlay").classList.remove("show");

  drawer.setAttribute("aria-hidden", "true");
  drawer.setAttribute("inert", "");

  $("#cartOpen").focus();
}

// Add product to cart

$$("[data-add]").forEach(button => {
  button.addEventListener("click", () => {
    addItem(button.dataset.add);
  });
});

$("#cartOpen").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);

// Update and remove cart items

$("#cartItems").addEventListener("click", e => {
  const qty = e.target.closest("[data-qty]");
  const remove = e.target.closest("[data-remove]");

  if (qty) {
    const id = qty.dataset.qty;

    cart[id] = (cart[id] || 0) +
      Number(qty.dataset.delta);

    if (cart[id] <= 0) {
      delete cart[id];
    }

    saveCart();
  }

  if (remove) {
    delete cart[remove.dataset.remove];
    saveCart();
  }

  if (e.target.id === "continueShopping") {
    closeCart();
  }
});

// ===== PAYMENT SYSTEM =====

const paymentModal = $("#paymentModal");
const paymentForm = $("#paymentForm");

function calculateTotal() {
  return Object.entries(cart).reduce(
    (total, [id, quantity]) => {
      return total +
        (PRODUCTS[id]
          ? PRODUCTS[id].price * quantity
          : 0);
    },
    0
  );
}

function openPayment() {
  if (!countCart()) {
    toast("Bạn chưa chọn sản phẩm nào.");
    return;
  }

  $("#paymentTotal").textContent =
    "Tổng thanh toán: " + money(calculateTotal());

  paymentModal.classList.add("open");

  paymentModal.setAttribute("aria-hidden", "false");
}

function closePayment() {
  paymentModal.classList.remove("open");

  paymentModal.setAttribute("aria-hidden", "true");
}

$("#checkoutBtn").addEventListener("click", openPayment);

$("#paymentClose").addEventListener("click", closePayment);

paymentModal.addEventListener("click", e => {
  if (e.target === paymentModal) {
    closePayment();
  }
});

// Submit payment form

paymentForm.addEventListener("submit", e => {
  e.preventDefault();

  if (!countCart()) {
    toast("Giỏ hàng đang trống.");
    closePayment();
    return;
  }

  const data = new FormData(paymentForm);

  const name = data.get("customerName");
  const phone = data.get("phone");
  const address = data.get("address");
  const method = data.get("paymentMethod");

  const orderLines = Object.entries(cart)
    .filter(([id, quantity]) => PRODUCTS[id] && quantity > 0)
    .map(([id, quantity]) => {
      const product = PRODUCTS[id];

      return `${product.name} (${product.size}) x ${quantity}: ${money(product.price * quantity)}`;
    })
    .join("\n");

  const total = calculateTotal();

  const orderCode =
    "YM" + Date.now().toString().slice(-8);

  const orderSummary =
    `ĐƠN HÀNG YOOOMILK\n` +
    `Mã đơn: ${orderCode}\n` +
    `Khách hàng: ${name}\n` +
    `Số điện thoại: ${phone}\n` +
    `Địa chỉ: ${address}\n\n` +
    `CHI TIẾT SẢN PHẨM\n${orderLines}\n\n` +
    `Tổng thanh toán: ${money(total)}\n` +
    `Phương thức: ${method}\n` +
    `Trạng thái: Đơn hàng mô phỏng - chưa thanh toán.`;

  alert(
    "ĐẶT HÀNG THÀNH CÔNG!\n\n" +
    "Mã đơn hàng: " + orderCode +
    "\nTổng tiền: " + money(total) +
    "\nPhương thức: " + method +
    "\n\nCảm ơn bạn đã lựa chọn YoooMILK!"
  );

  // Copy order information if supported

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(orderSummary)
      .catch(() => {});
  }

  cart = {};

  saveCart();
  paymentForm.reset();
  closePayment();
  closeCart();
});

// ===== PRODUCT FILTER =====

$$(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".filter-btn").forEach(b => {
      b.classList.remove("active");
    });

    btn.classList.add("active");

    filterProducts();
  });
});

function filterProducts() {
  const cat =
    $(".filter-btn.active")?.dataset.filter || "all";

  const q =
    $("#productSearch").value
      .trim()
      .toLocaleLowerCase("vi");

  let visible = 0;

  $$(".product-card").forEach(card => {
    const okCat =
      cat === "all" ||
      card.dataset.category === cat;

    const okText =
      card.dataset.name
        .toLocaleLowerCase("vi")
        .includes(q);

    card.hidden = !(okCat && okText);

    if (!card.hidden) {
      visible++;
    }
  });

  $("#emptyState").hidden = visible !== 0;
}

$("#productSearch").addEventListener(
  "input",
  filterProducts
);

// Filter products through category links

$$("[data-category-link]").forEach(a => {
  a.addEventListener("click", () => {
    const b = $(
      `.filter-btn[data-filter="${a.dataset.categoryLink}"]`
    );

    if (b) b.click();
  });
});

// Search button

$("#searchToggle").addEventListener("click", () => {
  $("#productSearch").focus();

  $("#products").scrollIntoView({
    behavior: "smooth"
  });
});

// ===== MOBILE NAVIGATION =====

$("#menuToggle").addEventListener("click", () => {
  const nav = $("#mainNav");

  const open = nav.classList.toggle("open");

  $("#menuToggle").setAttribute(
    "aria-expanded",
    String(open)
  );
});

$$(".main-nav a").forEach(a => {
  a.addEventListener("click", () => {
    $("#mainNav").classList.remove("open");

    $("#menuToggle").setAttribute(
      "aria-expanded",
      "false"
    );
  });
});

// ===== CONTACT FORM =====

$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();

  const d = new FormData(e.currentTarget);

  const msg =
    `YÊU CẦU TƯ VẤN YOOOMILK\n` +
    `Họ tên: ${d.get("name")}\n` +
    `Liên hệ: ${d.get("contact")}\n` +
    `Nội dung: ${d.get("message") || "Chưa cung cấp"}`;

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(msg)
      .then(() => {
        toast(
          "Đã sao chép yêu cầu tư vấn. Vui lòng gửi đến kênh liên hệ của YoooMILK."
        );
      })
      .catch(() => {
        toast(
          "Không thể sao chép tự động. Vui lòng thử lại."
        );
      });
  } else {
    toast(
      "Vui lòng sao chép nội dung yêu cầu và gửi đến YoooMILK."
    );
  }

  e.currentTarget.reset();
});

// ===== FOOTER YEAR =====

$("#year").textContent = new Date().getFullYear();

// ===== INITIALIZE CART =====

renderCart();
