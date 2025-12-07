# L60 - Generative AI Project

This is a full-stack application with a React frontend and Node.js backend for managing Generative AI statistics and analytics.

https://l60-uxmo.vercel.app/login

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

## Project Structure

```
./
├── l60-genai-frontend/  # React frontend application
└── l60-genai-backend/   # Node.js backend server
```

## Setup & Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd l60-genai-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```



4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend server will start running on http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd l60-genai-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will be available at http://localhost:3001

## Development

- Frontend changes can be made in the `l60-genai-frontend/src` directory
- Backend changes can be made in the `l60-genai-backend` directory
- The application will automatically reload when you make changes

## Building for Production

### Frontend
```bash
cd l60-genai-frontend
npm run build
```

The built files will be available in `l60-genai-frontend/build`

### Backend
```bash
cd l60-genai-backend
npm start
```

## API Endpoints

- `POST /api/auth/login` - User authentication
- `GET /api/summary` - Get summary chart data (requires authentication)
- `GET /api/reports` - Get reports chart data (requires authentication)

## Technologies Used

- **Frontend**: React 18, React Router, D3.js, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Authentication**: JSON Web Tokens (JWT)
- **Charts**: D3.js
- **Styling**: CSS3 with responsive design
