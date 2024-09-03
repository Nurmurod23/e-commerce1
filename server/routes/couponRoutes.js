const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { createCoupon, getCoupons, deleteCoupon } = require('../controllers/couponController');
const { body, param, validationResult } = require('express-validator');

// Validation middleware
const validateCreateCoupon = [
  body('code').isString().withMessage('Code is required'),
  body('discount').isFloat({ gt: 0 }).withMessage('Discount must be a positive number'),
  body('expiryDate').isISO8601().withMessage('Expiry date must be a valid date')
];

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
router.post('/', protect, admin, validateCreateCoupon, handleErrors, createCoupon);
router.get('/', getCoupons);
router.delete('/:id', protect, admin, param('id').isMongoId().withMessage('Invalid coupon ID'), handleErrors, deleteCoupon);

module.exports = router;
