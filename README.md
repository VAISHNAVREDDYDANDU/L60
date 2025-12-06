# L60 - Generative AI Dashboard

A full-stack Single Page Application (SPA) showcasing recent innovations in Generative AI from the last 6 months.

## Project Overview

- **App Title**: L60
- **Database**: MongoDB
- **Backend**: Node.js/Express
- **Frontend**: React
- **Topic**: Recent innovations in Generative AI from the last 6 months

## Project Structure

```
L60-GenAI-Project/
├── l60-genai-backend/     # Node.js/Express backend
│   ├── middleware/         # Authentication middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── scripts/           # Database seeding scripts
│   └── server.js          # Main server file
└── l60-genai-frontend/    # React frontend
    ├── src/
    │   ├── components/    # React components
    │   ├── context/       # React context (Auth)
    │   ├── services/      # API services
    │   └── App.js         # Main app component
    └── public/            # Static files
```

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)
- NGINX or Apache (for production deployment)

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

3. Create a `.env` file (optional, defaults are provided):
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. Seed the database with chart data:
   ```bash
   node scripts/seedData.js
   ```

5. Start the backend server:
   ```bash
   npm start
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

3. Create a `.env` file (optional):
   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The frontend application will be available at http://localhost:4200

## Authentication

- **Username**: Lakshmi
- **Password**: Lakshmi

Credentials are hardcoded in the backend for testing purposes.

## Features

- **Login Page**: JWT-based authentication
- **Dashboard**: 200-word summary of Generative AI innovations with source reference
- **Summary Page**: Dynamic charts showing AI adoption and industry implementation
- **Reports Page**: Dynamic charts showing market growth and use case distribution
- **Top Menu**: Navigation with Dashboard, Summary, Reports, and Logout
- **Protected Routes**: All pages except login require authentication
- **Accessibility**: WCAG 2.1 compliant with ARIA labels and keyboard navigation

## Building for Production

### Frontend

```bash
cd l60-genai-frontend
npm run build
```

The built files will be available in `l60-genai-frontend/build`

### Backend

The backend runs directly with Node.js:
```bash
cd l60-genai-backend
npm start
```

## Deployment

### Server Configuration

1. **Backend**: Runs on port 3000
2. **Frontend**: Served via NGINX/Apache on port 80

### NGINX Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/l60-genai-frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
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

## Source Reference

The dashboard content is based on:
- [Intel AI Use Cases](https://www.intel.com/content/www/us/en/learn/ai-use-cases.html)
- [Deloitte AI Agents in Collaborative Automation](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/articles/ai-agents-in-collaborative-automation.html)

## License

ISC

## Author

Lakshmi Vaishnav Reddy Dandu (Student ID: 801411660)

