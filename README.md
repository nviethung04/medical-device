# Tổng quan Website Quản lý Hàng hóa và Thiết bị Y tế

## Công Nghệ Sử Dụng
- **Giao diện và hệ thống**: Sử dụng Next.js để xây dựng trang web.
- **Cơ sở dữ liệu**: Lưu trữ thông tin thiết bị bằng MongoDB.
- **Các thư viện hỗ trợ**:
  - **UI**: `@mui/material`, `@mui/icons-material`, `@mui/lab`
  - **Quản lý trạng thái & API**: `axios`, `react-helmet-async`
  - **Biểu đồ**: `apexcharts`, `react-apexcharts`
  - **Tiện ích khác**: `lodash`, `crypto-js`
  - **Sidebar**: `react-mui-sidebar`
  - **Thông báo**: `react-hot-toast`
  - **Phát triển**: `eslint`, `prettier`

## 1. Dashboard (Trang tổng quan)
- Hiển thị các thông tin tổng quát như hàng tồn kho, sản phẩm sắp hết hạn, cảnh báo bảo trì, doanh thu, và các thông báo quan trọng khác.
- Biểu đồ báo cáo tình hình nhập, xuất kho theo thời gian.

## 2. Quản lý hàng hóa
- **Product List Page**: Hiển thị danh sách sản phẩm kèm theo các thông tin như số lượng tồn kho, ngày nhập, ngày hết hạn, và chứng chỉ.
- **Add/Edit Product Page**: Trang nhập thông tin chi tiết sản phẩm (ngày nhập, số lượng, ngày hết hạn, loại máy, chứng chỉ ISO, FDA, CE...).
- **Product Details Page**: Hiển thị chi tiết từng sản phẩm (phần cứng, phần mềm, hướng dẫn sử dụng, tình trạng thiết bị).

## 3. Xuất nhập kho (Stock In/Out)
- **Stock Entry Page**: Form để thêm thông tin các lần nhập kho, bao gồm mã sản phẩm, ngày nhập, số lượng, và người thực hiện.
- **Stock Out Page**: Form để ghi nhận thông tin xuất kho, tương tự như nhập kho.
- **Stock Report Page**: Báo cáo chi tiết về tình trạng nhập/xuất kho, hiển thị số liệu theo thời gian thực và khả năng lọc theo sản phẩm hoặc khoảng thời gian.

## 4. Theo dõi lô hàng (Batch Tracking)
- **Batch Details Page**: Hiển thị chi tiết các lô hàng, tình trạng từ lúc nhập kho đến khi xuất ra cho khách hàng, kèm theo thông tin lô hàng sắp hết hạn.
- **Batch Alert Page**: Hiển thị các cảnh báo liên quan đến lô hàng gần hết hạn.

## 5. Quản lý khách hàng (Customer Management)
- **Customer List Page**: Danh sách khách hàng với các thông tin như tên, địa chỉ, số điện thoại, và lịch sử mua hàng.
- **Add/Edit Customer Page**: Trang để thêm hoặc chỉnh sửa thông tin khách hàng.
- **Customer Details Page**: Chi tiết về lịch sử bảo hành, bảo trì, hợp đồng dịch vụ với từng khách hàng.

## 6. Quản lý bảo hành và bảo trì (Warranty and Maintenance Management)
- **Warranty Alert Page**: Trang cảnh báo về thời hạn bảo hành sắp hết của thiết bị và vật tư tiêu hao.
- **Maintenance Schedule Page**: Trang lịch trình bảo trì định kỳ cho các thiết bị, có chức năng gửi nhắc nhở khách hàng để gia hạn hợp đồng bảo hành.

## 7. Cảnh báo hàng hóa (Inventory Alerts)
- **Low Stock Alert Page**: Hiển thị cảnh báo khi hàng tồn kho đạt mức tối thiểu cần nhập thêm.
- **Expiry Alert Page**: Hiển thị nhắc nhở nhập thêm vật tư hoặc thiết bị gần hết hạn.

## 8. Quản lý người dùng (User Management)
- **User Roles and Permissions Page**: Quản lý phân quyền người dùng, xác định vai trò (quản lý kho, bán hàng, kỹ thuật bảo trì) và các quyền hạn khác nhau trong hệ thống.

## 9. Báo cáo và phân tích (Reports and Analytics)
- **Sales Report Page**: Báo cáo doanh thu, hiển thị các giao dịch đã thực hiện và phân tích doanh thu theo sản phẩm, thời gian.
- **Stock Report Page**: Báo cáo về tình trạng hàng hóa, xuất nhập kho, và phân tích xu hướng tồn kho.
- **Customer Report Page**: Báo cáo về tình trạng khách hàng, bao gồm lịch sử mua hàng, bảo hành, bảo trì.

