import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/product_visualizer';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Product Visualization Dashboard API' });
});

app.use('/api/products', productRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.warn('API is running with temporary in-memory demo data.');
  });

const startServer = (port, attemptsLeft = 10) => {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && attemptsLeft > 0) {
      const nextPort = port + 1;
      console.warn(`Port ${port} is already in use. Trying port ${nextPort}...`);
      startServer(nextPort, attemptsLeft - 1);
      return;
    }

    throw error;
  });
};

startServer(PORT);
