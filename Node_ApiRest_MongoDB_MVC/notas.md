##  ¿Por qué se usa [genres] en const [genres] = await connection.query(...)?

  

`const [genres] = await connection.query(...);`

  

***Razón:***

  

**Desestructuración de arrays:**

  

En JavaScript, la sintaxis `[variable]` se usa para desestructurar un array. Esto significa que si la función connection.query(...) devuelve un array, estamos extrayendo el primer elemento de ese array y asignándolo a la variable genres.

  

**Resultado de connection.query:**

  

En muchas bibliotecas de bases de datos (como mysql2), la función query devuelve un array donde el primer elemento es el resultado de la consulta y el segundo elemento contiene metadatos (como información de las columnas). Al usar `[genres]`, estamos extrayendo solo el resultado de la consulta.

  

**Ejemplo:**

  

Si `connection.query(...)` devuelve algo como:

[

// Resultado de la consulta
[{ id: 1, name: 'Action' }], 

// Metadatos (no nos interesa en este caso)
[{ ... }] 

]

Entonces, `const [genres] = await connection.query(...)` asignará:

`genres = [{ id: 1, name: 'Action' }];`

##  ¿Por qué se usa [lowerCaseGenre] en connection.query(...)?

await connection.query(

'SELECT id FROM genres WHERE LOWER(name) = ?',

[lowerCaseGenre]

);

***Razón:***

**Parámetros en consultas SQL:**

En consultas SQL, el símbolo ? es un marcador de posición para parámetros. Esto ayuda a prevenir inyecciones SQL, que son un riesgo de seguridad común.

**Array de parámetros:**

El segundo argumento de connection.query es un array que contiene los valores que se sustituirán en los marcadores de posición (?). En este caso, `[lowerCaseGenre]` es un array con un solo elemento: el valor de lowerCaseGenre.

***Cómo funciona:***

**La consulta SQL tiene un marcador de posición:**  `'SELECT ... WHERE LOWER(name) = ?'`.

**El valor lowerCaseGenre se pasa como un array:**  `[lowerCaseGenre]`.

La biblioteca de la base de datos sustituye el **?** por el valor de **lowerCaseGenre** de manera segura.

Ejemplo:

Si ***lowerCaseGenre = 'action'***, la consulta ejecutada será:

`SELECT id FROM genres WHERE LOWER(name) = 'action'`;

**Conlusion:**  `[lowerCaseGenre]:` Es un array que contiene los valores que se sustituirán en los marcadores de posición **(?)** de la consulta SQL. Esto previene inyecciones SQL y hace que la consulta sea más segura.

---

##  Explicación de la consulta

`SELECT BIN_TO_UUID(m.id) id, m.title, m.year, m.director, m.duration, m.poster, m.rate
FROM movies m
JOIN movie_genres mg ON m.id = mg.movie_id
WHERE mg.genre_id = ?;`

Esta consulta busca todas las películas que pertenecen a un género específico.

***FROM movies m → Definimos la tabla principal***

`FROM movies m`

 Estamos diciendo que la tabla principal será movies y le damos un alias m.

*Ejemplo de la tabla movies:*

| id | Title    | Year | Director | Duration | Poster | Rate | 
|---|-----------|------|----------|----------|--------|------| 
| 1 | Inception | 2010 | Nolan    | 148      | img1   | 9.0  | 
| 2 | Avatar    | 2009 | Cameron  | 162      | img2   | 8.5  | 
| 3 | Titanic   | 1997 | Cameron  | 195      | img3   | 8.8  |


### JOIN movie_genres mg ON m.id = mg.movie_id → Unimos las tablas

`JOIN movie_genres mg ON m.id = mg.movie_id`

***Unimos (JOIN) la tabla movies con movie_genres usando m.id = mg.movie_id***

Ejemplo de la tabla movie_genres (relación películas-géneros):

| movie_id | genre_id | 
|----------|----------| 
| 1        | 10       | 
| 2        | 10       | 
| 3        | 11       |

***Aquí movie_id es el ID de la película y genre_id el ID del género.***

### Después del JOIN, tenemos algo así:

| movie_id | Title     | Year | genre_id | 
|----------|-----------|------|----------| 
| 1        | Inception | 2010 | 10       | 
| 2        | Avatar    | 2009 | 10       | 
| 3        | Titanic   | 1997 | 11       |

### WHERE mg.genre_id = ? → Filtramos por género

`WHERE mg.genre_id = ?`

*Esto significa que solo seleccionamos las películas que pertenecen a un género específico.*

***Si ? = 10 (por ejemplo, el ID del género "Ciencia Ficción"), la consulta devuelve:***


| id | Title     | Year | Director | Duration | Poster | Rate | 
|----|-----------|------|----------|----------|--------|------| 
| 1  | Inception | 2010 | Nolan    | 148      | img1   | 9.0  | 
| 2  | Avatar    | 2009 | Cameron  | 162      | img2   | 8.5  |

***Si ? = 11 (ID del género "Romance"), solo devolvería "Titanic".***

---

##  ¿Por qué el constructor recibe { movieModel } entre llaves {}?

`constructor({ movieModel }) {
this.movieModel = movieModel;
}`

##  Esto se llama "Destructuring Assignment" (Desestructuración de Objetos) en JavaScript.

***Significa que esperamos un objeto como argumento y extraemos solo la propiedad movieModel de ese objeto.***

Es equivalente a escribirlo sin desestructuración así:

`constructor(props) {
this.movieModel = props.movieModel
}`

**Ventajas de usar { movieModel } en lugar de props.movieModel:**

- Permite extraer solo las propiedades necesarias del objeto sin necesidad de acceder con props.movieModel.

- Hace el código más limpio y fácil de leer.

- Evita escribir this.props.movieModel, manteniendo el código más conciso.

**¿Por qué movieModel se pasa en minúscula?**

`constructor({ movieModel }) {}`

***movieModel se pasa en minúscula porque sigue la convención de camelCase en JavaScript para los nombres de variables y objetos.***

  

##  ¿Cómo funciona este constructor?

`const movieController = new MovieController({ movieModel: MovieModel });`

Cuando creamos una nueva instancia de MovieController, le pasamos un objeto { movieModel: MovieModel }.

***"Instancia":*** es un objeto que se crea a partir de una clase. Es una representación concreta de una clase que existe en la memoria del ordenador.

### Así se ejecuta el constructor:

`constructor({ movieModel }) {
this.movieModel = movieModel;
}`

***Internamente, movieModel tomará el valor de MovieModel, permitiendo que el controlador use los métodos de MovieModel como:***

`this.movieModel.getAll();`

`this.movieModel.create();`

*Ejemplo de lo que realmente ocurre cuando se ejecuta:*

`const movieController = new MovieController({ movieModel: MovieModel });`

`console.log(movieController.movieModel); `
// Mostrará la clase MovieModel en consola

***El controlador (movieController) ahora tiene acceso a MovieModel y puede hacer operaciones con la base de datos.***