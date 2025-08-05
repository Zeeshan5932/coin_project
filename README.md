# PayPal Clone

A complete PayPal clone application with React.js frontend and Node.js/Express backend, featuring Firebase Firestore database, real-time transaction processing, loading states, and notifications.

## ✨ Features

- 👥 **User Authentication** - Login and signup with JWT tokens
- 🔥 **Firebase Integration** - Persistent data storage with Firestore
- 💰 View account balance with real-time updates
- 💸 Send money with processing animations
- 💳 **Request Money** - Send payment requests to other users
- 📥 **Payment Requests Management** - View and pay incoming requests
- 📱 View transaction history
- 🎨 Responsive design with PayPal-inspired UI
- 🔔 Real-time notifications and success messages
- ⚡ Loading states and smooth animations
- 🎯 One-command setup and run
- 🛡️ Secure authentication with password hashing
- 📊 Persistent data storage in Firebase Firestore
A complete PayPal clone application with React.js frontend and Node.js/Express backend, featuring real-time transaction processing, loading states, and notifications.

## ✨ Features

- � **User Authentication** - Login and signup with JWT tokens
- �💰 View account balance with real-time updates
- 💸 Send money with processing animations
- 💳 **Request Money** - Send payment requests to other users
- 📥 **Payment Requests Management** - View and pay incoming requests
- 📱 View transaction history
- 🎨 Responsive design with PayPal-inspired UI
- 🔔 Real-time notifications and success messages
- ⚡ Loading states and smooth animations
- 🎯 One-command setup and run
- 🛡️ Secure authentication with password hashing

## 🚀 Quick Start (Recommended)

### ⚠️ Prerequisites
1. **Firebase Setup Required** - See [Firebase Setup Guide](FIREBASE_SETUP.md)
2. Node.js 16+ installed
3. npm or yarn package manager

### Method 1: One Command Setup & Run
```bash
# 1. Setup Firebase first (see FIREBASE_SETUP.md)
# 2. Setup everything
.\setup-all.bat

# 3. Start both servers
.\start-all.bat
```

### Method 2: Using npm scripts
```bash
# 1. Setup Firebase first (see FIREBASE_SETUP.md)
# 2. Install all dependencies
npm run install:all

# 3. Start both frontend and backend
npm start
```

## 📁 Project Structure

```
paypal-clone/
├── package.json              # Root package with scripts
├── setup-all.bat            # One-click setup
├── start-all.bat            # One-click start
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.jsx
│       ├── App.jsx
│       └── components/
│           ├── Balance.jsx           # Balance display with action buttons
│           ├── SendForm.jsx          # Enhanced send form with loading
│           ├── Transactions.jsx      # Transaction history
│           ├── Notification.jsx      # Global notification system
│           ├── LoginForm.jsx         # User login form
│           ├── SignupForm.jsx        # User registration form
│           ├── RequestForm.jsx       # Request money form
│           └── PaymentRequests.jsx   # Manage payment requests
└── backend/
    ├── package.json
    └── index.js                      # API with processing simulation
```

## 🛠️ Manual Setup (Alternative)

### Prerequisites
- Node.js (v14 or higher)
- npm

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup (in new terminal)
```bash
cd frontend
npm install
npm start
```

## 🎯 Available Scripts

From the root directory:

```bash
npm start              # Start both frontend and backend
npm run start:backend  # Start only backend
npm run start:frontend # Start only frontend
npm run install:all    # Install all dependencies
npm run dev           # Start in development mode
```

## 🌟 Enhanced Features Added

### 1. **Loading States & Processing Animation**
- Shows "Processing..." with spinner during money transfer
- Button becomes disabled during processing
- Form fields disabled during processing
- Simulated 1-3 second processing time

### 2. **Smart Notifications**
- Success notifications with checkmark icon
- Error notifications with warning icon
- Processing notifications with spinning loader
- Auto-dismiss after 5 seconds
- Global notification system

### 3. **Interactive Balance Component**
- Working "Send" button that focuses send form
- "Request" button with coming soon notification
- "Add Money" button with placeholder functionality

### 4. **🔐 Authentication System:**
- JWT-based login and signup
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- Automatic token management
- Demo account available for testing

### 5. **💳 Request Money Feature:**
- Send payment requests to any email
- View received and sent requests
- Pay requests with one click
- Real-time request status updates
- Request notifications and management

### 6. **🎯 Enhanced User Experience:**
- Form validation with helpful error messages
- Smooth scrolling to send form when clicking Send button
- Real-time balance updates
- Transaction history auto-refresh

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/health

## 📱 How to Use

1. **Start the application** using any method above
2. **Create an account** or login with demo account:
   - Email: `john.doe@email.com`
   - Password: `password`
3. **Navigate between features** using the tabs:
   - **Send Money**: Transfer money to other users
   - **Request Money**: Ask for payment from others
   - **Payment Requests**: Manage incoming/outgoing requests
4. **Send money**:
   - Enter recipient email and amount
   - Add description (optional)
   - Watch processing animation
   - See success notification
5. **Request money**:
   - Enter email of person to request from
   - Enter amount and description
   - Send request notification
6. **Pay requests**:
   - View received requests
   - Click "Pay" to process payment
   - See updated balance and transaction history

## 🔧 API Endpoints

### Authentication
- `POST /signup` - Create new user account
- `POST /login` - User login

### Transactions  
- `GET /transactions` - Get user's transactions
- `GET /balance` - Get user balance  
- `POST /send` - Send money (with processing simulation)
- `GET /transactions/:id` - Get specific transaction

### Payment Requests
- `POST /request` - Send payment request
- `GET /requests/received` - Get received payment requests
- `GET /requests/sent` - Get sent payment requests
- `POST /requests/:id/pay` - Pay a specific request

### System
- `GET /` - API information and available endpoints
- `GET /health` - Health check## 🎨 Technologies Used

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling and responsive design
- **Axios** - HTTP client for API calls

### Backend  
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Firebase Firestore** - NoSQL database for persistent storage
- **Firebase Admin SDK** - Server-side Firebase integration
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique transaction IDs

### Development Tools
- **Concurrently** - Run multiple commands simultaneously
- **Nodemon** - Auto-restart backend on changes
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variable management

## 🏗️ What's New in This Version

✅ **Firebase Firestore Integration**  
✅ **Persistent Data Storage**  
✅ **Complete Authentication System**  
✅ **Request Money Feature**  
✅ **Payment Requests Management**  
✅ **Enhanced send money process with loading states**  
✅ **Global notification system**  
✅ **Interactive balance component buttons**  
✅ **One-command setup and run scripts**  
✅ **Processing simulation (1-3 seconds)**  
✅ **Improved error handling and user feedback**  
✅ **Smooth animations and transitions**  
✅ **JWT-based authentication with secure password hashing**  
✅ **Multi-tab interface for different features**  
✅ **Real-time request notifications**  

## 🚧 Future Enhancements

- User authentication and authorization
- Database integration (MongoDB/PostgreSQL)
- Email notifications for transactions
- Payment method integration
- User profiles and settings
- Transaction search and filtering
- Mobile app version
- Real-time websocket notifications

## 📝 License

MIT License

---

**Happy coding!** 🎉 Your PayPal clone now has professional-grade loading states, notifications, and an easy one-command setup!
#   c o i n _ p r o j e c t  
 