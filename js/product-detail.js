
/* =========================================
   YoooMILK - PRODUCT DETAIL CONTROLLER
   WEBP FIRST + PNG FALLBACK
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const $ = (selector) => document.querySelector(selector);

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const product =
    typeof PRODUCTS_DATA !== "undefined"
      ? PRODUCTS_DATA[productId]
      : null;

  // HIỂN THỊ THÔNG BÁO
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

  // KIỂM TRA SẢN PHẨM
  if (!product) {
    const name = $("#productName");
    const short = $("#productShort");
    const price = $("#productPrice");
    const description = $("#productDescription");

    if (name) name.textContent = "Không tìm thấy sản phẩm";

    if (short) {
      short.textContent =
        "Sản phẩm không tồn tại hoặc đường dẫn không hợp lệ.";
    }

    if (price) price.textContent = "";

    if (description) {
      description.textContent =
        "Vui lòng quay lại trang chủ để lựa chọn sản phẩm.";
    }

    return;
  }

  // ĐỊNH DẠNG TIỀN
  function formatMoney(value) {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  }

  // HIỂN THỊ DANH SÁCH
  function renderList(selector, items) {
    const element = $(selector);
    if (!element) return;

    element.replaceChildren();

    (Array.isArray(items) ? items : []).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      element.appendChild(li);
    });
  }

  // TẢI ẢNH WEBP, NẾU LỖI THÌ DÙNG PNG
  const mainImage = $("#productImage");
  const thumbImage = $("#thumbImage");

  function setProductImage(imageElement, priority = false) {
    if (!imageElement) return;

    const webp = product.image;
    const png = product.fallbackImage;

    imageElement.alt = product.name;
    imageElement.decoding = "async";

    if (priority) {
      imageElement.loading = "eager";
      imageElement.fetchPriority = "high";
    } else {
      imageElement.loading = "lazy";
    }

    // Chỉ chuyển về PNG một lần nếu WebP không tải được.
    imageElement.onerror = function () {
      this.onerror = null;

      if (png && this.src !== new URL(png, document.baseURI).href) {
        this.src = png;
      }
    };

    imageElement.src = webp || png;
  }

  // ẢNH CHÍNH: ƯU TIÊN TẢI SỚM
  setProductImage(mainImage, true);

  // ẢNH THU NHỎ
  setProductImage(thumbImage, false);

  // HIỂN THỊ THÔNG TIN CƠ BẢN
  const textFields = {
    "#productName": product.name,
    "#crumbName": product.name,
    "#productCategory": product.label,
    "#productShort": product.short,
    "#productPrice": formatMoney(product.price),
    "#productDescription": product.description,

    "#specType": product.category,
    "#specSize": product.size,
    "#specStorage": product.storage,

    "#ingredientText": product.ingredients,
    "#nutritionText": product.nutrition
  };

  Object.entries(textFields).forEach(([selector, value]) => {
    const element = $(selector);
    if (element) element.textContent = value ?? "";
  });

  // HIỂN THỊ CÁC DANH SÁCH
  renderList("#productPoints", product.points);
  renderList("#usageList", product.usage);
  renderList("#noteList", product.notes);

  // SEO: CẬP NHẬT TITLE VÀ META DESCRIPTION
  document.title = product.name + " | YoooMILK";

  const descriptionMeta = document.querySelector(
    'meta[name="description"]'
  );

  if (descriptionMeta) {
    descriptionMeta.setAttribute(
      "content",
      product.name +
      " – Khám phá thông tin, đặc điểm và giá bán sản phẩm tại YoooMILK."
    );
  }

  // CANONICAL THEO TỪNG SẢN PHẨM
  const canonical = document.querySelector(
    'link[rel="canonical"]'
  );

  const canonicalUrl =
    window.location.origin +
    window.location.pathname +
    "?id=" +
    encodeURIComponent(productId);

  if (canonical) {
    canonical.href = canonicalUrl;
  }

  // CẬP NHẬT OPEN GRAPH
  const ogTitle = $("#ogTitle");
  const ogDescription = $("#ogDescription");
  const ogImage = $("#ogImage");
  const ogUrl = $("#ogUrl");

  if (ogTitle) ogTitle.content = product.name + " | YoooMILK";

  if (ogDescription) {
    ogDescription.content = product.short;
  }

  if (ogImage) {
    ogImage.content = new URL(
      product.fallbackImage || product.image,
      document.baseURI
    ).href;
  }

  if (ogUrl) ogUrl.content = canonicalUrl;

  const twitterTitle = $("#twitterTitle");
  const twitterDescription = $("#twitterDescription");
  const twitterImage = $("#twitterImage");

  if (twitterTitle) {
    twitterTitle.content = product.name + " | YoooMILK";
  }

  if (twitterDescription) {
    twitterDescription.content = product.short;
  }

  if (twitterImage) {
    twitterImage.content = new URL(
      product.fallbackImage || product.image,
      document.baseURI
    ).href;
  }

  // DỮ LIỆU CẤU TRÚC PRODUCT
  const structuredData = $("#productStructuredData");

  if (structuredData) {
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": [
        new URL(
          product.fallbackImage || product.image,
          document.baseURI
        ).href
      ],
      "brand": {
        "@type": "Brand",
        "name": "YoooMILK"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "VND",
        "price": product.price,
        "availability": "https://schema.org/InStock",
        "url": canonicalUrl
      }
    });
  }

  // DỮ LIỆU CẤU TRÚC BREADCRUMB
  const breadcrumbData = $("#breadcrumbStructuredData");

  if (breadcrumbData) {
    breadcrumbData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": window.location.origin +
            window.location.pathname.replace("product.html", "index.html")
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Sản phẩm",
          "item": window.location.origin +
            window.location.pathname.replace("product.html", "index.html") +
            "#products"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": product.name,
          "item": canonicalUrl
        }
      ]
    });
  }

  // NĂM HIỆN TẠI
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

  // ĐỒNG BỘ GIỎ HÀNG
  function getCart() {
    try {
      return JSON.parse(
        localStorage.getItem("yoomilk-cart") || "{}"
      );
    } catch (error) {
      return {};
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(
        "yoomilk-cart",
        JSON.stringify(cart)
      );
      return true;
    } catch (error) {
      showToast("Không thể lưu giỏ hàng trên trình duyệt.");
      return false;
    }
  }

  function addToCart() {
    const cart = getCart();

    cart[product.id] =
      (Number(cart[product.id]) || 0) + quantity;

    if (saveCart(cart)) {
      showToast(
        "Đã thêm " + quantity + " sản phẩm vào giỏ hàng!"
      );
    }
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

      if (saveCart(cart)) {
        showToast(
          "Đã thêm sản phẩm! Đang chuyển đến trang mua sắm..."
        );

        setTimeout(() => {
          window.location.href = "index.html#products";
        }, 800);
      }
    });
  }

  // NHẤN ẢNH THU NHỎ ĐỂ XEM ẢNH CHÍNH
  const thumbButton = $(".detail-thumb");

  if (thumbButton && mainImage) {
    thumbButton.addEventListener("click", () => {
      setProductImage(mainImage, true);
    });
  }

});
