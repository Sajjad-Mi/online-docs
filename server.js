const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true})
.then(()=>{
  server.listen(PORT);
})