import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Kreiranje novog korisnika
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Vrati odgovor korisniku
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};
