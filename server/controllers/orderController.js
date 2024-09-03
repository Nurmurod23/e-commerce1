const Order = require('../models/Order');
const Cart = require('../models/Cart');
const asyncHandler = require('express-async-handler');

const { body, validationResult } = require('express-validator');

exports.createOrder = asyncHandler(async (req, res) => {
  await body('shippingAddress').isObject().withMessage('Shipping address must be an object').run(req);
  await body('shippingAddress.address').notEmpty().withMessage('Address is required').run(req);
  await body('shippingAddress.city').notEmpty().withMessage('City is required').run(req);
  await body('shippingAddress.postalCode').notEmpty().withMessage('Postal code is required').run(req);
  await body('shippingAddress.country').notEmpty().withMessage('Country is required').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { shippingAddress, paymentMethod, items, total } = req.body;

  if (!total) {
    return res.status(400).json({ message: 'Total is required' });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Items are required' });
  }

  const order = new Order({
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    items,
    total,
  });

  await order.save();
  res.status(201).json(order);
});


exports.getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product') 
      .lean(); 
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});