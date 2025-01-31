const express = require('express');
const crypto = require('crypto');
const cors = require('cors')
const {
  validateMovie,
  validatePartialMovie,
} = require('./schema/movies.schema.js');
const movies = require('./movies.json');

const app = express();

app.disable('x-powered-by'); // desabilitar  el header de express

// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight -> Una solicitud de preflight CORS se usa para que solicite y verifique si se entiende el protocolo CORS y si un servidor está al tanto utilizando métodos y encabezados específicos. ––> OPTIONS solicitud lo que se usa 

// const ACEPPTED_ORIGINS = [
//   'http://localhost:8080',
//   'http://localhost:3000',
//   'https://myapp.com',
// ];

app.use(express.json());
// app.use(cors()) Esto hace que el cors lleve '*' que quiere decir que esta abierto para todas las rutas
app.use(cors(
  {
    origin: (origin, callback) => {
      const ACEPPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:3000',
        'https://myapp.com',
      ];

      if(ACEPPTED_ORIGINS.includes(origin)){
        return callback(null, true);
      }
      if(!origin){
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    }
  }
));

const PORT = process.env.PORT ?? 3000;

// Recuperar las peliculas de un genero y tambien todos las peliculas –––––––––––––––––––––––––––––––––––––––––––––––––
app.get('/movies/', (req, res) => {

  // Esto comentado es si como funciona el cors, aveces es mejor usarlo asi para que se vea como funciona
  // res.header('Access-Control-Allow-Origin', '*'); // CORS habilitado para todos los origenes cuando pones '*'
  // const origin = req.header('origin');
  // if (ACEPPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin); // CORS habilitado para un origen especifico
  // }

  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

// Recuperar una pelicula por su id –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: 'Movie not found' });
});

// Crear una nueva pelicula –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    // 422 entidad no procesable
    return res.status(400).json({
      error: JSON.parse(result.error.message),
    });
  }

  // en base de datos
  const newMovie = {
    id: crypto.randomUUID(), // generamos un id unico uuid v4
    ...result.data,
  };
  // esto no seria no seria un Rest porque estamos guardando el estado de la aplicacion en memoria
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

// Actualizar una pelicula PATCH (actualiza solo los campos que se envian) PUT (actualiza todos los campos) ––––––––––––––––––––––
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ message: 'Invalid movie data' });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const updatedMovie = {
    ...movies[movieIndex], // ...movies[movieIndex] es para no perder los campos que no se envian
    ...result.data, // ...result.data es para actualizar los campos que se envian
  };

  movies[movieIndex] = updatedMovie; // actualizamos la pelicula en la base de datos

  return res.json(updatedMovie); // retornamos la pelicula actualizada
});

// Eliminar peliculas ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
app.delete('/movies/:id', (req, res) => {
  // const origin = req.header('origin');
  // if (ACEPPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin); // CORS habilitado para un origen especifico
  // }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  movies.splice(movieIndex, 1); // eliminamos la pelicula de la base de datos

  return res.status(204).end(); // 204 No Content
});

// app.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin');
//   if (ACEPPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin); // CORS habilitado para un origen especifico
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // habilitamos los metodos
//   }
//   res.send(200)
// })

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
