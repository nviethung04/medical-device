-- Seed data for medical device database

-- Insert sample users
INSERT INTO users (id, email, password, role, profile, active, created_at, updated_at) VALUES
(gen_random_uuid(), 'admin@medical-device.com', 'hashed_password_admin', 1, '{"firstName": "Admin", "lastName": "User", "phone": "0123456789"}', true, NOW(), NOW()),
(gen_random_uuid(), 'manager@medical-device.com', 'hashed_password_manager', 2, '{"firstName": "Manager", "lastName": "User", "phone": "0123456790"}', true, NOW(), NOW()),
(gen_random_uuid(), 'staff@medical-device.com', 'hashed_password_staff', 3, '{"firstName": "Staff", "lastName": "User", "phone": "0123456791"}', true, NOW(), NOW());

-- Insert sample customers
INSERT INTO customers (id, name, email, phone, address, contact_info, active, created_at, updated_at) VALUES
(gen_random_uuid(), 'Bệnh viện Chợ Rẫy', 'contact@choray.vn', '0283851234', '201B Nguyễn Chí Thanh, Quận 5, TP.HCM', '{"phone": "0283851234", "address": "201B Nguyễn Chí Thanh, Quận 5, TP.HCM", "contact_person": "Nguyễn Văn A"}', true, NOW(), NOW()),
(gen_random_uuid(), 'Bệnh viện Đại học Y Dược', 'info@umc.edu.vn', '0283855678', '215 Hồng Bàng, Quận 5, TP.HCM', '{"phone": "0283855678", "address": "215 Hồng Bàng, Quận 5, TP.HCM", "contact_person": "Trần Thị B"}', true, NOW(), NOW()),
(gen_random_uuid(), 'Bệnh viện Nhi Đồng 1', 'contact@nhi1.org.vn', '0283929123', '341 Sư Vạn Hạnh, Quận 10, TP.HCM', '{"phone": "0283929123", "address": "341 Sư Vạn Hạnh, Quận 10, TP.HCM", "contact_person": "Lê Văn C"}', true, NOW(), NOW());

-- Insert sample products
INSERT INTO products (id, name, description, price, quantity, category, image_url, active, created_at, updated_at) VALUES
(gen_random_uuid(), 'Máy X-quang di động', 'Máy X-quang di động chất lượng cao cho chẩn đoán hình ảnh', 150000000.00, 5, 'imaging', '/images/products/xray-mobile.jpg', true, NOW(), NOW()),
(gen_random_uuid(), 'Máy siêu âm tim', 'Máy siêu âm tim 4D với công nghệ tiên tiến', 250000000.00, 3, 'imaging', '/images/products/ultrasound-cardiac.jpg', true, NOW(), NOW()),
(gen_random_uuid(), 'Máy thở ICU', 'Máy thở cho phòng ICU với nhiều chế độ thở', 80000000.00, 8, 'respiratory', '/images/products/ventilator-icu.jpg', true, NOW(), NOW()),
(gen_random_uuid(), 'Monitor đa thông số', 'Monitor theo dõi đa thông số sinh hiệu', 45000000.00, 15, 'monitoring', '/images/products/patient-monitor.jpg', true, NOW(), NOW()),
(gen_random_uuid(), 'Máy điện tim 12 cần', 'Máy điện tim 12 cần tự động', 25000000.00, 12, 'diagnostic', '/images/products/ecg-12-lead.jpg', true, NOW(), NOW()),
(gen_random_uuid(), 'Máy khử rung tim', 'Máy khử rung tim tự động AED', 35000000.00, 6, 'emergency', '/images/products/defibrillator.jpg', true, NOW(), NOW()),
(gen_random_uuid(), 'Bơm tiêm tự động', 'Bơm tiêm tự động chính xác cao', 12000000.00, 20, 'infusion', '/images/products/syringe-pump.jpg', true, NOW(), NOW()),
(gen_random_uuid(), 'Máy xét nghiệm máu', 'Máy xét nghiệm máu tự động', 180000000.00, 2, 'laboratory', '/images/products/blood-analyzer.jpg', true, NOW(), NOW()),
(gen_random_uuid(), 'Giường bệnh điện', 'Giường bệnh điện đa chức năng', 18000000.00, 25, 'furniture', '/images/products/hospital-bed.jpg', true, NOW(), NOW()),
(gen_random_uuid(), 'Máy hút dịch y tế', 'Máy hút dịch y tế di động', 8000000.00, 30, 'suction', '/images/products/suction-unit.jpg', true, NOW(), NOW());

