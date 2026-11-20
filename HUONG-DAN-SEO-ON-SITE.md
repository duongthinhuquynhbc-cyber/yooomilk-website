# HƯỚNG DẪN CẬP NHẬT BẢN SEO ON-SITE YOOOMILK

## Nội dung đã tối ưu
- Chuyển các ảnh PNG đang được website sử dụng sang WebP để giảm dung lượng tải.
- Giữ lại PNG gốc làm phương án dự phòng; không xóa ảnh gốc.
- Cập nhật đường dẫn ảnh trong trang chủ, trang câu chuyện, dữ liệu sản phẩm và các script liên quan.
- Tải trước ảnh chính của trang sản phẩm theo `?id=` để trình duyệt phát hiện ảnh LCP sớm hơn.
- Ưu tiên tải ảnh sản phẩm chính; ảnh thumbnail dùng lazy loading.
- Nạp Google Fonts theo cách không chặn quá trình dựng trang.
- Cập nhật title, meta description, canonical, Open Graph, Twitter Card và Product/Breadcrumb structured data theo từng sản phẩm.
- Giữ nguyên giá, nội dung, chức năng giỏ hàng, menu và bố cục hiện có.

## Cách cập nhật GitHub
1. Tải và giải nén `yooomilk-website-SEO-optimized.zip`.
2. Mở thư mục `yooomilk-website-main` bên trong.
3. Mở repository GitHub `yooomilk-website`.
4. Tải lên các tệp trong thư mục đã giải nén, giữ nguyên cấu trúc thư mục (`assets`, `js`, các file HTML ở thư mục gốc).
5. Khi GitHub hỏi thay thế tệp đã tồn tại, chọn thay thế/commit các thay đổi.
6. Chờ GitHub Actions `pages build and deployment` chạy thành công.

Có thể dùng `yooomilk-website-SEO-patch.zip` nếu chỉ muốn tải lên các tệp đã thay đổi và ảnh WebP mới. Không tải tệp ZIP trực tiếp vào repository vì GitHub Pages không tự giải nén ZIP.

## Kiểm tra sau khi cập nhật
- Mở lần lượt 5 URL sản phẩm:
  - `product.html?id=goat-original`
  - `product.html?id=goat-low`
  - `product.html?id=goat-organic`
  - `product.html?id=almond`
  - `product.html?id=yogurt`
- Kiểm tra ảnh, tên, giá, nút thêm giỏ và mua ngay.
- Kiểm tra trang chủ và `story.html` để xác nhận hình ảnh vẫn hiển thị.
- Chạy lại PageSpeed Insights trên Mobile và Desktop.

## Lưu ý
Điểm PageSpeed có thể thay đổi theo thiết bị, mạng và thời điểm đo. Bản cập nhật tối ưu tài nguyên và thứ tự tải ảnh, nhưng không thể cam kết một điểm Performance/LCP cố định. GitHub Pages cũng giới hạn việc tùy chỉnh HTTP cache headers; cảnh báo cache lifetime có thể vẫn còn.
