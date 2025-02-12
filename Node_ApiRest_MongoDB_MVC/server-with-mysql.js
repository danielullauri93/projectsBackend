import { createApp } from "./app.js";
import { MovieModel } from './models/mysql/movie.model.js'

// Esto crea un servidor que solo funcione con la base de datos MySql:
createApp({ movieModel: MovieModel })

// 1. Con crear este archivo como servidor hace que funcione el app.js con la base de datos MySQL
// 2. en el package.json creamos un script para que corra solo con mysql "start:mysql": "nodemon server-with-mysql.js"


// Y asi podemos usar mas servidores para que funcionen con distintas bases de datos relacional y no relacional, y hasta local