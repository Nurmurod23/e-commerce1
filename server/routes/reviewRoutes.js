const express = require('express');
const { 
  createReview, 
  getProductReviews 
} = require('../controllers/reviewController');
const protect = require('../middleware/authMiddleware');
const { body, param, validationResult } = require('express-validator');

const router = express.Router();

const validateReview = [
  body('product').isMongoId().withMessage('Invalid product ID'),
  body('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').isString().withMessage('Comment is required'),
];

const validateProductId = [
  param('productId').isMongoId().withMessage('Invalid product ID')
];

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', protect, validateReview, handleErrors, createReview);

router.get('/:productId', validateProductId, handleErrors, getProductReviews);

module.exports = router;
