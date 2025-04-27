import Message from '../models/Message.js';

export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Socket connected');

    socket.on('send_message', async (message) => {
      try {
        const newMessage = new Message(message);
        await newMessage.save();
        io.emit('receive_message', message);
      } catch (err) {
        console.error('Error saving message:', err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  });
};
