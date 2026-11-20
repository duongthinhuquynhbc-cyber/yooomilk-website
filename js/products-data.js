
/* =========================================
   YoooMILK - PRODUCT DATABASE
   WEBP FIRST + PNG FALLBACK
   ========================================= */

const PRODUCTS_DATA = {
  "goat-original": {
    id: "goat-original",
    name: "Sữa dê tươi nguyên chất 1L",
    category: "Sữa dê tươi",
    label: "SỮA DÊ TƯƠI",
    size: "1 lít",
    price: 69000,

    image: "assets/product-goat-original.webp",
    fallbackImage: "assets/product-goat-original.png",

    short:
      "Sữa dê tươi nguyên chất YoooMILK 1L dành cho những ai yêu thích hương vị sữa dê tự nhiên.",

    description:
      "Sữa dê tươi nguyên chất YoooMILK 1L dành cho những ai yêu thích hương vị sữa dê tự nhiên. Với dung tích tiện lợi, sản phẩm phù hợp để sử dụng trong thực đơn hằng ngày của cá nhân và gia đình.",

    points: [
      "Hương vị sữa dê tự nhiên",
      "Dung tích tiện lợi 1 lít",
      "Phù hợp sử dụng tại nhà và gia đình"
    ],

    ingredients:
      "Thành phần cụ thể cần được đối chiếu theo nhãn bao bì chính thức của sản phẩm.",

    usage: [
      "Lắc nhẹ trước khi sử dụng nếu có hướng dẫn trên bao bì.",
      "Dùng trực tiếp hoặc kết hợp với các món ăn phù hợp.",
      "Đậy kín sau khi mở bao bì."
    ],

    nutrition:
      "Thông tin dinh dưỡng cần căn cứ vào bảng thành phần được công bố trên bao bì sản phẩm.",

    notes: [
      "Kiểm tra bao bì trước khi sử dụng.",
      "Bảo quản theo hướng dẫn của nhà sản xuất.",
      "Không sử dụng sản phẩm khi bao bì có dấu hiệu bất thường."
    ],

    storage: "Bảo quản theo hướng dẫn trên bao bì sản phẩm."
  },

  "goat-low": {
    id: "goat-low",
    name: "Sữa dê tươi ít đường 1L",
    category: "Sữa dê tươi",
    label: "ÍT ĐƯỜNG",
    size: "1 lít",
    price: 72000,

    image: "assets/product-goat-low-sugar.webp",
    fallbackImage: "assets/product-goat-low-sugar.png",

    short:
      "Sữa dê tươi ít đường YoooMILK 1L là lựa chọn dành cho khách hàng yêu thích sữa dê nhưng muốn giảm độ ngọt khi thưởng thức.",

    description:
      "Sữa dê tươi ít đường YoooMILK 1L mang đến hương vị dịu nhẹ, dễ uống. Đây là lựa chọn dành cho những khách hàng yêu thích sữa dê nhưng muốn giảm độ ngọt khi thưởng thức.",

    points: [
      "Hương vị dịu nhẹ",
      "Lựa chọn ít đường",
      "Dung tích tiện lợi 1 lít"
    ],

    ingredients:
      "Thành phần cụ thể cần được đối chiếu theo nhãn bao bì chính thức của sản phẩm.",

    usage: [
      "Lắc nhẹ trước khi sử dụng nếu có hướng dẫn trên bao bì.",
      "Dùng trực tiếp theo hướng dẫn của nhà sản xuất.",
      "Đậy kín sau khi mở bao bì."
    ],

    nutrition:
      "Thông tin dinh dưỡng và hàm lượng đường cần căn cứ vào bảng thành phần được công bố trên bao bì sản phẩm.",

    notes: [
      "Kiểm tra bao bì trước khi sử dụng.",
      "Bảo quản theo hướng dẫn của nhà sản xuất.",
      "Không sử dụng sản phẩm khi bao bì có dấu hiệu bất thường."
    ],

    storage: "Bảo quản theo hướng dẫn trên bao bì sản phẩm."
  },

  "goat-organic": {
    id: "goat-organic",
    name: "Sữa dê Organic 1L",
    category: "Sữa dê tươi",
    label: "ORGANIC",
    size: "1 lít",
    price: 79000,

    image: "assets/product-goat-organic.webp",
    fallbackImage: "assets/product-goat-organic.png",

    short:
      "Sữa dê Organic YoooMILK 1L dành cho khách hàng quan tâm đến các sản phẩm thuộc dòng sữa dê hữu cơ.",

    description:
      "Sữa dê Organic YoooMILK 1L mang đến thêm lựa chọn cho những khách hàng quan tâm đến dòng sản phẩm sữa dê hữu cơ và mong muốn đa dạng hóa thực đơn hằng ngày.",

    points: [
      "Thuộc dòng sản phẩm sữa dê Organic",
      "Dung tích tiện lợi 1 lít",
      "Đa dạng lựa chọn cho người tiêu dùng"
    ],

    ingredients:
      "Thành phần và thông tin chứng nhận cần được đối chiếu theo nhãn bao bì và hồ sơ công bố chính thức.",

    usage: [
      "Sử dụng theo hướng dẫn của nhà sản xuất.",
      "Đậy kín sau khi mở bao bì.",
      "Không sử dụng khi sản phẩm có dấu hiệu bất thường."
    ],

    nutrition:
      "Thông tin dinh dưỡng cần căn cứ vào bảng thành phần được công bố trên bao bì sản phẩm.",

    notes: [
      "Kiểm tra thông tin sản phẩm trước khi sử dụng.",
      "Bảo quản theo hướng dẫn trên bao bì.",
      "Tham khảo thông tin chứng nhận chính thức của sản phẩm."
    ],

    storage: "Bảo quản theo hướng dẫn trên bao bì sản phẩm."
  },

  "almond": {
    id: "almond",
    name: "Sữa hạt hạnh nhân 1L",
    category: "Sữa hạt",
    label: "TỪ HẠT",
    size: "1 lít",
    price: 59000,

    image: "assets/sua-hat-hanh-nhan.webp",
    fallbackImage: "assets/sua-hat-hanh-nhan.png",

    short:
      "Sữa hạt hạnh nhân YoooMILK 1L là lựa chọn thơm ngon dành cho những ai yêu thích thức uống từ thực vật.",

    description:
      "Sữa hạt hạnh nhân YoooMILK 1L mang hương vị hạnh nhân đặc trưng cùng dung tích tiện lợi, phù hợp để thưởng thức tại nhà hoặc trong những giờ nghỉ giữa ngày.",

    points: [
      "Hương vị hạnh nhân đặc trưng",
      "Lựa chọn từ thực vật",
      "Dung tích tiện lợi 1 lít"
    ],

    ingredients:
      "Thành phần cụ thể cần được đối chiếu theo nhãn bao bì chính thức của sản phẩm.",

    usage: [
      "Sử dụng theo hướng dẫn trên bao bì.",
      "Có thể thưởng thức trực tiếp.",
      "Đậy kín sau khi mở bao bì."
    ],

    nutrition:
      "Thông tin dinh dưỡng cần căn cứ vào bảng thành phần được công bố trên bao bì sản phẩm.",

    notes: [
      "Kiểm tra thành phần trước khi sử dụng.",
      "Bảo quản theo hướng dẫn của nhà sản xuất.",
      "Không sử dụng khi bao bì có dấu hiệu bất thường."
    ],

    storage: "Bảo quản theo hướng dẫn trên bao bì sản phẩm."
  },

  "yogurt": {
    id: "yogurt",
    name: "Sữa chua YoooMILK lốc 4 hộp",
    category: "Sữa chua",
    label: "MỀM MỊN",
    size: "Lốc 4 hộp × 100g",
    price: 49000,

    image: "assets/sua-chua-yooomilk.webp",
    fallbackImage: "assets/sua-chua-yooomilk.png",

    short:
      "Sữa chua YoooMILK lốc 4 hộp với kết cấu mềm mịn và hương vị thơm ngon, thích hợp làm món ăn nhẹ trong ngày.",

    description:
      "Sữa chua YoooMILK lốc 4 hộp có kết cấu mềm mịn, thích hợp làm món ăn nhẹ trong ngày. Quy cách đóng lốc tiện lợi giúp bạn dễ dàng bảo quản và thưởng thức cùng gia đình.",

    points: [
      "Kết cấu mềm mịn",
      "Quy cách đóng lốc tiện lợi",
      "Phù hợp thưởng thức trong ngày"
    ],

    ingredients:
      "Thành phần cụ thể cần được đối chiếu theo nhãn bao bì chính thức của sản phẩm.",

    usage: [
      "Sử dụng trực tiếp theo hướng dẫn trên bao bì.",
      "Có thể dùng làm món ăn nhẹ.",
      "Bảo quản và sử dụng theo hướng dẫn của nhà sản xuất."
    ],

    nutrition:
      "Thông tin dinh dưỡng cần căn cứ vào bảng thành phần được công bố trên bao bì sản phẩm.",

    notes: [
      "Kiểm tra hạn sử dụng trước khi dùng.",
      "Bảo quản theo hướng dẫn trên bao bì.",
      "Không sử dụng khi bao bì có dấu hiệu bất thường."
    ],

    storage: "Bảo quản theo hướng dẫn trên bao bì sản phẩm."
  }
};