## 10. Dự báo tiêu thụ vật tư (Supply Forecasting)
- **Consumption History Page**: Hiển thị lịch sử mua bán và sử dụng vật tư của khách hàng.
- **Supply Forecasting Page**: Trang tính toán và hiển thị dự báo lượng vật tư còn lại dựa trên mức tiêu thụ trung bình của khách hàng, có cảnh báo khi gần hết vật tư.


# MongoDB Sample Database Structure

## Collection: products (Sản phẩm/Hàng hóa)
```json
{
   "_id": ObjectId("..."),
   "name": "Tên sản phẩm",
   "category": "Loại máy/vật tư",
   "stock": {
       "quantity": 100,
       "entry_date": "2024-01-15",
       "expiry_date": "2025-01-15",
       "certificates": ["ISO", "FDA", "CE"]
   },
   "hardware": {
       "details": "Thông tin phần cứng",
       "model": "Mã model",
       "serial_number": "12345"
   },
   "software": {
       "version": "1.0",
       "update_date": "2023-12-01"
   },
   "user_manual": "Link hoặc mô tả hướng dẫn sử dụng",
   "status": "Đang sử dụng" 
}
```

## Collection: stock_transactions (Nhập/Xuất kho)
```json
{
   "_id": ObjectId("..."),
   "product_id": ObjectId("..."),
   "transaction_type": "Nhập" | "Xuất",
   "transaction_date": "2024-01-15",
   "quantity": 50,
   "batch_number": "Lô hàng A123",
   "handled_by": "Tên người thực hiện",
   "comments": "Ghi chú thêm"
}
```

## Collection: customers (Khách hàng)
```json
{
   "_id": ObjectId("..."),
   "name": "Tên khách hàng",
   "address": "Địa chỉ",
   "contact_info": {
       "phone": "Số điện thoại",
       "email": "Email"
   },
   "purchase_history": [
       {
           "product_id": ObjectId("..."),
           "purchase_date": "2024-01-15",
           "quantity": 100,
           "price": 5000,
           "warranty_end_date": "2025-01-15",
           "maintenance_schedule": [
               {
                   "maintenance_date": "2024-07-15",
                   "status": "Đã hoàn thành"
               }
           ]
       }
   ]
}
```

## Collection: warranty (Bảo hành và bảo trì)
```json
{
   "_id": ObjectId("..."),
   "customer_id": ObjectId("..."),
   "product_id": ObjectId("..."),
   "warranty_start_date": "2024-01-15",
   "warranty_end_date": "2025-01-15",
   "maintenance_schedule": [
       {
           "maintenance_date": "2024-07-15",
           "status": "Chưa hoàn thành"
       }
   ],
   "consumables_warning": {
       "expected_consumption": 30,
       "current_stock": 50,
       "warning_level": 20
   }
}
```

## Collection: user_roles (Quản lý quyền người dùng)
```json
{
   "_id": ObjectId("..."),
   "user_id": ObjectId("..."),
   "role": "Admin" | "Quản lý kho" | "Nhân viên bán hàng" | "Kỹ thuật viên",
   "permissions": [
       "Xem sản phẩm",
       "Thêm sản phẩm",
       "Xuất kho",
       "Quản lý bảo hành",
       "Báo cáo doanh thu"
   ]
}
```

## Collection: stock_alerts (Cảnh báo hàng hóa)
```json
{
   "_id": ObjectId("..."),
   "product_id": ObjectId("..."),
   "alert_type": "Hết hàng" | "Hết hạn sử dụng",
   "alert_date": "2024-01-20",
   "quantity_left": 10,
   "expiry_date": "2024-02-01",
   "status": "Chưa xử lý"
}
```

## Collection: reports (Báo cáo)
```json
{
   "_id": ObjectId("..."),
   "report_type": "Báo cáo doanh thu" | "Báo cáo tồn kho",
   "generated_on": "2024-01-15",
   "data": {
       "total_sales": 10000,
       "total_inventory": 500,
       "pending_warranty": 5
   }
}
```

## Collection: consumption_forecasts (Dự báo tiêu thụ vật tư)
```json
{
   "_id": ObjectId("..."),
   "customer_id": ObjectId("..."),
   "product_id": ObjectId("..."),
   "average_consumption": 30,
   "current_stock": 100,
   "forecasted_reorder_date": "2024-02-15",
   "alert_status": "Đã cảnh báo" | "Chưa cảnh báo"
}
```

## Collection: maintenance_records (Quản lý bảo trì và sửa chữa)
```json
{
   "_id": ObjectId("..."),
   "product_id": ObjectId("..."),
   "maintenance_date": "2024-02-01",
   "cost": 1000,
   "status": "Hoàn thành",
   "repair_details": "Thông tin chi tiết về sửa chữa",
   "external_service_provider": "Tên đơn vị bảo trì ngoài"
}
```
