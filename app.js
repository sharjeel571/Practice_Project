const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('./db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Pass the app instance to createServer
const io = socketIo(server);



mongoose();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('shami HMS').status(200);
});


io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('new_like', (data) => {
    io.emit('new_like', { message: data.message });
  });
});


app.use('/api/books/', require('./routes/books'));
app.use('/api/auth/', require('./routes/authentication'));

server.listen(port, () => {
  console.log(`App listening at the port http://localhost:${port}`);
});
