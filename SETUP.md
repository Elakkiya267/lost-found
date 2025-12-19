# Lost & Found MERN Application Setup

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

## Installation Steps

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Environment Configuration
Create a `.env` file in the backend directory with:
```
MONGODB_URI=mongodb://localhost:27017/lostfound
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### 4. Create Upload Directory
```bash
cd backend
mkdir uploads
```

### 5. Start the Application

#### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

## Features Completed

### Modern UI Components
- ✅ Responsive design with Tailwind CSS
- ✅ Modern login/signup forms with validation
- ✅ Card-based item listings
- ✅ Professional navigation bar
- ✅ Toast notifications for user feedback
- ✅ Image upload with preview
- ✅ Search functionality
- ✅ Admin dashboard with statistics
- ✅ Mobile-responsive design

### Backend Features
- ✅ User authentication (JWT)
- ✅ File upload handling
- ✅ Lost/Found item management
- ✅ Admin approval system
- ✅ Item matching system
- ✅ CORS configuration

### Frontend Features
- ✅ React Router for navigation
- ✅ Axios for API calls
- ✅ Form validation
- ✅ Image preview
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design

## Default Admin Account
After running the backend, you can create an admin account by signing up with role "admin".

## API Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/lost` - Get all lost items
- `POST /api/lost/report` - Report lost item
- `PUT /api/lost/:id/approve` - Approve lost item (admin)
- `PUT /api/lost/:id/collected` - Mark as collected
- `GET /api/found` - Get all found items
- `POST /api/found/report` - Report found item
- `PUT /api/found/:id/approve` - Approve found item (admin)

## Technologies Used
- **Frontend**: React, Tailwind CSS, React Router, Axios, Lucide Icons
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Multer
- **UI/UX**: Modern card-based design, responsive layout, toast notifications