# Quick Start Guide - L60 Generative AI Dashboard

## Initial Setup

### 1. Backend Setup

```bash
cd l60-genai-backend
npm install
npm run seed  # Seed the database with chart data
npm start     # Starts on port 3000
```

### 2. Frontend Setup

```bash
cd l60-genai-frontend
npm install
npm start     # Starts on port 3000 (will prompt to use different port)
```

## Login Credentials

- **Username**: Lakshmi
- **Password**: Lakshmi

## Testing the Application

1. Start the backend server (port 3000)
2. Start the frontend server (default port 3000, will use 3001)
3. Navigate to http://localhost:3001 (or the port shown)
4. Login with credentials above
5. Explore Dashboard, Summary, and Reports pages

## Production Build

### Frontend Build

```bash
cd l60-genai-frontend
npm run build
```

Output will be in `l60-genai-frontend/build/`

### Backend

The backend runs directly with Node.js - no build step needed.

## Deployment Checklist

- [ ] Backend running on port 3000
- [ ] Frontend built and served via NGINX/Apache on port 80
- [ ] MongoDB connection configured
- [ ] Database seeded with chart data
- [ ] Environment variables set (if needed)
- [ ] JWT secret key configured (currently hardcoded for demo)

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure port 3000 is available
- Check for missing dependencies: `npm install`

### Frontend can't connect to backend
- Verify backend is running on port 3000
- Check CORS settings in backend
- Verify API_URL in frontend environment variables

### Charts not displaying
- Ensure database is seeded: `npm run seed` in backend
- Check browser console for errors
- Verify JWT token is being sent in requests

### Authentication issues
- Clear browser localStorage
- Check JWT token expiration (2 hours)
- Verify credentials match backend (Lakshmi/Lakshmi)

