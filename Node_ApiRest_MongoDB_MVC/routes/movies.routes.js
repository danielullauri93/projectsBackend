import { Router } from "express";
// import { MovieModel } from "../models/mysql/movie.model.js";
import { MovieController } from "../controllers/movies.controller.js";

export const createMovieRouter = ({ movieModel }) => { // creamos una funcion en la que podemos devolver la creacion del router 
  const router = Router();

  const movieController = new MovieController({ movieModel })

  // Recuperar todas las peliculas de un genero y por genero –––––––––––––––––––––––––––––––––––––––––––––––––
  router.get('/', movieController.getAll);

  // Recuperar una pelicula por su id –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  router.get('/:id', movieController.getById);

  // Crear una nueva pelicula –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  router.post('/', movieController.create);

  // Actualizar una pelicula PATCH (actualiza solo los campos que se envian) PUT (actualiza todos los campos) –––––––––––––
  router.patch('/:id', movieController.update);

  // Borrar una pelicula DELETE –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  router.delete('/:id', movieController.delete);

  return router;
}
