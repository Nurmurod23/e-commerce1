const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    if (price <= 0) {
      return res.status(400).json({ message: 'Price must be a positive number' });
    }

    const product = new Product({
      name,
      price,
      description,
      category,
      stock: stock || 0, 
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product: ' + err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products: ' + err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving product: ' + err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, stock },
      { new: true, runValidators: true }
    ).lean();

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product: ' + err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id).lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product: ' + err.message });
  }
};
