const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

exports.getDashboard = async (req, res) => {
  try {
    const [products, users, orders] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments(),
      Order.countDocuments()
    ]);
    res.json({ products, users, orders });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.manageProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.manageUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.manageOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
