require('dotenv').config();

const mongoose = require('mongoose');


const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB Atlas:', err);
  });
