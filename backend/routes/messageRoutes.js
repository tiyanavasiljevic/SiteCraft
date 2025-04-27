import express from 'express';
import { getMessages, addTestMessage } from '../controllers/messageController.js';

const router = express.Router();

router.get('/', getMessages);
router.post('/test-message', addTestMessage);

export default router;
