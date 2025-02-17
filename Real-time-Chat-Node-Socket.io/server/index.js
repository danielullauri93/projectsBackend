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



//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Evento de conexión con el socket.io
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');

  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });

  socket.on('chat message', (msg) => {
    // console.log(`Mensaje recibido: ${msg}`); // Aquí debería aparecer el mensaje
    io.emit('chat message', msg); // Enviamos el mensaje a todos los clientes conectados
  });
});

app.use(logger('dev')) // Con 'logger' gracias a 'morgan', cada vez que alguien haga una solicitud al servidor, se imprimirá información en la terminal
// ejemplo lo que sale en el terminal: GET / 304 3.514 ms - - (peticion, status code, milisegundos) 

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})