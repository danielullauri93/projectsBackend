import { Router } from "express";
import { validateMovie, validatePartialMovie } from './schema/movies.schema.js';
// import { randomUUID } from 'crypto';

// Formas de leer un archivo Json en NODE

// 1. Una forma de hacerlo es asi:
// import fs from 'fs' // importamos el fichero 'fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) // Leemos de forma sicrona el archivo json y   convertimos a objeto

// 2. Como leer un json en ESModules recomendado si el json es demasiado grande
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url)
// const movies = require('./movies.json'); // importamos el fichero json

// 3. Este es el mas actual y nativo de nodejs 
// import movies from './movies.json' with {type: 'json' }

import movies from './movies.json' with {type: 'json' }
import { MovieModel } from "../models/movies.model.js";

const router = Router();

// Recuperar todas las peliculas de un genero y por genero –––––––––––––––––––––––––––––––––––––––––––––––––
router.get('/', async (req, res) => {

  // Esto comentado es si como funciona el cors, aveces es mejor usarlo asi para que se vea como funciona
  // res.header('Access-Control-Allow-Origin', '*'); // CORS habilitado para todos los origenes cuando pones '*'
  // const origin = req.header('origin');
  // if (ACEPPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin); // CORS habilitado para un origen especifico
  // }

  // Con esto se filtra la logica desde la carpeta model(modelo) 
  const { genre } = req.query;
  const movies = await MovieModel.getAll({ genre })
  // // Filtrar peliculas por genero pero ahora esta separado en la carpeta model
  // if (genre) {
  //   const filteredMovies = movies.filter((movie) =>
  //     movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
  //   );
  //   return res.json(filteredMovies);
  // }
  res.json(movies);
});

// Recuperar una pelicula por su id –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const movie = await MovieModel.getById({ id })
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' });

  // La logica esta en la carpeta model(modelo)
  // const movie = movies.find((movie) => movie.id === id);
  // if (movie) return res.json(movie);
  // res.status(404).json({ message: 'Movie not found' });
});

// Crear una nueva pelicula –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
router.post('/', async (req, res) => {
  const result = validateMovie(req.body);
  if (result.error) {
    // 422 entidad no procesable
    return res.status(400).json({
      error: JSON.parse(result.error.message),
    });
  }

  const newMovie = await MovieModel.create({ input: result.data })
  res.status(201).json(newMovie)

  // La logica esta en la carpeta model(modelo)
  // // en base de datos
  // const newMovie = {
  //   id: randomUUID(), // generamos un id unico uuid v4
  //   ...req.body,
  // };

  movies.push(newMovie);

  // guardamos los cambios en el json
  // fs.writeFileSync('./movies.json', JSON.stringify(movies, null, 2));

  res.status(201).json(newMovie);
});

// Actualizar una pelicula PATCH (actualiza solo los campos que se envian) PUT (actualiza todos los campos) –––––––––––––
router.patch('/:id', async (req, res) => {
  const result = validatePartialMovie(req.body);
  if (result.error) {
    return res.status(400).json({ message: 'Invalid movie data' });
  }

  const { id } = req.params;

  const updateMovie = await MovieModel.update({ id, input: result.data })

  return res.json(updateMovie)

  // La logica esta en la carpeta model(modelo)
  // const movieIndex = movies.findIndex((movie) => movie.id === id);

  // if (movieIndex === -1) {
  //   return res.status(404).json({ message: 'Movie not found' });
  // }

  // const updatedMovie = {
  //   ...movies[movieIndex],
  //   ...req.body,
  // };

  // movies[movieIndex] = updatedMovie;

  // guardamos los cambios en el json
  // fs.writeFileSync('./movies.json', JSON.stringify(movies, null, 2));

  return res.json(updatedMovie);
});

// Borrar una pelicula DELETE –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await MovieModel.delete({ id })
  if (result === false) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  return res.json({ message: 'Movie deleted' })

  // La logica esta en la carpeta model(modelo)
  // const movieIndex = movies.findIndex((movie) => movie.id === id);
  // if (movieIndex === -1) {
  //   return res.status(404).json({ message: 'Movie not found' });
  // }
  //movies.splice(movieIndex, 1);

  // guardamos los cambios en el json
  // fs.writeFileSync('./movies.json', JSON.stringify(movies, null, 2));
  //res.status(204).send();
});

export default router;