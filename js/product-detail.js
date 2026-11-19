
/* =========================================
   YoooMILK - PRODUCT DETAIL CONTROLLER
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const $ = (selector) => document.querySelector(selector);

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const product = PRODUCTS_DATA[productId];

  // Hiển thị thông báo
  function showToast(message) {
    const toast = $("#detailToast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  // Kiểm tra sản phẩm
  if (!product) {
    $("#productName").textContent = "Không tìm thấy sản phẩm";
    $("#productShort").textContent =
      "Sản phẩm không tồn tại hoặc đường dẫn không hợp lệ.";

    $("#productPrice").textContent = "";
    $("#productDescription").textContent =
      "Vui lòng quay lại trang chủ để lựa chọn sản phẩm.";

    return;
  }

  // Định dạng tiền
  function formatMoney(value) {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  }

  // Hiển thị danh sách
  function renderList(selector, items) {
    const element = $(selector);
    if (!element) return;

    element.innerHTML = "";

    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      element.appendChild(li);
    });
  }

  // Tải hình ảnh
  const mainImage = $("#productImage");
  const thumbImage = $("#thumbImage");

  if (mainImage) {
    mainImage.src = product.image;
    mainImage.alt = product.name;

    mainImage.onerror = function () {
      this.onerror = null;
      this.src = "assets/sua-de-nguyen-chat.png";
    };
  }

  if (thumbImage) {
    thumbImage.src = product.image;
    thumbImage.alt = product.name;
  }

  // Tải thông tin cơ bản
  $("#productName").textContent = product.name;
  $("#crumbName").textContent = product.name;
  $("#productCategory").textContent = product.label;
  $("#productShort").textContent = product.short;
  $("#productPrice").textContent = formatMoney(product.price);
  $("#productDescription").textContent = product.description;

  // Tải thông tin chi tiết
  $("#specType").textContent = product.category;
  $("#specSize").textContent = product.size;
  $("#specStorage").textContent = product.storage;

  $("#ingredientText").textContent = product.ingredients;
  $("#nutritionText").textContent = product.nutrition;

  renderList("#productPoints", product.points);
  renderList("#usageList", product.usage);
  renderList("#noteList", product.notes);

  // Cập nhật tiêu đề trình duyệt
  document.title = product.name + " | YoooMILK";

  // Năm hiện tại
  const year = $("#year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // MENU MOBILE
  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  // QUẢN LÝ SỐ LƯỢNG
  let quantity = 1;

  const qtyValue = $("#qtyValue");
  const minus = $("#qtyMinus");
  const plus = $("#qtyPlus");

  function updateQuantity() {
    if (qtyValue) {
      qtyValue.textContent = quantity;
    }
  }

  if (minus) {
    minus.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        updateQuantity();
      }
    });
  }

  if (plus) {
    plus.addEventListener("click", () => {
      quantity++;
      updateQuantity();
    });
  }

  // ĐỒNG BỘ GIỎ HÀNG VỚI TRANG CHỦ
  function getCart() {
    try {
      return JSON.parse(
        localStorage.getItem("yoomilk-cart") || "{}"
      );
    } catch (error) {
      return {};
    }
  }

  function addToCart() {
    const cart = getCart();

    cart[product.id] =
      (Number(cart[product.id]) || 0) + quantity;

    localStorage.setItem(
      "yoomilk-cart",
      JSON.stringify(cart)
    );

    showToast(
      "Đã thêm " + quantity + " sản phẩm vào giỏ hàng!"
    );
  }

  // NÚT THÊM VÀO GIỎ
  const addButton = $("#addToCart");

  if (addButton) {
    addButton.addEventListener("click", addToCart);
  }

  // NÚT MUA NGAY
  const buyButton = $("#buyNow");

  if (buyButton) {
    buyButton.addEventListener("click", () => {
      const cart = getCart();

      cart[product.id] =
        (Number(cart[product.id]) || 0) + quantity;

      localStorage.setItem(
        "yoomilk-cart",
        JSON.stringify(cart)
      );

      showToast("Đã thêm sản phẩm! Đang chuyển đến trang mua sắm...");

      setTimeout(() => {
        window.location.href = "index.html#products";
      }, 800);
    });
  }

  // NHẤN ẢNH THU NHỎ ĐỂ XEM ẢNH CHÍNH
  const thumbButton = document.querySelector(".detail-thumb");

  if (thumbButton && mainImage) {
    thumbButton.addEventListener("click", () => {
      mainImage.src = product.image;
    });
  }

});
