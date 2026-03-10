# V-Mas - Smart Vehicle Service Management System

A modern, premium frontend application for fleet and vehicle management built with React and JavaScript.

![V-Mas Dashboard](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-7.3-purple)

## 🚀 Features

### Core Modules
- ✅ **Dashboard** - Real-time fleet statistics with charts and alerts
- ✅ **Vehicle Management** - Complete vehicle lifecycle tracking
- ✅ **Service Tracking** - Maintenance history and scheduling
- ✅ **Driver Management** - Driver profiles and assignments
- ✅ **Fuel Analysis** - Consumption monitoring and efficiency tracking
- ✅ **Reports** - Data analytics and export functionality
- ✅ **Authentication** - Secure login and role-based access

### Design Highlights
- 🎨 Modern dark theme with glassmorphism effects
- 📊 Interactive data visualization with Recharts
- 📱 Fully responsive (Desktop, Tablet, Mobile)
- ⚡ Smooth animations and transitions
- 🎯 Premium gradient-based color palette

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Recharts** - Data visualization
- **React Icons** - Icon library
- **date-fns** - Date utilities
- **Vanilla CSS** - Custom design system
  

## ✅ **Live Demo** - **http://localhost:5173**

  

## 📦 Installation

```bash
# Clone the repository
cd v-mas-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```


## 🏗️ Project Structure

```
v-mas-frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Sidebar, TopBar)
│   │   ├── common/          # Reusable components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   └── vehicles/        # Vehicle components
│   ├── pages/
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── vehicles/        # Vehicle management pages
│   │   ├── service/         # Service tracking pages
│   │   ├── drivers/         # Driver management pages
│   │   ├── fuel/            # Fuel analysis pages
│   │   ├── reports/         # Reports pages
│   │   └── auth/            # Authentication pages
│   ├── App.jsx              # Root component
│   ├── index.css            # Design system & global styles
│   └── main.jsx             # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Design System

### Color Palette
- **Primary**: Blues (#3b82f6, #2563eb)
- **Accents**: Violet, Green, Orange, Red
- **Dark Theme**: #0a0e1a (background), #131829 (surface)

### Typography
- **Headings**: Outfit (bold, display)
- **Body**: Inter (clean, modern)

### Gradients
```css
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-ocean: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
--gradient-forest: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
```

## 🚦 Getting Started

1. **Development Mode**
```bash
npm run dev
```

2. **Production Build**
```bash
npm run build
npm run preview
```

## 🔌 Backend Integration

This frontend is designed to work with a Spring Boot backend API. Key integration points:

- Vehicle CRUD operations
- Service record management
- Driver assignment
- Fuel tracking
- Report generation
- Authentication (JWT)

## 📋 Features by Module

### Dashboard
- Real-time statistics (Vehicles, Services, Alerts, Costs)
- Fuel cost trend line chart
- Vehicle status pie chart
- Priority-based alert system
- Quick action buttons

### Vehicle Management
- Vehicle list with search/filters
- Detailed vehicle view
- Add/Edit/Delete operations
- Document management (Insurance, License)
- Service history table

### Service Tracking
- Service history log
- Scheduled maintenance
- Cost tracking
- Garage/parts information

### Driver Management
- Driver profiles
- License tracking
- Vehicle assignments
- Performance metrics

### Fuel Analysis
- Fuel consumption tracking
- Efficiency calculations (km/L)
- Cost analysis
- Trend visualization

### Reports & Analytics
- Custom reports
- Date range selection
- Export to PDF/Excel
- Data insights

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🔐 Authentication

The app includes login/register pages with:
- Form validation
- Role-based access (Admin, Driver, Controller)
- Secure routing
- Session management

## 🚀 Deployment

Build the production-ready application:

```bash
npm run build
```

The optimized files will be in the `dist/` folder, ready for deployment to:
- AWS S3 + CloudFront
- Netlify
- Vercel
- Any static hosting service


