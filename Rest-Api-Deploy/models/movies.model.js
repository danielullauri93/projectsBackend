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

import movies from '../movies.json' with { type: 'json' };
import { randomUUID } from 'crypto';

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) { // if (genre): Verifica si la variable genre tiene un valor (es decir, no es null, undefined o una cadena vacía). Si genre existe, entra en el bloque if.

      return movies.filter((movie) => // El método filter() crea un nuevo array con todos los elementos que cumplan una condición. Recibe una función de callback que se ejecuta para cada elemento del array (movie en este caso). Si la función de callback devuelve true, el elemento se incluye en el nuevo array.

        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()) // El método some() verifica si al menos un elemento de un array cumple con una condición. En este caso, se usa para verificar si al menos un género de la película (movie.genre) coincide con el género proporcionado (genre).

        // Compara el género de la película (g) con el género proporcionado (genre), ignorando mayúsculas y minúsculas. Si hay coincidencia, some() devuelve true, y filter() incluye la película en el nuevo array.
      );
    }
    return movies // Si no se proporciona un género (genre es null, undefined o una cadena vacía), el código devuelve el array original movies sin filtrar.
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);
    return movie
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(), // generamos un id unico uuid v4
      ...input
    };
    movies.push(newMovie);

    return newMovie
  }

  // Busca una película en el array movies por su id. Si la encuentra, la elimina del array y devuelve true. Si no la encuentra, devuelve false.
  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1);
    return true

    // const movieIndex = movies.findIndex((movie) => movie.id === id);
    // if (movieIndex === -1) return false; // Si no se encuentra, devuelve false
    // movies.splice(movieIndex, 1); // Elimina la película
    // return true; // Devuelve true si se eliminó correctamente

    //     Diferencias entre findIndex() y find():

    // findIndex():
    // Devuelve el índice del primer elemento que cumple la condición.
    // Si no encuentra ningún elemento, devuelve - 1.
    // Útil cuando necesitas el índice para realizar operaciones como splice().

    // find():
    // Devuelve el primer elemento que cumple la condición.
    // Si no encuentra ningún elemento, devuelve undefined.
    // Útil cuando necesitas el objeto en sí, no su índice.
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;
    movies[movieIndex] = { ...movies[movieIndex], ...input };
    return movies[movieIndex];
  }
}