# BizTrack

BizTrack is a full-stack MERN business finance management application that helps small business owners manage multiple businesses, track income and expenses, visualize financial performance, and export reports.

## Features

* User authentication (Register & Login)
* JWT-based authentication and protected routes
* Create and manage multiple businesses
* Add, edit, view, and delete financial transactions
* Income and expense tracking
* Financial summary dashboard
* Interactive finance charts
* Search and filter transactions
* Export reports to CSV and PDF
* Responsive user interface with Tailwind CSS
* Sidebar navigation for easy access to major features

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* Axios
* React Toastify
* Chart.js
* jsPDF
* PapaParse

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd BizTrack
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file containing:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file containing:

```env
VITE_API_URL=http://localhost:5000/api
```

## Deployment

* Backend: Render
* Frontend: Vercel
* Database: MongoDB Atlas

## Future Improvements

* Business management page
* Financial reports dashboard
* Settings page
* Monthly budgeting
* Receipt image uploads
* Email notifications
* Business analytics
* Dark mode


