
import express from 'express'; //IMPORT FOR EXPRESS
import http from 'http'; //IMPORT FOR HTTP MODULE
import { Server as socketIo } from 'socket.io'; //IMPORT FOR SOCKET.IO FOR REAL TIME COMMUNICATION
import cors from 'cors'; // IMPORT CORS
import dotenv from 'dotenv'; // IMPORT dotenv
import mongoose from 'mongoose'; //IMPORT MONGOOSE
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';


dotenv.config();
dotenv.config({ path: '../.env' });

const dbURI = process.env.MONGO_URI;

console.log('MongoDB URI:', dbURI);

mongoose.connect(dbURI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB Atlas:', err);
  });

  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  }, { timestamps: true });
  
  //CREATE USER MODEL
  const User = mongoose.model('User', userSchema);

  // MESSAGE SCHEMA I MODEL
const messageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);


//INITIALIZATION
const app = express();


app.use(cors());

app.use(express.json());


//CREATE HTTP SERVER USING EXPRESS
const server = http.createServer(app);

//INITIALIZATION SOCKET.IO WITH SERVER
const io = new socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.post('/api/register',  [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('username').not().isEmpty().withMessage('Username is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  console.log('Received data:', { username, email, password });

  try {
    //CHECK EMAIL EXISTING
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    //HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    //CREATE A NEW USER
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //SAVE THE USER TO MONGO DB
    await newUser.save();
    console.log('User successfully saved to the database!');

    // SEND RESPONSE
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});



app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    //FIND USER WITH EMAIL
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    //CHECK PASSWORD MATCHING
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    //SEND THE TOCKEN BACK TO THE CLIENT
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// GET ALL MESSAGES
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
});

app.post('/api/test-message', async (req, res) => {
  try {
    const newMessage = new Message({
      user: "Test User",
      content: "Ovo je test poruka",
    });

    await newMessage.save();
    res.status(201).json({ message: "Test message added!" });
  } catch (err) {
    res.status(500).json({ message: 'Error adding test message', error: err.message });
  }
});



//DEFINE THE BEGINING ROUTE
app.get('/', (req, res) => {
  res.send('Chat server is running');
});

//WHEN SOMEONE IS CONNECTED WITH WEBSOCKET
io.on('connection', (socket) => {
  console.log('A user connected');

  //SENDING EVENT
  socket.on('send_message', async (message) => {
    try {
      const newMessage = new Message(message);
      await newMessage.save();
  
      io.emit('receive_message', message);
    } catch (err) {
      console.error('Error saving message:', err.message);
    }
  });


  //USER DISCONECTED
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});


