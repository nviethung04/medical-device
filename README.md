# Medical Devices Management System

> **Separated Architecture**: Frontend (Next.js) + Backend (Express.js) + Database (PostgreSQL)

## 🏗️ Project Structure

```
medical-device/
├── frontend/          # Next.js Frontend Application (Port 3000)
│   ├── src/app/      # Next.js App Router pages & components
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── backend/           # Express.js Backend API (Port 8000)
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   ├── config/   # Database & app configuration
│   │   └── utils/    # Utility functions
│   └── server.js     # Express server entry point
├── init-db/          # Database initialization scripts
└── docker-compose.yml # Multi-service orchestration
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)

### Option 1: Docker Compose (Recommended)
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 2: Local Development
```bash
# Start database only
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

## 🌐 Service URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **API Health**: http://localhost:8000/health
- **Database Admin**: http://localhost:5050
- **Database**: localhost:5432

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/api` | GET | API information |
| `/api/users` | GET, POST | User management |
| `/api/customers` | GET, POST | Customer management |
| `/api/products` | GET, POST | Product management |
| `/api/transactions` | GET | Transaction history |
| `/api/notifications` | GET | Notification system |
| `/api/maintenances` | GET | Maintenance scheduling |

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=medical_device
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123

# Service URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🏗️ Architecture Benefits

- **🔄 Separation of Concerns**: Complete frontend/backend separation
- **📈 Independent Scaling**: Scale services individually
- **🛠️ Technology Flexibility**: Different tech stacks per service
- **👥 Team Collaboration**: Parallel development workflows
- **🚀 Deployment Flexibility**: Deploy to different environments

## 📝 Development Workflow

1. **Backend Development**: API-first approach
2. **Frontend Development**: Consume backend APIs
3. **Database Changes**: Update init-db scripts
4. **Testing**: Test each service independently

## 🚢 Deployment

### Production Docker Build
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Individual Service Deployment
```bash
# Frontend
cd frontend && npm run build && npm start

# Backend
cd backend && npm start
```

## 📚 Tech Stack

### Frontend
- **Next.js 15.4.3** - React framework
- **Material-UI** - Component library
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **pgAdmin** - Database administration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.
