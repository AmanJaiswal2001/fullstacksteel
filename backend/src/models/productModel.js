const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },

  type: {
    type: String,
    required: true,
    enum: [
      'hotrolledsheet',
      'hotrolledcoil',
      'coldrolledsheet',
      'coldrolledcoil'
    ] },

  image: { type: String,  },

  thickness: { type: [Number], default: [] },
  width: { type: [Number], default: [] },
  length: { type: [Number], default: [] },

  purchaseNow: { type: String, default: false },
  deliveryDays: { type: String, required: true }
});

module.exports = mongoose.model('product', productSchema);
