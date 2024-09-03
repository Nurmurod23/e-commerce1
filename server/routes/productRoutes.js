const express = require('express');
const { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { body, param, validationResult } = require('express-validator');

const router = express.Router();

const validateProduct = [
  body('name').isString().withMessage('Name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('image').optional().isString().withMessage('Image must be a string'),
  body('category').optional().isString().withMessage('Category must be a string'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
];

const validateProductId = [
  param('id').isMongoId().withMessage('Invalid product ID')
];

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', protect, admin, validateProduct, handleErrors, createProduct);

router.get('/', getProducts);

router.get('/:id', validateProductId, handleErrors, getProductById);

router.put('/:id', protect, admin, validateProduct, validateProductId, handleErrors, updateProduct);

router.delete('/:id', protect, admin, validateProductId, handleErrors, deleteProduct);

module.exports = router;
