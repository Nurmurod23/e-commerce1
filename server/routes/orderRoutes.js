const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const validateCreateOrder = [
  body('shippingAddress').isString().withMessage('Shipping address is required'),
  body('paymentMethod').isString().withMessage('Payment method is required'),
  body('items').isArray().withMessage('Items are required').notEmpty().withMessage('Items cannot be empty'),
  body('total').isFloat({ gt: 0 }).withMessage('Total must be a positive number')
];

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/create', protect, validateCreateOrder, handleErrors, createOrder);

router.get('/', protect, getOrders);

module.exports = router;
