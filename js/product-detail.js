
/* =====================================================
   YoooMILK - PRODUCT DETAIL
   File: js/product-detail.js
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ===================================================
     1. CẤU HÌNH
  =================================================== */

  const BASE_URL =
    "https://duongthinhuquynhbc-cyber.github.io/yooomilk-website/";

  const CART_KEY = "yoomilk-cart";

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || "goat-original";

  // Lấy dữ liệu từ products-data.js
  const database = window.PRODUCTS_DATA || {};
  const product = database[productId];

  const PRODUCT_URL =
    BASE_URL + "product.html?id=" + encodeURIComponent(productId);


  /* ===================================================
     2. HÀM HỖ TRỢ
  =================================================== */

  function getElement(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    const element = getElement(id);

    if (element) {
      element.textContent = value == null ? "" : value;
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
    let element = document.querySelector(
      `link[rel="${rel}"]`
    );

    if (!element) {
      element = document.createElement("link");
      element.rel = rel;
      document.head.appendChild(element);
    }

    element.href = href;
  }

  function absoluteUrl(path) {
    if (!path) return "";

    return new URL(path, BASE_URL).href;
  }

  function formatPrice(price) {
    return Number(price || 0).toLocaleString("vi-VN") + "₫";
  }

  function renderList(id, items) {
    const element = getElement(id);

    if (!element) return;

    element.replaceChildren();

    const list = Array.isArray(items)
      ? items
      : items
        ? [items]
        : [];

    list.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item;
      element.appendChild(li);
    });
  }


  /* ===================================================
     3. KIỂM TRA SẢN PHẨM
  =================================================== */

  if (!product) {
    document.title = "Không tìm thấy sản phẩm | YoooMILK";

    setText("productName", "Không tìm thấy sản phẩm");

    setText(
      "productShort",
      "Sản phẩm bạn đang tìm kiếm hiện không tồn tại hoặc đường dẫn không hợp lệ."
    );

    setText("productPrice", "");
    setText("productDescription", "");

    console.error(
      "YoooMILK: Không tìm thấy sản phẩm có ID:",
      productId
    );

    return;
  }


  /* ===================================================
     4. SEO TITLE VÀ META DESCRIPTION
  =================================================== */

  const seoDescriptions = {
    "goat-original":
      "Khám phá sữa dê tươi nguyên chất YoooMILK 1L với hương vị thơm béo, dịu nhẹ và đặc trưng. Tìm hiểu thông tin sản phẩm và giá bán.",

    "goat-low":
      "Trải nghiệm sữa dê tươi ít đường YoooMILK 1L với vị ngọt nhẹ nhàng, dành cho người yêu thích hương vị sữa dê không quá ngọt.",

    "goat-organic":
      "Khám phá sữa dê Organic YoooMILK 1L dành cho khách hàng quan tâm đến dòng sản phẩm sữa dê Organic. Xem thông tin chi tiết.",

    "almond":
      "Khám phá sữa hạt hạnh nhân YoooMILK 1L với hương vị hạnh nhân đặc trưng. Tìm hiểu thông tin sản phẩm và giá bán.",

    "yogurt":
      "Thưởng thức sữa chua YoooMILK lốc 4 hộp với kết cấu mềm mịn và hương vị thơm ngon. Khám phá thông tin sản phẩm."
  };

  const seoTitle = product.name + " | YoooMILK";

  const seoDescription =
    seoDescriptions[productId] ||
    "Khám phá " + product.name +
    " tại YoooMILK. Tìm hiểu thông tin và giá bán sản phẩm.";

  document.title = seoTitle;

  setMeta("name", "description", seoDescription);
  setMeta("name", "robots", "index, follow");

  setLink("canonical", PRODUCT_URL);


  /* ===================================================
     5. OPEN GRAPH
  =================================================== */

  const imagePath =
    product.image || product.fallbackImage;

  const productImage = absoluteUrl(imagePath);

  setMeta("property", "og:type", "product");
  setMeta("property", "og:site_name", "YoooMILK");
  setMeta("property", "og:locale", "vi_VN");
  setMeta("property", "og:title", seoTitle);
  setMeta("property", "og:description", seoDescription);
  setMeta("property", "og:image", productImage);
  setMeta("property", "og:url", PRODUCT_URL);


  /* ===================================================
     6. TWITTER CARD
  =================================================== */

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", seoTitle);
  setMeta("name", "twitter:description", seoDescription);
  setMeta("name", "twitter:image", productImage);


  /* ===================================================
     7. HIỂN THỊ HÌNH ẢNH
  =================================================== */

  const mainImage = getElement("productImage");
  const thumbImage = getElement("thumbImage");

  function applyProductImage(imageElement) {
    if (!imageElement) return;

    imageElement.alt = product.name + " - YoooMILK";
    imageElement.loading = "eager";
    imageElement.decoding = "async";

    imageElement.onerror = function () {
      if (
        product.fallbackImage &&
        imageElement.dataset.fallbackApplied !== "true"
      ) {
        imageElement.dataset.fallbackApplied = "true";
        imageElement.src = product.fallbackImage;
      }
    };

    imageElement.src =
      product.image || product.fallbackImage || "";
  }

  applyProductImage(mainImage);
  applyProductImage(thumbImage);

  if (mainImage) {
    mainImage.fetchPriority = "high";
  }


  /* ===================================================
     8. HIỂN THỊ THÔNG TIN SẢN PHẨM
  =================================================== */

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


  /* ===================================================
     9. PRODUCT STRUCTURED DATA
  =================================================== */

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || seoDescription,
    "image": productImage ? [productImage] : [],
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "YoooMILK"
    },
    "category": product.category,
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
    getElement("productStructuredData");

  if (productSchemaElement) {
    productSchemaElement.textContent =
      JSON.stringify(productSchema);
  }


  /* ===================================================
     10. BREADCRUMB STRUCTURED DATA
  =================================================== */

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
    getElement("breadcrumbStructuredData");

  if (breadcrumbSchemaElement) {
    breadcrumbSchemaElement.textContent =
      JSON.stringify(breadcrumbSchema);
  }


  /* ===================================================
     11. NĂM HIỆN TẠI
  =================================================== */

  setText("year", new Date().getFullYear());


  /* ===================================================
     12. MENU MOBILE
  =================================================== */

  const menuToggle = getElement("menuToggle");
  const mainNav = getElement("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");

      const isOpen =
        mainNav.classList.contains("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Đóng menu" : "Mở menu"
      );
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Mở menu"
        );
      });
    });
  }


  /* ===================================================
     13. ĐIỀU CHỈNH SỐ LƯỢNG
  =================================================== */

  let quantity = 1;

  const qtyValue = getElement("qtyValue");
  const qtyMinus = getElement("qtyMinus");
  const qtyPlus = getElement("qtyPlus");

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


  /* ===================================================
     14. QUẢN LÝ GIỎ HÀNG
  =================================================== */

  function getCart() {
    try {
      const savedCart =
        JSON.parse(localStorage.getItem(CART_KEY));

      if (
        savedCart &&
        typeof savedCart === "object" &&
        !Array.isArray(savedCart)
      ) {
        return savedCart;
      }

      return {};

    } catch (error) {
      console.error("Không thể đọc giỏ hàng:", error);
      return {};
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
      );

      return true;

    } catch (error) {
      console.error("Không thể lưu giỏ hàng:", error);
      return false;
    }
  }

  function addProductToCart() {
    const cart = getCart();

    cart[product.id] =
      (Number(cart[product.id]) || 0) + quantity;

    return saveCart(cart);
  }


  /* ===================================================
     15. THÔNG BÁO TOAST
  =================================================== */

  const toast = getElement("detailToast");

  let toastTimer;

  function showToast(message) {
    if (!toast) {
      alert(message);
      return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2500);
  }


  /* ===================================================
     16. NÚT THÊM VÀO GIỎ HÀNG
  =================================================== */

  const addToCartButton = getElement("addToCart");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", function () {
      const success = addProductToCart();

      if (success) {
        showToast(
          "Đã thêm " + quantity +
          " sản phẩm vào giỏ hàng!"
        );
      } else {
        showToast(
          "Không thể lưu giỏ hàng. Vui lòng thử lại."
        );
      }
    });
  }


  /* ===================================================
     17. NÚT MUA NGAY
  =================================================== */

  const buyNowButton = getElement("buyNow");

  if (buyNowButton) {
    buyNowButton.addEventListener("click", function () {
      const success = addProductToCart();

      if (!success) {
        showToast(
          "Không thể lưu giỏ hàng. Vui lòng thử lại."
        );
        return;
      }

      showToast("Đã thêm sản phẩm. Đang chuyển đến trang mua sắm...");

      setTimeout(function () {
        window.location.href = "index.html#products";
      }, 800);
    });
  }


  /* ===================================================
     18. ẢNH THU NHỎ
  =================================================== */

  const thumbButton =
    document.querySelector(".detail-thumb");

  if (thumbButton && mainImage && thumbImage) {
    thumbButton.addEventListener("click", function () {
      const currentMainImage = mainImage.src;

      mainImage.src = thumbImage.src;
      thumbImage.src = currentMainImage;
    });
  }


  /* ===================================================
     19. KIỂM TRA HOÀN TẤT
  =================================================== */

  console.log(
    "YoooMILK: Đã tải thành công sản phẩm",
    product.name
  );

});
