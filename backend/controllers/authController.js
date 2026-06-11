import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_123';

// Helper to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30d' });
};

// ========================
// Local Registration
// ========================
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please fill in all fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, authProvider: 'local' });

    await user.save();
    
    // Auto-login after registration
    const token = generateToken(user._id);
    res.status(201).json({ 
      msg: 'User created',
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ========================
// Local Login
// ========================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please fill in all fields' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // If user signed up via Google, they can't use password login
    if (user.authProvider === 'google' && !user.password) {
      return res.status(400).json({ msg: 'This account uses Google Sign-In. Please login with Google.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ========================
// Google OAuth Login
// ========================
export const googleLogin = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ msg: 'Google credential is required' });
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      return res.status(500).json({ msg: 'Google OAuth is not configured on the server' });
    }

    const client = new OAuth2Client(clientId);
    
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      // Update Google info if needed
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
      }
      if (picture && !user.avatar) {
        user.avatar = picture;
      }
      await user.save();
    } else {
      // Create new user
      user = new User({
        name,
        email,
        googleId,
        avatar: picture,
        authProvider: 'google',
      });
      await user.save();
    }

    const token = generateToken(user._id);
    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } 
    });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(401).json({ msg: 'Invalid Google credentials' });
  }
};
