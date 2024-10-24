# Tổng quan Website Quản lý Hàng hóa và Thiết bị Y tế

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


# Phiên bản cũ

# Quản lý hàng hóa
- **Chi tiết sản phẩm**: Bao gồm thông tin ngày nhập kho, ngày hết hạn (đối với vật tư), số lượng, loại máy, và các chứng chỉ kèm theo (ISO, FDA, CE...).
- **Quản lý kiểm chuẩn định kỳ**: Hệ thống tự động cảnh báo khi đến hạn kiểm chuẩn lại các thiết bị y tế và vật tư.
- **Thông tin chi tiết về thiết bị**: Bao gồm phần cứng, phần mềm, và hướng dẫn sử dụng chi tiết cho mỗi loại máy.
- **Tình trạng thiết bị**: Theo dõi trạng thái hoạt động của máy (đang sử dụng, bảo hành, hoặc cần bảo trì).

# Xuất nhập tồn
- **Quản lý chi tiết nhập/xuất**: Theo dõi từng lần nhập kho và xuất kho kèm theo mã sản phẩm, ngày, số lượng và người thực hiện.
- **Báo cáo hàng tồn kho**: Tự động cập nhật và hiển thị báo cáo về tình trạng hàng tồn theo thời gian thực.
- **Theo dõi lô hàng**: Theo dõi từng lô hàng, từ khi nhập kho đến khi xuất ra cho khách hàng, bao gồm cả lô hàng gần hết hạn sử dụng.

# Quản lý dữ liệu khách hàng
- **Thông tin khách hàng**: Bao gồm tên, địa chỉ, lịch sử mua hàng, hợp đồng, và thông tin liên hệ.
- **Lịch sử bảo hành và bảo trì**: Theo dõi lịch sử các dịch vụ bảo hành, bảo trì cho từng khách hàng.
- **Quản lý hợp đồng**: Theo dõi các hợp đồng dịch vụ, hỗ trợ và điều khoản liên quan.

# Quản lý thời gian bảo hành (vật tư tiêu hao)
- **Cảnh báo bảo hành**: Hệ thống gửi cảnh báo khi gần đến thời hạn bảo hành hoặc thay thế vật tư tiêu hao.
- **Lịch bảo trì định kỳ**: Quản lý lịch trình bảo trì và nhắc nhở cho khách hàng để gia hạn hợp đồng bảo hành.

# Cảnh báo hàng hóa
- **Cảnh báo hết hàng**: Tự động gửi cảnh báo khi số lượng hàng tồn kho đạt mức tối thiểu và cần đặt thêm.
- **Theo dõi hạn sử dụng**: Nhắc nhở nhập thêm vật tư hoặc thiết bị sắp hết hạn để tránh lãng phí.

# Quản lý bảo trì và sửa chữa
- Theo dõi lịch trình bảo trì, chi phí sửa chữa, và tình trạng hiện tại của các thiết bị. Có thể tích hợp với các dịch vụ bên ngoài.

# Báo cáo và phân tích
- Báo cáo theo dõi doanh thu, nhập/xuất tồn, tình trạng bảo hành, và tình trạng khách hàng. Hỗ trợ phân tích xu hướng và đưa ra quyết định.

# Quản lý quyền người dùng
- Phân quyền sử dụng hệ thống cho các vai trò khác nhau (quản lý kho, bán hàng, kỹ thuật bảo trì).

Việc bổ sung các tính năng này sẽ giúp quản lý thiết bị y tế hiệu quả hơn và đáp ứng các yêu cầu về kiểm chuẩn, bảo hành, và cảnh báo hàng hóa.

## Cách hoạt động của hệ thống dự báo tiêu thụ vật tư:

### 1. Lưu trữ lịch sử mua bán:
- Mỗi lần khách hàng mua vật tư, hệ thống sẽ ghi nhận số lượng vật tư đã bán, thời gian mua, và thông tin liên quan (đơn giá, số lô, mã vật tư, ngày giao hàng).

### 2. Theo dõi tiêu thụ trung bình:
- Dựa trên lịch sử các giao dịch trước đó, hệ thống sẽ tính toán mức tiêu thụ trung bình của từng loại vật tư. Ví dụ, nếu khách mua 100 đơn vị vật tư mỗi 3 tháng, hệ thống sẽ ghi nhận mức tiêu thụ trung bình là 33 đơn vị mỗi tháng.

### 3. Dự báo lượng vật tư còn lại:
- Sau khi bán hàng, hệ thống sẽ tự động trừ đi lượng vật tư đã giao từ lượng tiêu thụ dự kiến của khách hàng. Khi lượng còn lại thấp hơn một mức nhất định (ví dụ 20% so với lượng tiêu thụ trung bình), hệ thống sẽ cảnh báo bạn.

### 4. Thông báo và đề xuất bán hàng:
- Khi hệ thống dự đoán khách hàng sắp hết vật tư, nó sẽ gửi thông báo cho bạn. Bạn có thể chủ động liên hệ với khách hàng để chào bán thêm vật tư trước khi họ cần.

### Ví dụ cụ thể:
- Khách hàng A mua 200 đơn vị vật tư vào tháng 1, và bạn theo dõi rằng họ thường sử dụng 50 đơn vị mỗi tháng.
- Đến tháng 4, hệ thống sẽ ước lượng khách hàng còn khoảng 50 đơn vị (200 - 150 đơn vị tiêu thụ). Khi lượng này xuống dưới 50 (ví dụ 40), hệ thống sẽ gửi cảnh báo để bạn liên hệ khách hàng chào bán thêm.

### Các tính năng cần thiết:
- **Tính toán mức tiêu thụ trung bình**: Tính toán tự động dựa trên lịch sử giao dịch của khách.
- **Cảnh báo tự động**: Khi vật tư gần hết, hệ thống sẽ gửi thông báo.
- **Lịch sử giao dịch**: Lưu trữ chi tiết mỗi lần mua hàng để dự đoán chính xác hơn.
- **Báo cáo sử dụng vật tư**: Hỗ trợ báo cáo chi tiết về mức tiêu thụ của khách hàng theo thời gian, giúp phân tích nhu cầu và lập kế hoạch bán hàng.


