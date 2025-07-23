# Hệ Thống Quản Lý Thiết Bị Y Tế

> **Kiến Trúc Tách Biệt**: Frontend (Next.js) + Backend (Express.js) + Database (PostgreSQL)

## 🏗️ Cấu Trúc Dự Án

```
medical-device/
├── frontend/          # Ứng dụng Frontend Next.js (Cổng 3000)
│   ├── src/app/      # Trang và component Next.js App Router
│   ├── public/       # Tài nguyên tĩnh
│   └── package.json  # Dependencies frontend
├── backend/           # API Backend Express.js (Cổng 8000)
│   ├── src/
│   │   ├── routes/   # Các endpoint API
│   │   ├── config/   # Cấu hình database và ứng dụng
│   │   └── utils/    # Các hàm tiện ích
│   └── server.js     # Điểm khởi đầu server Express
├── init-db/          # Script khởi tạo database
└── docker-compose.yml # Điều phối đa dịch vụ
```

## 🚀 Bắt Đầu Nhanh

### Yêu Cầu Tiên Quyết
- Docker & Docker Compose
- Node.js 18+ (cho phát triển local)

### Phương án 1: Docker Compose (Khuyến nghị)
```bash
# Khởi động tất cả dịch vụ
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng dịch vụ
docker-compose down
```

### Phương án 2: Phát Triển Local
```bash
# Chỉ khởi động database
docker-compose up postgres -d

# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

## 🌐 URL Các Dịch Vụ

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Kiểm tra API**: http://localhost:8000/health
- **Quản trị Database**: http://localhost:5050
- **Database**: localhost:5432

## 📡 Các Endpoint API

| Endpoint | Phương thức | Mô tả |
|----------|---------|-------------|
| `/api` | GET | Thông tin API |
| `/api/users` | GET, POST | Quản lý người dùng |
| `/api/customers` | GET, POST | Quản lý khách hàng |
| `/api/products` | GET, POST | Quản lý sản phẩm |
| `/api/transactions` | GET | Lịch sử giao dịch |
| `/api/notifications` | GET | Hệ thống thông báo |
| `/api/maintenances` | GET | Lập lịch bảo trì |

## 🔧 Biến Môi Trường

Sao chép `.env.example` thành `.env` và cấu hình:

```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=medical_device
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123

# URL Dịch vụ
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🏗️ Lợi Ích Kiến Trúc

- **🔄 Tách Biệt Mối Quan Tâm**: Tách biệt hoàn toàn frontend/backend
- **📈 Mở Rộng Độc Lập**: Mở rộng từng dịch vụ riêng biệt
- **🛠️ Linh Hoạt Công Nghệ**: Các tech stack khác nhau cho mỗi dịch vụ
- **👥 Hợp Tác Nhóm**: Quy trình phát triển song song
- **🚀 Linh Hoạt Triển Khai**: Triển khai đến các môi trường khác nhau

## 📝 Quy Trình Phát Triển

1. **Phát triển Backend**: Tiếp cận API-first
2. **Phát triển Frontend**: Sử dụng backend APIs
3. **Thay đổi Database**: Cập nhật script init-db
4. **Kiểm thử**: Kiểm thử từng dịch vụ độc lập

## 🚢 Triển Khai

### Build Docker Production
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Triển Khai Dịch Vụ Riêng Biệt
```bash
# Frontend
cd frontend && npm run build && npm start

# Backend
cd backend && npm start
```

## 📚 Tech Stack

### Frontend
- **Next.js 15.4.3** - React framework
- **Material-UI** - Thư viện component
- **Axios** - HTTP client
- **React Hot Toast** - Thông báo

### Backend
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **CORS** - Chia sẻ tài nguyên cross-origin
- **Morgan** - HTTP request logger

### Hạ Tầng
- **Docker** - Containerization
- **Docker Compose** - Điều phối multi-container
- **pgAdmin** - Quản trị database

## 🤝 Đóng Góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/tinh-nang-tuyet-voi`)
3. Commit thay đổi (`git commit -m 'Thêm tính năng tuyệt vời'`)
4. Push lên branch (`git push origin feature/tinh-nang-tuyet-voi`)
5. Mở Pull Request

## 📄 Giấy Phép

Dự án này được cấp phép theo MIT License.
