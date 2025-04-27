import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser } from '../controllers/authController.js'


const router = express.Router();

router.post('/register', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Min 6 characters'),
  body('username').notEmpty().withMessage('Username required')
], registerUser);

router.post('/login', loginUser);

export default router;
