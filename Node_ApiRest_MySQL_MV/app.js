import express from 'express';
import { corsMiddleware } from './middlewares/cors.middleware.js';
import { createMovieRouter } from './routes/movies.routes.js'; // importamos la funcion de la routes(rutas)
// import { MovieModel } from './models/mysql/movie.model.js'; // importamos el modelo que vamos a usar en este caso sql

export const createApp = ({ movieModel }) => {

  // Configuración del server en express
  const app = express();

  app.disable('x-powered-by'); // desabilitar  el header de express

  // Middleware nativo de express para leer los datos del cuerpo de la petición en formato JSON
  app.use(express.json());

  // Esto habilita el CORS para todas las rutas que hay en el archivo movies.routes.js 
  // Usamos el middleware cors para todas las rutas que hay en nuestra app.js
  app.use(corsMiddleware());

  // Importamos las rutas de nuestro archivo movies.routes.js
  app.use('/movies', createMovieRouter({ movieModel})); // aqui le decimos que vamos a usar el modelo sql
  // La función createMovieRouter recibe un objeto con el modelo de base de datos (movieModel).
  // antes le habiamos pasado asi ({ movieModel: MovieModel })
  // Ahora pasamos solo movieModel {movieModel}

  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

