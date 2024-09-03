const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const protect = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');
const { body, param, validationResult } = require('express-validator'); // Optional: Validation library

const router = express.Router();

const validateAddToCart = [
  body('productId').isMongoId().withMessage('Invalid product ID'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than 0'),
];

const validateRemoveFromCart = [
  body('productId').isMongoId().withMessage('Invalid product ID'),
];

router.post('/add', protect, validateAddToCart, asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await addToCart(req, res);
}));

router.get('/', protect, asyncHandler(async (req, res) => {
  await getCart(req, res);
}));

router.delete('/remove', protect, validateRemoveFromCart, asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await removeFromCart(req, res);
}));

module.exports = router;
