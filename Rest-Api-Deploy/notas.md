
# Título Principal  
## Subtítulo  

**Negrita**  
*Cursiva*  
~~Tachado~~  

- Lista con viñetas
1. Lista numerada  

> Esto es una cita

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
**Diferencias entre req.params, req.query, y req.body**

1. req.params:	En la URL como parte de la ruta (parámetros dinámicos) -	Para identificar un recurso específico, como un ID.
2. req.query:	En la URL después de ? como parámetros de consulta - Para filtros, búsquedas, o configuraciones opcionales.
3. req.body:	En el cuerpo de la solicitud (JSON, formularios, etc.) -	Para enviar datos grandes o estructurados, como formularios o datos JSON.

**req.params**
- Contiene los parámetros dinámicos de la URL, definidos en la ruta del servidor.
- Se utiliza cuando defines parámetros dinámicos en la ruta utilizando : (por ejemplo, /movies/:id).
**req.query**
- Contiene los parámetros de consulta (query parameters) enviados en la URL después de ?.
- Se utiliza para filtros, búsquedas o datos opcionales que no forman parte de la ruta.
req.body
- Contiene los datos enviados en el cuerpo de la solicitud HTTP, típicamente en métodos como POST, PUT, o PATCH.
- Se utiliza para enviar datos más complejos (JSON, formularios, etc.).
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
**Diferencia clave entre ?? y ||:**
**??** (fusión nula) solo considera null y undefined como valores "falsy".
**||** (OR lógico) considera "falsy" a cualquier valor evaluado como falso en JavaScript, incluyendo 0, false, '' (cadena vacía), y null/undefined.

**¿Cuál usar?**

- Usa ?? si quieres que valores como 0, '', o false sean considerados válidos.

Ejemplo: Cuando process.env.PORT puede ser 0 (puerto válido para algunas aplicaciones).

**const PORT = process.env.PORT ?? 3000; // Si PORT = 0, no usa 3000**

- Usa || si quieres un valor predeterminado en caso de que process.env.PORT sea cualquier valor "falsy" (incluyendo 0 o una cadena vacía).

**const PORT = process.env.PORT || 3000; // Si PORT = 0, usará 3000**


––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
**Un chunk** es un bloque de datos o una porción parcial de un flujo de datos (stream). En Node.js, los flujos de datos son utilizados para procesar información de manera eficiente, especialmente cuando trabajamos con grandes volúmenes de datos (como archivos, transmisiones de red o cuerpos de solicitudes HTTP).
Cuando llega información (como el cuerpo de una petición HTTP), no se recibe como un paquete completo de una sola vez, sino que se divide en chunks para optimizar el rendimiento y minimizar el uso de memoria.

Cómo funcionan los chunks en Node.js

Flujo de datos (stream): Node.js trata los datos de entrada como un flujo continuo, donde los datos llegan en fragmentos o "chunks".


Eventos del flujo: Los flujos emiten eventos como:

data: Cuando se recibe un nuevo chunk.
end: Cuando se han recibido todos los chunks.
error: Si ocurre un problema durante el proceso.

Tamaño de los chunks: Los chunks no tienen un tamaño fijo; su tamaño depende de cómo se transmite la información (por ejemplo, por red o archivo) y de las configuraciones del flujo.

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
**movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))**
🔹 movies.filter(...)

**filter()** devuelve un nuevo array con los elementos que cumplen la condición.
En este caso, cada movie se evalúa para ver si tiene al menos un género que coincida con genre.
🔹 movie.genre.some(...)

**movie.genre** es un array de géneros, por ejemplo: ["Action", "Adventure"].
**some(...)** verifica si al menos uno de los elementos del array cumple la condición.

**g.toLowerCase() === genre.toLowerCase()**
Convierte tanto g (el género en el array de la película) como genre (el género buscado) a minúsculas para hacer la comparación sin importar mayúsculas/minúsculas.

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
**¿Qué es Zod?**
Zod es una biblioteca de validación y tipado de datos para JavaScript y TypeScript. Te permite definir esquemas de validación para asegurarte de que los datos cumplen con ciertas reglas antes de usarlos en tu aplicación.

Es especialmente útil en Node.js y Express cuando necesitas validar datos recibidos en una API REST, como los que vienen en 
req.body, req.params o req.query.


