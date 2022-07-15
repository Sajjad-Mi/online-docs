const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const docsRoutes = require('./routes/docs');
const {checkAuthorization} = require('./middleware/auth.js')

const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(express.static('public'));
app.use(express.json());

require('dotenv').config();

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true})
.then(()=>{
  server.listen(PORT);
})

app.use(authRoutes);
app.use(checkAuthorization, docsRoutes);
