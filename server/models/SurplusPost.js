const mongoose = require('mongoose');

const surplusPostSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  quantity: { type: Number, required: true }, // e.g., 10 for 10kg or 10 meals
  location: { type: String, required: true },
  pickupDeadline: { type: Date, required: true },
  imageUrl: { type: String },
  status: { 
    type: String, 
    enum: ['available', 'accepted', 'collected', 'expired'], 
    default: 'available' 
  },
  catererId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  acceptedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { timestamps: true });

module.exports = mongoose.model('SurplusPost', surplusPostSchema);