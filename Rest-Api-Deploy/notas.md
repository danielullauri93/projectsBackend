# Notas para Backend en NodeJs  

## Diferencias entre req.params, req.query, y req.body

1. ***req.params:***	En la URL como parte de la ruta (parámetros dinámicos) -	Para identificar un recurso específico, como un ID.
2. ***req.query:***	En la URL después de ? como parámetros de consulta - Para filtros, búsquedas, o configuraciones opcionales.
3. ***req.body:***	En el cuerpo de la solicitud (JSON, formularios, etc.) -	Para enviar datos grandes o estructurados, como formularios o datos JSON.

***req.params***
- Contiene los parámetros dinámicos de la URL, definidos en la ruta del servidor.
- Se utiliza cuando defines parámetros dinámicos en la ruta utilizando : (por ejemplo, /movies/:id).

***req.query***
- Contiene los parámetros de consulta (query parameters) enviados en la URL después de ?.
- Se utiliza para filtros, búsquedas o datos opcionales que no forman parte de la ruta.

***req.body***
- Contiene los datos enviados en el cuerpo de la solicitud HTTP, típicamente en métodos como POST, PUT, o PATCH.
- Se utiliza para enviar datos más complejos (JSON, formularios, etc.).

## Diferencia clave entre ?? y ||:

**??** (fusión nula) solo considera null y undefined como valores "falsy".

**||** (OR lógico) considera "falsy" a cualquier valor evaluado como falso en JavaScript, incluyendo 0, false, '' (cadena vacía), y null/undefined.

**¿Cuál usar?**

- Usa ?? si quieres que valores como 0, '', o false sean considerados válidos.

Ejemplo:

Cuando process.env.PORT puede ser 0 (puerto válido para algunas aplicaciones).
**`const PORT = process.env.PORT ?? 3000;`** <small><i>// Si PORT = 0, no usa 3000</i></small>

Usa || si quieres un valor predeterminado en caso de que process.env.PORT sea cualquier valor "falsy" (incluyendo 0 o una cadena vacía).
**`const PORT = process.env.PORT || 3000;`** <small><i>// Si PORT = 0, usará 3000</i></small>

## Un chunk:
Es un bloque de datos o una porción parcial de un flujo de datos (stream). En Node.js, los flujos de datos son utilizados para procesar información de manera eficiente, especialmente cuando trabajamos con grandes volúmenes de datos (como archivos, transmisiones de red o cuerpos de solicitudes HTTP).
Cuando llega información (como el cuerpo de una petición HTTP), no se recibe como un paquete completo de una sola vez, sino que se divide en chunks para optimizar el rendimiento y minimizar el uso de memoria.

***Cómo funcionan los chunks en Node.js***

Flujo de datos (stream): Node.js trata los datos de entrada como un flujo continuo, donde los datos llegan en fragmentos o "chunks".

***Eventos del flujo: Los flujos emiten eventos como:***

***data:*** Cuando se recibe un nuevo chunk.
***end:*** Cuando se han recibido todos los chunks.
***error:*** Si ocurre un problema durante el proceso.

Tamaño de los chunks: Los chunks no tienen un tamaño fijo; su tamaño depende de cómo se transmite la información (por ejemplo, por red o archivo) y de las configuraciones del flujo.


## Codigo del proyecto que se debe entender
### Como Filtrar:
**movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))**

🔹 movies.filter(...)

***filter()*** devuelve un nuevo array con los elementos que cumplen la condición.
En este caso, cada movie se evalúa para ver si tiene al menos un género que coincida con genre.

🔹 movie.genre.some(...)

***movie.genre*** es un array de géneros, por ejemplo: ["Action", "Adventure"].
***some(...)*** verifica si al menos uno de los elementos del array cumple la condición.

**g.toLowerCase() === genre.toLowerCase()**
Convierte tanto g (el género en el array de la película) como genre (el género buscado) a minúsculas para hacer la comparación sin importar mayúsculas/minúsculas.

## Libreria Zod para validaciones

**¿Qué es Zod?**
Zod es una biblioteca de validación y tipado de datos para JavaScript y TypeScript. Te permite definir esquemas de validación para asegurarte de que los datos cumplen con ciertas reglas antes de usarlos en tu aplicación.

Es especialmente útil en Node.js y Express cuando necesitas validar datos recibidos en una API REST, como los que vienen en 
req.body, req.params o req.query.

---
## Diferencia entre JSON.parse y JSON.stringify

**JSON.parse: Convertir texto JSON en un objeto JavaScript**
`const jsonString = '{"name": "Daniel", "age": 30, "isStudent": false}';`
`const objeto = JSON.parse(jsonString);`

