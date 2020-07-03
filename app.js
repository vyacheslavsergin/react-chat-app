const http = require('http')
const express = require('express')
const cors = require('cors')
const socketIO = require('socket.io')

const users = require('./utils/users')()

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(cors())

const message = (name, text, id) => ({name, text, id})

io.on('connection', socket => {

  console.log('IO Connection')

  socket.on('join', (user, callback) => {
    console.log('user', user)

    if (!user.name || !user.room) {
      return callback('Enter valid user data')
    }

    callback({ userId: socket.id })

    /**
     * Метод, который позволяет подсоединить пользователя к комнате.
     */
    socket.join(user.room)

    users.remove(socket.id)
    users.add(socket.id, user.name, user.room)

    io.to(user.room).emit('users:update', users.getByRoom(user.room))

    socket.emit('message:new', message('Admin', `Welcome, ${user.name}`))

    /**
     * Если подключается другой пользователь, то нужно сказать клиенту, что новый пользователь был подключен (в комнате может быть несколько пользователей).
     */
    socket.broadcast.to(user.room).emit('message:new', message('Admin', `${user.name} joined.`))
  })

  socket.on('message:create', (data, callback) => {
    console.log('Socket:message:create', data)

    if (!data) {
      callback(`Message can't be empty`)
    } else {
      const user = users.get(socket.id)

      /**
       * socket.emit
       * работает только с тем пользователем, который его вызвал.
       * io.emit
       * Отправим сообщение всем, кто подключен к серверу.
       */
      // io.emit('message:new', message(data.name, data.text, data.id))
      if (user) {
        io.to(user.room).emit('message:new', message(data.name, data.text, data.id))
      }

      callback()
    }

  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.room).emit('message:new', message('Admin', `${user.name}, left.`))
      io.to(user.room).emit('users:update', users.getByRoom(user.room))
    }
  })

})

const port = process.env.PORT || 5000

// app.use('/api/auth', authRoutes)

module.exports = server
