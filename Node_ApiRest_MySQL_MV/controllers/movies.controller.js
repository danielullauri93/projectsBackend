// import { MovieModel } from "../models/local-file-system/movies.model.js";
//import { MovieModel } from '../models/mysql/movie.model.js'; // MovieModel: Es una clase que interactúa con la base de datos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las películas.

// Recuperar todas las peliculas de un genero y por genero –––––––––––––––––––––––––––––––––––––––––––––––––
import { validateMovie, validatePartialMovie } from '../schema/movies.schema.js'; // validateMovie y validatePartialMovie: Son funciones que validan los datos de entrada para asegurarse de que cumplan con un esquema definido


export class MovieController {
  constructor({ movieModel }) { // ({movieModel}) "Destructuring Assignment" (Desestructuración de Objetos), Significa que esperamos un objeto como argumento y extraemos solo la propiedad movieModel de ese objeto.
    this.movieModel = movieModel
  }
  // MovieController: Es una clase que maneja las solicitudes HTTP relacionadas con las películas.
  // constructor: Recibe un objeto con una instancia de MovieModel y la almacena en la propiedad this.movieModel. Esto permite que el controlador use el modelo para interactuar con la base de datos.

  // terminologia: "Instancia" es un objeto que se crea a partir de una clase. Es una representación concreta de una clase que existe en la memoria del ordenador. 

  getAll = async (req, res) => {

    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    // this.movieModel.getAll: Llama al método getAll del modelo para obtener las películas desde la base de datos.
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params;
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' });

  }

  create = async (req, res) => {
    const result = validateMovie(req.body);

    if (result.error) {
      return res.status(400).json({
        error: JSON.parse(result.error.message),
      });
    }

    const newMovie = await this.movieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body);
    if (result.error) {
      return res.status(400).json({ message: 'Invalid movie data' });
    }

    const { id } = req.params;
    const updateMovie = await this.movieModel.update({ id, input: result.data });
    return res.json(updateMovie);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const result = await this.movieModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.json({ message: 'Movie deleted' })
  }

}

//const movieController = new MovieController({ movieModel })
// MovieController: Se crea una instancia de la clase MovieController pasando MovieModel como dependencia.
// Inyección de dependencias: Esto permite que el controlador use el modelo sin estar fuertemente acoplado a él, lo que facilita las pruebas y el mantenimiento.

// -–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Por qué se usa POO?:

// Organización del código:
// La POO permite dividir el código en clases y métodos, lo que facilita su lectura y mantenimiento.

// Por ejemplo, MovieController maneja la lógica de las solicitudes HTTP, mientras que MovieModel maneja la interacción con la base de datos.

// Reutilización:
// Las clases pueden ser reutilizadas en diferentes partes de la aplicación.
// Por ejemplo, MovieModel puede ser usado por otros controladores o servicios.

// Encapsulamiento:
// La POO permite ocultar los detalles internos de una clase y exponer