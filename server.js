const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const io = require('socket.io')(server);
const authRoutes = require('./routes/auth');
const docsRoutes = require('./routes/docs');
const jwt = require('jsonwebtoken');
const {checkAuthorization, checkUser} = require('./middleware/auth.js')

const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(express.static('public'));
app.use(express.json());

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(cookieParser()));

io.use((socket, next)=>{   
  const cookieJWT = socket.request.cookies.jwt;
  jwt.verify(cookieJWT, process.env.JWT_SECRET, async (err, decode)=>{
     next();                                                       
  })    
})

require('dotenv').config();

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true})
.then(()=>{
  server.listen(PORT);
})

app.use('*', checkUser)
app.use(authRoutes);
app.use(checkAuthorization, docsRoutes);


const getOnUsers = async (roomId) => {
  const sockets = await io.in(roomId).fetchSockets();
  let onUsers = []; 
  sockets.forEach(socket => {
    onUsers.push(socket.data.username);
  })
  return onUsers;
}
io.on('connection', socket => {
  socket.on('joinRoom', ({username, roomId})=>{
    //for every separate document create a room with document id for communication
    socket.join(roomId);
    socket.data.username = username;
    socket.data.roomId = roomId;

  })
  socket.on('onUsers', async ({roomId}) =>{ 
    
    const onUsers = await getOnUsers(roomId);
    io.to(roomId).emit('onUsers', onUsers);
  })

   //if a user disconnected update the online users
   socket.on('disconnect', async (reason)=>{
    const roomId = socket.data.roomId;
    const onUsers = await getOnUsers(roomId);
    io.to(roomId).emit('onUsers', onUsers);
  })

  socket.on('typed', ({data, roomId})=>{
    socket.broadcast.to(roomId).emit('newMessage', data)
  })

  
})