-- Insert sample transactions
INSERT INTO transactions (id, customer_id, total_amount, status, transaction_type, notes, created_at, updated_at) VALUES
(gen_random_uuid(), (SELECT id FROM customers WHERE name = 'Bệnh viện Chợ Rẫy' LIMIT 1), 320000000.00, 'completed', 'sale', 'Đơn hàng thiết bị X-quang và siêu âm', NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days'),
(gen_random_uuid(), (SELECT id FROM customers WHERE name = 'Bệnh viện Đại học Y Dược' LIMIT 1), 125000000.00, 'pending', 'sale', 'Đơn hàng máy thở ICU', NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
(gen_random_uuid(), (SELECT id FROM customers WHERE name = 'Bệnh viện Nhi Đồng 1' LIMIT 1), 180000000.00, 'completed', 'sale', 'Đơn hàng monitor và máy điện tim', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days');

-- Insert sample transaction_items
INSERT INTO transaction_items (id, transaction_id, product_id, quantity, unit_price, total_price, created_at) VALUES
-- Transaction 1 items
(gen_random_uuid(), 
 (SELECT id FROM transactions WHERE total_amount = 320000000.00 LIMIT 1),
 (SELECT id FROM products WHERE name = 'Máy X-quang di động' LIMIT 1),
 2, 150000000.00, 300000000.00, NOW() - INTERVAL '30 days'),
(gen_random_uuid(), 
 (SELECT id FROM transactions WHERE total_amount = 320000000.00 LIMIT 1),
 (SELECT id FROM products WHERE name = 'Máy siêu âm tim' LIMIT 1),
 1, 250000000.00, 250000000.00, NOW() - INTERVAL '30 days'),

-- Transaction 2 items
(gen_random_uuid(), 
 (SELECT id FROM transactions WHERE total_amount = 125000000.00 LIMIT 1),
 (SELECT id FROM products WHERE name = 'Máy thở ICU' LIMIT 1),
 1, 80000000.00, 80000000.00, NOW() - INTERVAL '15 days'),
(gen_random_uuid(), 
 (SELECT id FROM transactions WHERE total_amount = 125000000.00 LIMIT 1),
 (SELECT id FROM products WHERE name = 'Monitor đa thông số' LIMIT 1),
 1, 45000000.00, 45000000.00, NOW() - INTERVAL '15 days'),

-- Transaction 3 items
(gen_random_uuid(), 
 (SELECT id FROM transactions WHERE total_amount = 180000000.00 LIMIT 1),
 (SELECT id FROM products WHERE name = 'Monitor đa thông số' LIMIT 1),
 2, 45000000.00, 90000000.00, NOW() - INTERVAL '10 days'),
(gen_random_uuid(), 
 (SELECT id FROM transactions WHERE total_amount = 180000000.00 LIMIT 1),
 (SELECT id FROM products WHERE name = 'Máy điện tim 12 cần' LIMIT 1),
 3, 25000000.00, 75000000.00, NOW() - INTERVAL '10 days');

-- Insert sample maintenances
INSERT INTO maintenances (id, customer_id, product_id, maintenance_type, description, cost, status, scheduled_date, created_at, updated_at) VALUES
(gen_random_uuid(), 
 (SELECT id FROM customers WHERE name = 'Bệnh viện Chợ Rẫy' LIMIT 1),
 (SELECT id FROM products WHERE name = 'Máy X-quang di động' LIMIT 1),
 'preventive', 'Bảo dưỡng định kỳ máy X-quang', 5000000.00, 'pending', NOW() + INTERVAL '7 days', NOW(), NOW()),
(gen_random_uuid(), 
 (SELECT id FROM customers WHERE name = 'Bệnh viện Đại học Y Dược' LIMIT 1),
 (SELECT id FROM products WHERE name = 'Máy thở ICU' LIMIT 1),
 'corrective', 'Sửa chữa cảm biến áp suất', 3000000.00, 'completed', NOW() - INTERVAL '5 days', NOW() - INTERVAL '10 days', NOW()),
(gen_random_uuid(), 
 (SELECT id FROM customers WHERE name = 'Bệnh viện Nhi Đồng 1' LIMIT 1),
 (SELECT id FROM products WHERE name = 'Monitor đa thông số' LIMIT 1),
 'preventive', 'Kiểm tra và hiệu chuẩn thiết bị', 2000000.00, 'pending', NOW() + INTERVAL '3 days', NOW(), NOW()),
(gen_random_uuid(), 
 (SELECT id FROM customers WHERE name = 'Bệnh viện Chợ Rẫy' LIMIT 1),
 (SELECT id FROM products WHERE name = 'Máy siêu âm tim' LIMIT 1),
 'preventive', 'Bảo dưỡng định kỳ máy siêu âm', 4000000.00, 'pending', NOW() + INTERVAL '15 days', NOW(), NOW()),
(gen_random_uuid(), 
 (SELECT id FROM customers WHERE name = 'Bệnh viện Đại học Y Dược' LIMIT 1),
 (SELECT id FROM products WHERE name = 'Máy điện tim 12 cần' LIMIT 1),
 'corrective', 'Thay thế cáp kết nối', 1500000.00, 'in_progress', NOW() + INTERVAL '1 day', NOW(), NOW());

-- Update product quantities after transactions
UPDATE products SET quantity = quantity - 2 WHERE name = 'Máy X-quang di động';
UPDATE products SET quantity = quantity - 1 WHERE name = 'Máy siêu âm tim';
UPDATE products SET quantity = quantity - 1 WHERE name = 'Máy thở ICU';
UPDATE products SET quantity = quantity - 3 WHERE name = 'Monitor đa thông số';
UPDATE products SET quantity = quantity - 3 WHERE name = 'Máy điện tim 12 cần';

-- Set some products to low stock for notification testing
UPDATE products SET quantity = 5 WHERE name = 'Máy khử rung tim';
UPDATE products SET quantity = 3 WHERE name = 'Bơm tiêm tự động';
UPDATE products SET quantity = 1 WHERE name = 'Máy xét nghiệm máu';
