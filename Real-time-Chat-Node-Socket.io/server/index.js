import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

import { Server } from 'socket.io'
import { createServer } from 'node:http' // modulo para poder crear servidores http

const port = process.env.PORT ?? 3000

const app = express()
dotenv.config() // Leemos las variables de entorno

// creamos esto porque express es un servidor http pero queremos que tenga la funcionalidad del socket.io
const server = createServer(app)

// Inicializamos el socket.io con el server http que hemos creado previamente
const io = new Server(server, {
  // para evitar que los datos se pierdan cuando se recargue la página
  connectionStateRecovery: {}
})

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Conectamos con la base de datos
const db = createClient({
  url: 'libsql://natural-burnout-natsu.turso.io',
  authToken: process.env.DB_TOKEN
})

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    content TEXT,
    user TEXT
)`)



//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Evento de conexión con el socket.io
io.on('connection', async (socket) => {
  console.log('Un cliente se ha conectado');

  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });

  socket.on('chat message', async (msg) => {
    // console.log(`Mensaje recibido: ${msg}`); // Aquí debería aparecer el mensaje
    let result
    const username = socket.handshake.auth.username ?? 'anonymous' // Obtenemos el nombre de usuario del cliente, si no hay, se pone 'anonymous'
    try {
      result = await db.execute({
        sql: `INSERT INTO messages (content, user) VALUES (:msg, :username)`, // Insertamos el mensaje en la base de datos
        args: { msg, username } // Pasamos el mensaje como argumento
      })
    } catch (error) {
      console.error(error)
      return
    }
    io.emit('chat message', msg, result.lastInsertRowid.toString(), username); // Enviamos el mensaje a todos los clientes conectados, result.lastInsertRowid.toString() es el id del mensaje
  });

  if (!socket.recovered) { // <–– recupera los mensajes que se han perdido
    try {
      const result = await db.execute({
        sql: `SELECT id, content, user FROM messages WHERE id > ?`,
        args: [socket.handshake.auth.serverOffset ?? 0]
      })

      result.rows.forEach(row => {
        socket.emit('chat message', row.content, row.id.toString(), row.user) // Enviamos todos los mensajes almacenados en la base de datos a todos los clientes conectados
      })
    } catch (error) {
      console.error(error)
    }
  }

});

app.use(logger('dev')) // Con 'logger' gracias a 'morgan', cada vez que alguien haga una solicitud al servidor, se imprimirá información en la terminal
// ejemplo lo que sale en el terminal: GET / 304 3.514 ms - - (peticion, status code, milisegundos) 

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})