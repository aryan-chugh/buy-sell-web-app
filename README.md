# 🛍️ Campus Buy Sell Marketplace

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen.svg)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC.svg)](https://tailwindcss.com/)

## 📖 Overview

Campus Buy Sell is a comprehensive online marketplace designed exclusively for the IIIT campus community. It provides a secure platform for students to buy, sell, and exchange goods within the campus ecosystem, featuring advanced search capabilities, AI-powered chatbot assistance, and robust user management.

## ✨ Key Features

### 🛒 Core Marketplace Features
- **Product Listings**: Create, manage, and browse product listings with detailed specifications
- **Advanced Search**: Multi-criteria search with filters for categories, price range, and availability
- **Shopping Cart**: Add items to cart and manage purchases seamlessly
- **Order Management**: Track orders with separate dashboards for buyers and sellers
- **Reviews & Ratings**: Comprehensive review system with star ratings and detailed feedback

### � Authentication & Security
- **IIIT Email Validation**: Restricted access to `@students.iiit.ac.in` and `@research.iiit.ac.in` domains
- **JWT Authentication**: Secure token-based authentication system
- **Password Encryption**: BCrypt hashing for password security
- **Input Validation**: Comprehensive server-side validation for all user inputs

### 🤖 AI-Powered Features
- **Intelligent Chatbot**: Google Gemini AI integration for customer support and product recommendations
- **Contextual Conversations**: Maintains chat history for personalized interactions

### 📊 Dashboard & Analytics
- **User Profiles**: Comprehensive profile management with contact information and preferences
- **Seller Dashboard**: Track sales performance, inventory, and customer feedback
- **Order Tracking**: Real-time order status updates for both buyers and sellers

### 🖼️ Media Management
- **Image Upload**: Cloudinary integration for product image management
- **Responsive Design**: Mobile-first approach with TailwindCSS styling

## 🏗️ Architecture

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
│   ├── Chatbot.js      # AI chatbot interface
│   ├── DashboardBody.js # Main dashboard layout
│   ├── PrivateRoutes.js # Route protection
│   ├── SideBar.js      # Navigation sidebar
│   └── search/         # Search-related components
├── pages/              # Main application pages
│   ├── Dashboard.js    # User dashboard
│   ├── ItemPage.js     # Product detail page
│   ├── LoginPage.js    # Authentication
│   ├── MyCart.js       # Shopping cart
│   ├── Profile.js      # User profile
│   ├── Search.js       # Search interface
│   └── SellItem.js     # Product listing form
└── App.js              # Main application router
```

### Backend Architecture
```
backend/
├── controllers/        # Business logic handlers
│   ├── authController.js
│   ├── chatbotController.js
│   ├── itemController.js
│   └── orderController.js
├── models/            # MongoDB schemas
│   ├── userModel.js   # User data structure
│   ├── itemModel.js   # Product data structure
│   └── reviewModel.js # Review system
├── routes/            # API endpoint definitions
├── middleware/        # Authentication & validation
└── config/           # Database configuration
```

## �️ Technology Stack

### Frontend Technologies
- **React 19.0.0**: Modern JavaScript framework with hooks and context
- **React Router DOM**: Client-side routing and navigation
- **TailwindCSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Modern icon library
- **React Hot Toast**: Beautiful toast notifications
- **Axios**: HTTP client for API communication

### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: ODM for MongoDB with schema validation
- **JWT**: JSON Web Tokens for authentication
- **BCrypt**: Password hashing and security

### AI & Third-Party Services
- **Google Generative AI**: Gemini 1.5 Flash model for chatbot
- **Cloudinary**: Image hosting and management
- **Multer**: File upload middleware
- **CORS**: Cross-origin resource sharing

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google AI API key
- Cloudinary account

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# GOOGLE_API_KEY=your_google_ai_api_key
# CLOUDINARY_CLOUD_NAME=your_cloudinary_name
# CLOUDINARY_API_KEY=your_cloudinary_key
# CLOUDINARY_API_SECRET=your_cloudinary_secret

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/campus-marketplace
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_API_KEY=your-google-ai-api-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
PORT=4000
```

## 📱 Usage

### For Buyers
1. **Register/Login**: Use your IIIT email to create an account
2. **Browse Products**: Use the search functionality to find items
3. **Add to Cart**: Add desired items to your shopping cart
4. **Place Orders**: Complete purchases through the checkout process
5. **Track Orders**: Monitor order status in your buyer dashboard
6. **Leave Reviews**: Rate and review purchased items

### For Sellers
1. **List Products**: Create detailed product listings with images
2. **Manage Inventory**: Track and update product availability
3. **Process Orders**: Handle incoming orders through seller dashboard
4. **Customer Support**: Use the AI chatbot to assist customers
5. **Analytics**: Monitor sales performance and customer feedback

### AI Chatbot Features
- **Product Recommendations**: Get personalized product suggestions
- **Customer Support**: Instant answers to common questions
- **Order Assistance**: Help with order tracking and issues
- **Platform Guidance**: Navigate the marketplace features

## 🔧 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

### Products
- `GET /search` - Search products
- `GET /item/:id` - Get product details
- `POST /list` - Create new listing
- `PUT /item/:id` - Update listing
- `DELETE /item/:id` - Delete listing

### Orders & Cart
- `GET /mycart` - Get user's cart
- `POST /mycart` - Add item to cart
- `GET /orders` - Get user's orders
- `POST /orders` - Create new order

### Reviews
- `GET /reviews/:itemId` - Get item reviews
- `POST /reviews` - Add review
- `PUT /reviews/:id` - Update review

### Chatbot
- `POST /chatbot` - Send message to AI assistant

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start production server
cd ../backend
npm start
```

### Environment Setup
- Configure production MongoDB URI
- Set up environment variables for production
- Configure CORS for production domain
- Set up SSL/TLS certificates

## 📊 Database Schema

### User Model
```javascript
{
  first_name: String,
  last_name: String,
  email: String, // IIIT domain validation
  dob: Date,
  contact: String,
  password: String, // Hashed
  reviews: [ObjectId], // References to reviews
  created_at: Date,
  updated_at: Date
}
```

### Item Model
```javascript
{
  name: String,
  price: Number,
  description: String,
  key_details: [String],
  sizes: [String],
  discount: {
    percentage: Number,
    valid_until: Date
  },
  images: [String], // Cloudinary URLs
  seller: ObjectId, // Reference to User
  category: String,
  status: String, // available, sold, pending
  created_at: Date
}
```

### Review Model
```javascript
{
  rating: Number, // 1-5 stars
  comment: String,
  reviewer: ObjectId, // Reference to User
  item: ObjectId, // Reference to Item
  created_at: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

