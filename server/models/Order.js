const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shippingAddress: { 
    type: String, 
    required: true 
  },
  paymentMethod: { 
    type: String, 
    required: true 
  },
  items: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true,
        min: 1 
      }
    }
  ],
  total: { 
    type: Number, 
    required: true,
    min: 0 
  }
}, { timestamps: true });

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
