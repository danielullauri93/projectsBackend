import cors from 'cors'

const ACEPPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:3000',
  'https://myapp.com',
];
export const corsMiddleware = ({ acceptedOrigins = ACEPPTED_ORIGINS }) => cors(
  {
    origin: (origin, callback) => {


      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    }
  }
)