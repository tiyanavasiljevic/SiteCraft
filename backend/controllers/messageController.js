import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
};

export const addTestMessage = async (req, res) => {
  try {
    const testMessage = new Message({
      user: "Test User",
      content: "Ovo je test poruka"
    });

    await testMessage.save();
    res.status(201).json({ message: "Test message added!" });
  } catch (err) {
    res.status(500).json({ message: 'Error adding test message', error: err.message });
  }
};
