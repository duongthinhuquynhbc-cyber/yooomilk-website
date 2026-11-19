# YoooMILK website – bản nâng cấp trang chi tiết

## Cách chạy
- Mở `index.html` để xem trang chủ.
- Nhấn ảnh hoặc tên sản phẩm để mở `product.html?id=...`.
- Nhấn “Câu chuyện YoooMILK” để mở `story.html`.

## Chỉnh sửa dữ liệu sản phẩm
Mở `js/products.json`. Mỗi sản phẩm có các trường:
`name`, `category`, `image`, `price`, `short`, `description`, `points`, `size`, `type`, `storage`.
Các mã sản phẩm hiện có: `goat-original`, `goat-low`, `goat-organic`, `almond`, `yogurt`.

## Đưa lên GitHub Pages
Giải nén toàn bộ thư mục và tải toàn bộ nội dung bên trong `yooomilk-website` lên repository hiện tại, giữ nguyên cấu trúc `assets`, `css`, `js`. Không chỉ tải riêng file `index.html`.

## Lưu ý
Đây là website front-end tĩnh nhiều trang, dùng JavaScript để đọc dữ liệu JSON và quản lý giỏ hàng trên trình duyệt (localStorage). Chức năng đặt hàng/thanh toán chưa kết nối máy chủ hoặc cổng thanh toán thực tế.


## Cập nhật nội dung trang chi tiết sản phẩm
- Nội dung của 5 sản phẩm đã được bổ sung: mô tả, điểm nổi bật, thành phần, hướng dẫn sử dụng, thông tin dinh dưỡng và lưu ý.
- Dữ liệu chính nằm trong `js/products.json`.
- `js/products-data.js` là dữ liệu dự phòng để trang chi tiết vẫn hiển thị khi mở `product.html` trực tiếp bằng `file://`.
- Khi triển khai lên GitHub Pages, website sẽ ưu tiên tải dữ liệu mới nhất từ `js/products.json`.
- Các thông tin dinh dưỡng, tỷ lệ thành phần, thời hạn sử dụng và chứng nhận hữu cơ chưa được tự đặt số liệu; cần đối chiếu nhãn và hồ sơ công bố thực tế trước khi công khai.


## Bản cập nhật Cẩm nang và hình ảnh
- Thay khu vực 3 giá trị thương hiệu bằng 3 bài cẩm nang có trang đọc riêng.
- Thêm `guide.html`, `js/guides-data.js`, `js/guide.js`, `css/guides.css`.
- Sửa ảnh của Sữa dê ít đường và Sữa dê Organic: ảnh TopKid cũ không còn bị dùng làm ảnh Sữa dê Organic. Hai hình thay thế được ghi rõ là hình minh họa, không phải ảnh bao bì thực tế.
- Ảnh sản phẩm chính xác cần được thay bằng ảnh chụp bao bì thực tế của từng SKU khi có đủ hình.
- Nội dung cẩm nang là nội dung giáo dục người tiêu dùng, tránh khẳng định công dụng y tế hoặc số liệu dinh dưỡng không có hồ sơ xác thực.


## Bản thiết kế lại theo yêu cầu
- Đã bỏ chuyên mục Cẩm nang và khôi phục ba giá trị Tươi mới – Minh bạch – Thuận tiện.
- Nút ở phần giới thiệu trang chủ đổi thành “Tìm hiểu thêm về câu chuyện YoooMILK”, liên kết đến `story.html`.
- Thiết kế lại `story.html` với bố cục giới thiệu, định hướng thương hiệu, ba giá trị và CTA cuối trang.
- Chuẩn hóa khung ảnh và thẻ sản phẩm trên trang chủ; chuẩn hóa khoảng cách, kiểu chữ và bố cục trang chi tiết.
- Cẩm nang không còn nằm trong menu hoặc gói website.


## Đồng bộ hình ảnh sản phẩm theo ảnh được duyệt
- Thay ảnh 3 sản phẩm sữa dê bằng các ảnh crop trực tiếp từ hình tham chiếu được duyệt.
- Đồng bộ ảnh ở thẻ sản phẩm, dữ liệu JSON, dữ liệu dự phòng và trang chi tiết sản phẩm.
- Thay hình minh họa cũ trong khu vực Khuyến mãi bằng ảnh sản phẩm sữa dê ít đường.
- Bỏ nhãn chồng lặp trên ba thẻ vì nhãn đã nằm trong ảnh sản phẩm.


## Cập nhật ảnh sản phẩm nền trong suốt
- Tách riêng bao bì 3 dòng sữa dê từ hình ảnh đã được duyệt, tạo PNG nền trong suốt.
- Áp dụng ảnh trong suốt cho banner trang chủ, danh mục, thẻ sản phẩm, trang câu chuyện, banner khuyến mãi và trang chi tiết.
- Phần hình in trên bao bì (bầu trời, nhãn, logo, chữ) được giữ nguyên; chỉ xóa phần nền bên ngoài bao bì.
