
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send('Chat server is running');
});

export default app;
