const express = require('express')
const app = express()
const socketio = require('socket.io')
const http = require('http').createServer(app)

//set static folder

const PORT = process.env.PORT || 5000

http.listen(PORT, () => console.log(`seversite ${PORT}`));

app.use(express.static(__dirname + '/frame'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


//soket
const io = socketio(http);

io.on('connection', (socket) => {
    console.log('conected!!');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})