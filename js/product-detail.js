
document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. LẤY DỮ LIỆU SẢN PHẨM
  // ==========================================

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || "goat-original";

  const product = typeof PRODUCTS_DATA !== "undefined"
    ? PRODUCTS_DATA[productId]
    : null;

  const BASE_URL =
    "https://duongthinhuquynhbc-cyber.github.io/yooomilk-website/";

  const PRODUCT_URL = BASE_URL + "product.html?id=" + encodeURIComponent(productId);

  const fallbackImages = {
    "goat-original": "assets/product-goat-original.webp",
    "goat-low": "assets/product-goat-low-sugar.webp",
    "goat-organic": "assets/product-goat-organic.webp",
    "almond": "assets/sua-hat-hanh-nhan.webp",
    "yogurt": "assets/sua-chua-yooomilk.webp"
  };

  // ==========================================
  // 2. KIỂM TRA SẢN PHẨM
  // ==========================================

  if (!product) {
    const productName = document.getElementById("productName");

    if (productName) {
      productName.textContent = "Không tìm thấy sản phẩm";
    }

    const shortText = document.getElementById("productShort");

    if (shortText) {
      shortText.textContent =
        "Sản phẩm bạn đang tìm kiếm hiện không tồn tại hoặc đường dẫn không hợp lệ.";
    }

    const price = document.getElementById("productPrice");

    if (price) {
      price.textContent = "";
    }

    document.title = "Không tìm thấy sản phẩm | YoooMILK";
    return;
  }

  // ==========================================
  // 3. HÀM HỖ TRỢ
  // ==========================================

  function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = value || "";
    }
  }

  function setMeta(attribute, key, content) {
    let element = document.querySelector(
      `meta[${attribute}="${key}"]`
    );

    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, key);
      document.head.appendChild(element);
    }

    element.setAttribute("content", content || "");
  }

  function setLink(rel, href) {
    let element = document.querySelector(`link[rel="${rel}"]`);

    if (!element) {
      element = document.createElement("link");
      element.rel = rel;
      document.head.appendChild(element);
    }

    element.href = href;
  }

  function absoluteUrl(path) {
    if (!path) return "";

    try {
      return new URL(path, BASE_URL).href;
    } catch (error) {
      return BASE_URL + path;
    }
  }

  function renderList(id, items) {
    const element = document.getElementById(id);

    if (!element) return;

    element.replaceChildren();

    const values = Array.isArray(items)
      ? items
      : items
        ? [items]
        : [];

    values.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item;
      element.appendChild(li);
    });
  }

  function formatPrice(price) {
    return Number(price || 0).toLocaleString("vi-VN") + "₫";
  }

  // ==========================================
  // 4. TỐI ƯU SEO TITLE VÀ META DESCRIPTION
  // ==========================================

  const seoDescriptions = {
    "goat-original":
      "Khám phá sữa dê tươi nguyên chất YoooMILK 1L với hương vị thơm béo, dịu nhẹ. Tìm hiểu thông tin sản phẩm và giá bán tại YoooMILK.",

    "goat-low":
      "Trải nghiệm sữa dê tươi ít đường YoooMILK 1L với vị thanh nhẹ, dễ thưởng thức. Khám phá thông tin chi tiết và giá bán sản phẩm.",

    "goat-organic":
      "Khám phá sữa dê Organic YoooMILK 1L – lựa chọn từ sữa dê dành cho người yêu thích sản phẩm dinh dưỡng. Xem thông tin chi tiết tại YoooMILK.",

    "almond":
      "Khám phá sữa hạt hạnh nhân YoooMILK 1L với hương vị thơm ngon, phù hợp để bổ sung lựa chọn từ thực vật vào thực đơn hằng ngày.",

    "yogurt":
      "Thưởng thức sữa chua YoooMILK lốc 4 hộp với hương vị thơm ngon, tiện lợi. Khám phá thông tin sản phẩm và giá bán tại YoooMILK."
  };

  const seoTitle = product.name + " | YoooMILK";

  const seoDescription =
    seoDescriptions[productId] ||
    (
      "Khám phá " +
      product.name +
      " tại YoooMILK. Tìm hiểu thông tin chi tiết, thành phần, quy cách và giá bán sản phẩm."
    );

  document.title = seoTitle;

  setMeta("name", "description", seoDescription);
  setMeta("name", "robots", "index, follow");

  // ==========================================
  // 5. TỐI ƯU CANONICAL URL
  // ==========================================

  setLink("canonical", PRODUCT_URL);

  // ==========================================
  // 6. TỐI ƯU OPEN GRAPH
  // ==========================================

  const productImage = absoluteUrl(
    product.image || fallbackImages[productId]
  );

  setMeta("property", "og:type", "product");
  setMeta("property", "og:site_name", "YoooMILK");
  setMeta("property", "og:locale", "vi_VN");
  setMeta("property", "og:title", seoTitle);
  setMeta("property", "og:description", seoDescription);
  setMeta("property", "og:image", productImage);
  setMeta("property", "og:url", PRODUCT_URL);

  // ==========================================
  // 7. TỐI ƯU TWITTER CARD
  // ==========================================

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", seoTitle);
  setMeta("name", "twitter:description", seoDescription);
  setMeta("name", "twitter:image", productImage);

  // ==========================================
  // 8. TỐI ƯU HÌNH ẢNH SẢN PHẨM
  // ==========================================

  const mainImage = document.getElementById("productImage");
  const thumbImage = document.getElementById("thumbImage");

  const imagePath = product.image || fallbackImages[productId];

  if (mainImage) {
    mainImage.src = imagePath;
    mainImage.alt =
      product.name + " chính hãng từ thương hiệu YoooMILK";
    mainImage.loading = "eager";
    mainImage.fetchPriority = "high";
    mainImage.decoding = "async";
  }

  if (thumbImage) {
    thumbImage.src = imagePath;
    thumbImage.alt = "Hình ảnh xem trước " + product.name;
  }

  // ==========================================
  // 9. HIỂN THỊ THÔNG TIN SẢN PHẨM
  // ==========================================

  setText("productCategory", product.category || product.label);
  setText("productName", product.name);
  setText("crumbName", product.name);
  setText("productShort", product.short);
  setText("productPrice", formatPrice(product.price));
  setText("productDescription", product.description);

  setText("specType", product.category);
  setText("specSize", product.size);
  setText("specStorage", product.storage);

  setText("ingredientText", product.ingredients);
  setText("nutritionText", product.nutrition);

  renderList("productPoints", product.points);
  renderList("usageList", product.usage);
  renderList("noteList", product.notes);

  // ==========================================
  // 10. DỮ LIỆU CẤU TRÚC PRODUCT SCHEMA
  // ==========================================

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || seoDescription,
    "image": [productImage],
    "brand": {
      "@type": "Brand",
      "name": "YoooMILK"
    },
    "category": product.category || product.label,
    "offers": {
      "@type": "Offer",
      "url": PRODUCT_URL,
      "priceCurrency": "VND",
      "price": Number(product.price),
      "seller": {
        "@type": "Organization",
        "name": "YoooMILK"
      }
    }
  };

  const productSchemaElement =
    document.getElementById("productStructuredData");

  if (productSchemaElement) {
    productSchemaElement.textContent =
      JSON.stringify(productSchema);
  }

  // ==========================================
  // 11. BREADCRUMB SCHEMA
  // ==========================================

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Sản phẩm",
        "item": BASE_URL + "index.html#products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": PRODUCT_URL
      }
    ]
  };

  const breadcrumbSchemaElement =
    document.getElementById("breadcrumbStructuredData");

  if (breadcrumbSchemaElement) {
    breadcrumbSchemaElement.textContent =
      JSON.stringify(breadcrumbSchema);
  }

  // ==========================================
  // 12. HIỂN THỊ NĂM HIỆN TẠI
  // ==========================================

  setText("year", new Date().getFullYear());

  // ==========================================
  // 13. MENU MOBILE
  // ==========================================

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");

      const isOpen = mainNav.classList.contains("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Đóng menu" : "Mở menu"
      );
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Mở menu");
      });
    });
  }

  // ==========================================
  // 14. CHỨC NĂNG CHỌN SỐ LƯỢNG
  // ==========================================

  let quantity = 1;

  const qtyValue = document.getElementById("qtyValue");
  const qtyMinus = document.getElementById("qtyMinus");
  const qtyPlus = document.getElementById("qtyPlus");

  function updateQuantity() {
    if (qtyValue) {
      qtyValue.textContent = quantity;
    }
  }

  if (qtyMinus) {
    qtyMinus.addEventListener("click", function () {
      if (quantity > 1) {
        quantity--;
        updateQuantity();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener("click", function () {
      quantity++;
      updateQuantity();
    });
  }

  updateQuantity();

  // ==========================================
  // 15. QUẢN LÝ GIỎ HÀNG LOCAL STORAGE
  // ==========================================

  function getCart() {
    try {
      return JSON.parse(
        localStorage.getItem("yoomilk-cart")
      ) || {};
    } catch (error) {
      return {};
    }
  }

  function saveCart(cart) {
    localStorage.setItem(
      "yoomilk-cart",
      JSON.stringify(cart)
    );
  }

  function addProductToCart() {
    const cart = getCart();

    cart[product.id] =
      (Number(cart[product.id]) || 0) + quantity;

    saveCart(cart);
  }

  // ==========================================
  // 16. THÔNG BÁO TOAST
  // ==========================================

  const toast = document.getElementById("detailToast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2500);
  }

  // ==========================================
  // 17. NÚT THÊM VÀO GIỎ HÀNG
  // ==========================================

  const addToCartButton =
    document.getElementById("addToCart");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", function () {
      addProductToCart();

      showToast(
        "Đã thêm " +
        quantity +
        " sản phẩm vào giỏ hàng!"
      );
    });
  }

  // ==========================================
  // 18. NÚT MUA NGAY
  // ==========================================

  const buyNowButton =
    document.getElementById("buyNow");

  if (buyNowButton) {
    buyNowButton.addEventListener("click", function () {
      addProductToCart();

      showToast("Đang chuyển đến trang mua sắm...");

      setTimeout(function () {
        window.location.href = "index.html#products";
      }, 800);
    });
  }

  // ==========================================
  // 19. NHẤN ẢNH THU NHỎ ĐỂ XEM ẢNH CHÍNH
  // ==========================================

  const thumbButton =
    document.querySelector(".detail-thumb");

  if (thumbButton && mainImage && thumbImage) {
    thumbButton.addEventListener("click", function () {
      mainImage.src = thumbImage.src;
    });
  }
});
