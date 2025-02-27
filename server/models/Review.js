const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, 
    max: 5, 
  },
  comment: {
    type: String,
    default: '', 
  },
}, { timestamps: true });

ReviewSchema.index({ product: 1 });
ReviewSchema.index({ user: 1 });

module.exports = mongoose.model('reviews', ReviewSchema);
