const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
    min: 0, 
  },
  expiry: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

CouponSchema.index({ expiry: 1 }); 

module.exports = mongoose.model('coupons', CouponSchema);
