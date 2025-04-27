import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);

