import { Router } from "express";



import { MovieController } from "../controllers/movies.controller.js";

const router = Router();

// Recuperar todas las peliculas de un genero y por genero –––––––––––––––––––––––––––––––––––––––––––––––––
router.get('/', MovieController.getAll);

// Recuperar una pelicula por su id –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
router.get('/:id', MovieController.getById);

// Crear una nueva pelicula –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
router.post('/', MovieController.create);

// Actualizar una pelicula PATCH (actualiza solo los campos que se envian) PUT (actualiza todos los campos) –––––––––––––
router.patch('/:id', MovieController.update);

// Borrar una pelicula DELETE –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
router.delete('/:id', MovieController.delete);

export default router;