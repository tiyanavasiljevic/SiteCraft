import dotenv from 'dotenv';
import http from 'http';
import { Server as socketIo } from 'socket.io';
import { connectDB } from './config/db.js';
import app from './app.js';
import { setupSocket } from './sockets/messageSocket.js';

dotenv.config();

const server = http.createServer(app);
const io = new socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

connectDB();
setupSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
