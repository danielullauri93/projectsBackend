import express from 'express';
import { corsMiddleware } from './middlewares/cors.middleware.js';
import routes from './routes/movies.routes.js';

// Configuración del server en express
const app = express();

app.disable('x-powered-by'); // desabilitar  el header de express

// Middleware nativo de express para leer los datos del cuerpo de la petición en formato JSON
app.use(express.json());

// Esto habilita el CORS para todas las rutas que hay en el archivo movies.routes.js 
// Usamos el middleware cors para todas las rutas que hay en nuestra app.js
app.use(corsMiddleware());

// Importamos las rutas de nuestro archivo movies.routes.js
app.use('/movies', routes);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
