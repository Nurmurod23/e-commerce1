const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    min: 0, 
  },
  description: {
    type: String,
    default: '', 
  },
  image: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Beauty'],
    default: 'Electronics', 
  },
  stock: {
    type: String,
    default: 0,
    min: 0, 
  },
}, { timestamps: true });

module.exports = mongoose.model('products', ProductSchema);