`console.log(objeto.name);`<small><i>// "Daniel"</i></small>
`console.log(objeto.age);` <small><i> // 30</i></small>

***¿Por qué es útil?***
Cuando recibes datos de un servidor (por ejemplo, con fetch), los datos vienen como una cadena de texto en formato JSON. Para poder trabajar con ellos en JavaScript, necesitas convertirlos en un objeto.

**JSON.stringify: Convertir un objeto JavaScript en texto JSON**

`const objeto = {
  name: "Daniel",
  age: 30,
  isStudent: false,
};`

`const jsonString = JSON.stringify(objeto);`

`console.log(jsonString); `<small><i>// '{"name":"Daniel","age":30,"isStudent":false}'</i></small>

***¿Por qué es útil?***
Cuando necesitas enviar datos a un servidor (por ejemplo, con fetch), debes enviarlos como una cadena de texto en formato JSON. JSON.stringify te permite convertir tu objeto JavaScript en ese formato.

---
## QUE ES UN MIDDLEWARE?

**Middleware** Es una función que se ejecuta antes o después de manejar una ruta. 
Se utiliza para implementar funcionalidades transversales, como la autenticación, el manejo de errores, la compresión y la validación de datos. 
Los middlewares se ejecutan en el orden en que se configuran. 
Para definir una función middleware, se necesitan tres parámetros: 

1. ***req*** El objeto de solicitud
2. ***res*** El objeto de respuesta
3. ***next*** La función que se invoca para continuar la cadena de middlewares

Algunos ejemplos de middlewares son: 

- ***body-parser:*** Analiza el cuerpo de las peticiones
- ***compression:*** Compresión
- ***connect-timeout:*** Tiempo máximo de espera
- ***cookie-parser:*** Manejo de cookies
- ***errorhandler:*** Manejador de errores
- ***express-session:*** Manejo de sesiones
- ***method-override:*** Sobreescritura de métodos HTTP
- ***morgar:*** Manejo de logs a nivel del servidor

---
# Arquitectura MVC

**MVC (Model-View-Controller)** es un patrón de diseño arquitectónico ampliamente utilizado en el desarrollo de software, especialmente en aplicaciones web. Su objetivo principal es separar la lógica de la aplicación en tres componentes principales: Modelo, Vista y Controlador. Esta separación facilita la organización del código, mejora la mantenibilidad y permite que diferentes equipos trabajen en partes distintas de la aplicación de manera independiente.

**Componentes del MVC**
***1. Modelo (Model)***
- ***Responsabilidad:*** Gestiona los datos y la lógica de negocio de la aplicación.
- ***Funciones:*** 
		- Acceder y manipular datos (por ejemplo, desde una base de datos).
		- Aplicar reglas de negocio (validaciones, cálculos, etc.).
		- Notificar a la Vista o al Controlador cuando los datos cambian.

Ejemplo: En una aplicación de películas, el Modelo se encargaría de obtener la lista de películas desde una base de datos y aplicar filtros o búsquedas.

***2. Vista (View)***
- Responsabilidad: Muestra la información al usuario (interfaz de usuario).
- Funciones: Presentar los datos proporcionados por el Modelo.
- No contiene lógica de negocio, solo se enfoca en cómo se muestran los datos.
- Puede ser una página HTML, una interfaz gráfica, etc.

Ejemplo: En la aplicación de películas, la Vista mostraría la lista de películas en una tabla o tarjetas.

***3. Controlador (Controller)***
- Responsabilidad: Actúa como intermediario entre el Modelo y la Vista.
- Funciones: Recibe las interacciones del usuario (por ejemplo, clics en botones o envíos de formularios).
- Decide qué acciones tomar (por ejemplo, actualizar el Modelo o cambiar la Vista).
- Llama al Modelo para obtener o modificar datos y luego actualiza la Vista.

Ejemplo: En la aplicación de películas, el Controlador manejaría la solicitud del usuario para filtrar películas por género, pediría los datos al Modelo y luego los enviaría a la Vista para mostrarlos.

**Flujo de Trabajo en MVC**
1. El usuario interactúa con la Vista (por ejemplo, hace clic en un botón).
2. La Vista envía la solicitud al Controlador.
3. El Controlador procesa la solicitud:
      - Llama al Modelo para obtener o modificar datos.
      - Decide qué Vista actualizar.

4. El Modelo realiza las operaciones necesarias (por ejemplo, consulta la base de datos).
5. El Controlador recibe los datos del Modelo y los envía a la Vista.
6. La Vista se actualiza para mostrar los nuevos datos al usuario.

