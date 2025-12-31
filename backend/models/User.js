const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true }, // [cite: 118]
  email: { type: String, required: true, unique: true }, // [cite: 116]
  password: { type: String, required: true }, // [cite: 117]
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // [cite: 119]
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }, // [cite: 120]
  lastLogin: { type: Date }, // [cite: 123]
}, { timestamps: true }); // Automatically handles created/updated date [cite: 121, 122]

module.exports = mongoose.model('User', UserSchema);