
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors());
app.use(express.json());

// API rute
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// 🚀 Serviranje frontenda iz dist foldera
//app.use(express.static(path.join(__dirname, 'dist')));

// 🎯 Ako ruta nije API, vrati index.html (SPA fallback)
//app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, 'dist', 'index.html'));
//});

app.get('/', (req, res) => {res.send("server is free")});
export default app;
