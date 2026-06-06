import Product from '../models/Product.js';

const memoryProducts = [
  {
    _id: 'demo-chair',
    name: 'Wooden Chair',
    category: 'Furniture',
    price: 2999,
    description: 'Modern wooden chair with a walnut finish.',
    createdAt: new Date()
  },
  {
    _id: 'demo-lamp',
    name: 'Desk Lamp',
    category: 'Lighting',
    price: 1199,
    description: 'Compact LED lamp for focused desk work.',
    createdAt: new Date()
  }
];

const isMongoConnected = () => Product.db.readyState === 1;

export const getProducts = async (req, res) => {
  try {
    if (!isMongoConnected()) {
      const search = req.query.search?.toLowerCase().trim();
      const products = search
        ? memoryProducts.filter((product) => product.name.toLowerCase().includes(search))
        : memoryProducts;
      return res.json(products);
    }

    const query = req.query.search
      ? { name: { $regex: req.query.search, $options: 'i' } }
      : {};
    const products = await Product.find(query).sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    if (!isMongoConnected()) {
      const product = memoryProducts.find((item) => item._id === req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json(product);
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;

    if (!name || !category || price === undefined || !description) {
      return res.status(400).json({ message: 'Name, category, price and description are required' });
    }

    const productData = {
      name,
      category,
      price: Number(price),
      description
    };

    if (!Number.isFinite(productData.price) || productData.price < 0) {
      return res.status(400).json({ message: 'Price must be a valid positive number' });
    }

    if (!isMongoConnected()) {
      const product = {
        _id: `demo-${Date.now()}`,
        ...productData,
        createdAt: new Date()
      };
      memoryProducts.unshift(product);
      return res.status(201).json(product);
    }

    const product = await Product.create(productData);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};
