
const express = require('express'); //IMPORT FOR EXPRESS
const http = require('http'); //IMPORT FOR HTTP MODULE
const socketIo = require('socket.io'); //IMPORT FOR SOCKET.IO FOR REAL TIME COMMUNICATION
const cors = require('cors'); // IMPORT CORS
require('dotenv').config();
require('./mongodb');


//INITIALIZATION
const app = express();


app.use(cors());

//CREATE HTTP SERVER USING EXPRESS
const server = http.createServer(app);

//INITIALIZATION SOCKET.IO WITH SERVER
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

//DEFINE THE BEGINING ROUTE
app.get('/', (req, res) => {
  res.send('Chat server is running');
});

//WHEN SOMEONE IS CONNECTED WITH WEBSOCKET
io.on('connection', (socket) => {
  console.log('A user connected');

  //SENDING EVENT
  socket.on('send_message', (message) => {
    
    //EMMITING MESSAGE TO ALL USERS
    io.emit('receive_message', message);
  });


  //USER DISCONECTED
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});


