# Product Visualization Dashboard

MERN stack assessment project with product CRUD basics and a Three.js product detail preview.

## Features

- Product listing from `/api/products`
- Product search by name
- Add product form using the backend API
- Product detail page
- Responsive Three.js scene with lighting, rotation, OrbitControls and texture mapping

## Run Locally

Backend:

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the API at `http://localhost:5001/api`. Set `VITE_API_URL` if the backend runs elsewhere.

MongoDB is configured through `MONGO_URI`. If MongoDB is not running locally, the API stays usable with temporary demo data so the UI can still be reviewed.
