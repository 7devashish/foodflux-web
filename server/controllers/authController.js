const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Using bcryptjs

// Helper to create the JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 1. REGISTER USER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone, location } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash the password (FIXED LINE)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 

    // Create the user
    const user = await User.create({
      name, email, password: hashedPassword, role, phone, location
    });

    // Send back the token
    res.status(201).json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error("Registration Error:", err); // This prints the exact error in your terminal
    res.status(400).json({ message: "Registration failed", error: err.message });
  }
};

// 2. LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        token: generateToken(user._id),
        user: { id: user._id, name: user.name, role: user.role }
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
};