**Ventajas del MVC**
***Separación de preocupaciones:***
Cada componente tiene una responsabilidad clara, lo que facilita la organización del código.

***Reutilización:***
El Modelo y la Vista pueden reutilizarse en diferentes partes de la aplicación.

***Mantenibilidad:***
Al estar separados, los cambios en un componente no afectan necesariamente a los otros.

***Escalabilidad:***
Facilita la adición de nuevas funcionalidades sin afectar el código existente.

***Trabajo en equipo:***
Los desarrolladores pueden trabajar en paralelo en el Modelo, la Vista y el Controlador.

---
## Que es un .findIndex() y .find()

**.findIndex() y .find() profundizando**

***¿Qué es un índice en un array?***
Un índice es la posición de un elemento dentro de un array. Los índices comienzan desde 0 para el primer elemento, 1 para el segundo, y así sucesivamente.

Ejemplo:
`const frutas = ["manzana", "banana", "naranja"];`

<small><i>- "manzana" está en el índice 0.</i></small>
<small><i>- "banana" está en el índice 1.</i></small>
<small><i>- "naranja" está en el índice 2.</i></small>

**findIndex()**
findIndex() es un método de los arrays en JavaScript que devuelve el índice del primer elemento que cumple una condición específica. Si ningún elemento cumple la condición, devuelve -1.

Sintaxis:
`array.findIndex((elemento, índice, array) => condición);`
- elemento: El elemento actual del array que se está evaluando.
- índice: El índice del elemento actual (opcional).
- array: El array sobre el que se está iterando (opcional).
- condición: Una función que define la condición que debe cumplir el elemento.

Ejemplo:
`const numeros = [10, 20, 30, 40, 50];`
`const indice = numeros.findIndex((numero) => numero > 25);`
`console.log(indice);`<small><i>// 2</i></small>

findIndex() recorre el array numeros y devuelve el índice del primer elemento que sea mayor que 25.
***En este caso, 30 es el primer número que cumple la condición, y está en el índice 2.***

¿Cuándo usar findIndex()?
- Cuando necesitas el índice de un elemento para realizar operaciones como:
- Eliminar el elemento con splice().
- Modificar el elemento directamente en el array.

Ejemplo:
`const indice = numeros.findIndex((numero) => numero === 30);`
`if (indice !== -1) 
{
  numeros.splice(indice, 1); 
}`
<small><i>numeros.splice(indice, 1); // Elimina el número 30</i></small>

---

**find()**
find() es un método de los arrays en JavaScript que devuelve el primer elemento que cumple una condición específica. Si ningún elemento cumple la condición, devuelve undefined.

Sintaxis:
`array.find((elemento, índice, array) => condición);`
Los parámetros son los mismos que en findIndex().

Ejemplo:
`const numeros = [10, 20, 30, 40, 50];`
`const resultado = numeros.find((numero) => numero > 25);`
`console.log(resultado);` <small><i>// 30</i></small>

find() recorre el array numeros y devuelve el primer elemento que sea mayor que 25.

***En este caso, 30 es el primer número que cumple la condición.***

***¿Cuándo usar find()?***
Cuando necesitas el elemento en sí y no su índice.

Ejemplo:
`const usuario = usuarios.find((user) => user.id === 123);`
`if (usuario) {
  console.log("Usuario encontrado:", usuario.nombre);
} else {
  console.log("Usuario no encontrado");
}`

---

## Diferencias clave entre findIndex() y find()

***Característica***	
***findIndex():*** El índice del primer elemento que cumple la condición.	Si no encuentra Devuelve -1. Uso común Cuando necesitas el índice para operaciones como splice().

***find():*** El primer elemento que cumple la condición. Si no encuentra Devuelve undefined. Uso común Cuando necesitas el objeto en sí.

**Ejemplo comparativo**
Supongamos que tienes un array de objetos que representan usuarios:

`const usuarios = [
  { id: 1, nombre: "Alice" },
  { id: 2, nombre: "Bob" },
  { id: 3, nombre: "Charlie" },
];`

***Usando findIndex()***
`const indice = usuarios.findIndex((user) => user.nombre === "Bob");`
`console.log(indice);`<small><i> // 1</i></small>

Devuelve el índice del usuario con nombre "Bob", que es 1.

***Usando find()***
`const usuario = usuarios.find((user) => user.nombre === "Bob");`
`console.log(usuario);`<small><i> // { id: 2, nombre: "Bob" }</i></small>

Devuelve el objeto completo del usuario con nombre "Bob".
