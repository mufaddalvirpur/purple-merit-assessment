const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Middleware to check if user is Admin [cite: 55]
const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admins only.' });
  }
  next();
};

// @route   GET /api/users
// @desc    Get all users (Admin only) with Pagination
// @access  Private/Admin
router.get('/', [auth, adminAuth], async (req, res) => { // [cite: 45]
  const page = parseInt(req.query.page) || 1;
  const limit = 10; // Pagination limit [cite: 80]
  
  try {
    const users = await User.find()
      .select('-password')
      .skip((page - 1) * limit)
      .limit(limit);
      
    const total = await User.countDocuments();
    
    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/users/:id/status
// @desc    Activate/Deactivate user (Admin only)
// @access  Private/Admin
router.put('/:id/status', [auth, adminAuth], async (req, res) => { // [cite: 46, 47]
  const { status } = req.body;
  
  if (!['active', 'inactive'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.status = status;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/users/profile
// @desc    Update own profile (Name, Email)
// @access  Private
router.put('/profile', auth, async (req, res) => { // [cite: 50]
  const { fullName, email } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/users/password
// @desc    Change password
// @access  Private
router.put('/password', auth, async (req, res) => { // [cite: 51]
  const { currentPassword, newPassword } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid current password' });
    
    // Hash new password 
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    await user.save();
    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;