# PayPal Clone Frontend

A modern, responsive PayPal-like payment interface built with React.

## Features

### 🔍 Smart Recipient Search
- **Auto-suggestion dropdown** with user avatars and details
- **Keyboard navigation** support (Arrow keys, Enter, Escape)
- **Real-time filtering** as you type
- **Click or keyboard selection** of recipients

### 💰 Amount Input
- **Currency-aware formatting** with Euro (€) symbol
- **Real-time amount validation** and formatting
- **Clean, PayPal-style design** with proper spacing

### 🚀 Send Button
- **Prominent blue design** matching PayPal's style
- **Hover effects** and smooth transitions
- **Form validation** before submission

### ⏳ Loading Spinner
- **Clean loading animation** during transaction processing
- **Centered design** with processing message
- **Simulated 3-second processing time**

### ✅ Success Confirmation
- **Animated green checkmark** with smooth SVG animations
- **Transaction details display** showing amount and recipient
- **Action buttons** for sending more money or returning home
- **Professional confirmation message**

### 📱 Responsive Design
- **Mobile-first approach** with proper breakpoints
- **Touch-friendly interface** for mobile devices
- **Flexbox and Grid layouts** for optimal viewing
- **Media queries** for different screen sizes

## Technologies Used

- **React 18** - Modern React with hooks
- **CSS3** - Custom animations and responsive design
- **SVG animations** - Smooth checkmark animation
- **ES6+** - Modern JavaScript features

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd paypal-clone/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Or use the provided batch file (Windows):
```bash
../run-frontend.bat
```

The application will open at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── PaymentForm.js      # Main payment form with search
│   │   ├── LoadingSpinner.js   # Loading animation
│   │   └── SuccessScreen.js    # Success confirmation
│   ├── App.js                  # Main app component
│   ├── App.css                 # Main styles
│   ├── index.js               # App entry point
│   └── index.css              # Global styles
└── package.json
```

## Features in Detail

### PaymentForm Component
- Recipient search with auto-suggestions
- Amount input with currency formatting
- Form validation and submission
- "More ways to send money" section

### LoadingSpinner Component
- Animated loading spinner
- Processing message
- Consistent header design

### SuccessScreen Component
- Animated success checkmark
- Transaction confirmation details
- Action buttons for next steps

## Styling

The application uses custom CSS with:
- **PayPal-inspired color scheme** (#0070ba primary blue)
- **Smooth animations** and transitions
- **Responsive grid layouts**
- **Professional typography** (Segoe UI font stack)
- **Accessible design** with proper contrast ratios

## Mock Data

The application includes mock user data for demonstration:
- @gabrielebrezins
- @lorensa.dentals
- @richardai
- And more...

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for educational purposes only.
