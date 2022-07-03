const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')

const app = express()
const server = http.createServer(app)
const io = socketio(server, { //making socketio server
    cors: {
      origin: "*",
    },
}); 

const port = process.env.port || 5000

//Middleware functions have access to req,res and next middleware func in the req-res cycle.
const router = require('./router') //importing from router.js
app.use(cors());
app.use(router) //using it as middleware

io.on('connection', (socket) => { //built in events : connection and disconnect
    console.log('A new user connected!');

    socket.on('join',({name, room}, callback) => {
        const {error, user} = addUser( {id: socket.id, name, room})

        console.log(name, room);
        
        // const error = true
        if(error){
            return callback(error)
        }

        socket.join(user.room) //user joins in that room



        socket.emit('message',{user: 'admin', text: `Welcome to ${user.room}, ${user.name}!`})

        socket.broadcast.to(user.room).emit('message',{user: 'admin', text: `${user.name} has landed. Say hi to them!`}) //sends mssg to everyone except user

        io.to(user.room).emit('roomData', {room: user.room , users : getUsersInRoom(user.room)})
        
        callback()
    })

    //for user generated messages,
    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)

        io.to(user.room).emit('message', {user: user.name, text: message})

        callback()
    })

    //disconnect for a specific socket
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`})
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        }
    })
})

server.listen(port, ()=> console.log(`Server started on port ${port}`))
