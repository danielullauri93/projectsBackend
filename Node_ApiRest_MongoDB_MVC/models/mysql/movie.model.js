import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'Ferrari1993.',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      // Convertir el género a minúsculas para hacer la búsqueda insensible a mayúsculas/minúsculas
      const lowerCaseGenre = genre.toLowerCase();

      // Obtener el ID del género desde la base de datos
      const [genres] = await connection.query(
        'SELECT id FROM genres WHERE LOWER(name) = ?', // Usar LOWER para comparación insensible a mayúsculas/minúsculas
        [lowerCaseGenre] // Pasar el género como parámetro seguro sustituirán en los marcadores de posición (?) de la consulta SQL
      );

      // Si no se encuentra el género, devolver un array vacío
      if (genres.length === 0) return [];

      // Extraer el ID del género (desestructuración de arrays)
      const [{ id }] = genres;

      // Obtener las películas asociadas al género
      const [movies] = await connection.query(
        `SELECT BIN_TO_UUID(m.id) id, m.title, m.year, m.director, m.duration, m.poster, m.rate
          FROM movies m
          JOIN movie_genres mg ON m.id = mg.movie_id
          WHERE mg.genre_id = ?`,
        [id] // Pasar el ID del género como parámetro seguro
      );

      return movies; // Devolver las películas filtradas por género
    }

    // Si no se especifica un género, devolver todas las películas
    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies;'
    );

    return movies; // Devolver todas las películas
  }

  static async getById({ id }) {
    const [movie] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?);',
      [id] // Pasar el ID de la película como parámetro seguro
    )

    if (movie === 0) return null

    return movie[0]; // Devolver la película
  }

  static async create({ input }) {
    const { title, year, director, duration, poster, rate, genre } = input;

    try {

      // // Verificar si la película ya existe en la base de datos
      // const [existingMovies] = await connection.query(
      //   `SELECT id FROM movies WHERE title = ? AND year = ?`,
      //   [title, year]
      // );

      // // Si la película ya existe, lanzar una excepción para evitar la duplicación
      // if (existingMovies.length > 0) {
      //   console.log('La pelicula ya esxiste')
      //   throw new Error('Movie already exists'); // Evitar la duplicación
      // }

      // 1. Obtener el ID (uuid) que se género desde la base de datos
      const [uuidResult] = await connection.query('SELECT UUID() uuid;');
      const [{ uuid }] = uuidResult;


      // 2. Insertar la película en la base de datos
      await connection.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate) 
          VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)`, // Usamos UUID_TO_BIN(?) para convertir el UUID en un formato binario y almacenarlo en la base de datos.
        [uuid, title, year, director, duration, poster, rate]
      );

      // 3. Insertar los géneros en la tabla movie_genres (si se proporcionaron)
      if (genre && genre.length > 0) { // Si se proporcionan géneros (genre), iteramos sobre ellos y los insertamos en la tabla movie_genres.
        for (const genreName of genre) {
          // Obtener el ID del género
          const [genres] = await connection.query(
            'SELECT id FROM genres WHERE name = ?',
            [genreName]
          );

          if (genres.length > 0) {
            const [{ id: genreId }] = genres;
            // Insertar la relación en movie_genres
            await connection.query(
              'INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?)',
              [uuid, genreId]
            );
          }
        }
      }

      // 4. Obtener la película recién creada
      const [movies] = await connection.query(
        `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
          FROM movies WHERE id = UUID_TO_BIN(?);`,
        [uuid]
      );

      // 5. Devolver la película creada
      return movies[0];

    } catch (error) {
      // 6. Manejar errores
      console.error('Error creating movie:', error);
      throw new Error('Error creating movie');
    }
  }
  static async update({ id, input }) {
    try {

      // 1. Crear la consulta SQL dinámicamente basada en los campos `input`
      const fieldsToUpdate = Object.keys(input) // Usamos Object.keys(input) para obtener los campos que se van a actualizar.
        // El método estático Object.keys() devuelve un arreglo de propiedades enumerables propias de un objeto dado.
        // const object1 = { a: 'somestring', b: 42, c: false };
        // console.log(Object.keys(object1)); // output: Array ["a", "b", "c"]
        .map((key) => `${key} = ?`) // .map((key) => ${key} = ?) recorre cada clave y crea un string con el formato campo = ?
        .join(', '); // .join(', ') une los elementos con comas
      // "title = ?, year = ?"

      // 2. Crear un array con los valores a actualizar
      const valuesToUpdate = Object.values(input); // Usamos Object.values(input) para obtener los valores de los campos a actualizar.
      // El Object.values() el método estático devuelve una matriz de los propios valores de propiedad con clave de cadena enumerables de un objeto dado
      // const object1 = { a: 'somestring', b: 42, c: false };
      // console.log(Object.values(object1)); // output: Array ["somestring", 42, false]


      // 3. Agregar el ID al final del array de valores
      valuesToUpdate.push(id); // Agregamos el id al final del array de valores.

      // 4. Ejecutar la consulta SQL
      const [result] = await connection.query(
        `UPDATE movies 
          SET ${fieldsToUpdate} 
          WHERE id = UUID_TO_BIN(?);`,
        valuesToUpdate
      );

      // 5. Verificar si se actualizó alguna fila
      if (result.affectedRows === 0) return false;

      // 6. Obtener la película actualizada
      const [updatedMovie] = await connection.query(
        `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
          FROM movies 
          WHERE id = UUID_TO_BIN(?);`,
        [id]
      );

      // 7. Devolver la película actualizada
      return updatedMovie[0]; // Devuelve solo el objeto película

    } catch (error) {
      console.error('Error updating movie:', error);
      throw new Error('Error updating movie');
    }
  }
  static async delete({ id }) {
    try {
      // 1️. Eliminar relaciones de la película en movie_genres
      await connection.query(
        `DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);`,
        [id]
      );

      // 2️. Ahora eliminar la película de la tabla movies
      const [result] = await connection.query(
        `DELETE FROM movies WHERE id = UUID_TO_BIN(?);`,
        [id]
      );

      // 3️. Verificar si la película fue eliminada correctamente
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw new Error('Error deleting movie');
    }
  }


}