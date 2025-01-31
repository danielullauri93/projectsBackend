const z = require('zod');

const movieSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Movie title must be a string',
      required_error: 'Movie title is required',
    })
    .min(1)
    .max(100),
  year: z.number().int().min(1900).max(2025),
  director: z.string().min(1).max(100),
  duration: z.number().int().min(1).max(500),
  poster: z.string().url({
    message: 'Movie poster must be a valid URL',
  }),
  genre: z.array(
    z.enum(
      [
        'Action',
        'Adventure',
        'Comedy',
        'Crime',
        'Drama',
        'Fantasy',
        'Horror',
        'Thriller',
        'Sci-Fi',
        'Romance',
      ],
      {
        required_error: 'Movie genre is required',
        invalid_type_error: 'Movie genre must be an array of enum Genre',
      }
    )
  ),
  rate: z.number().min(0).max(10).default(5),
});

function validateMovie(input) {
  // function valdateMovie es un validador de peliculas
  return movieSchema.safeParse(input); // safeParse retorna un objeto con un atributo data y un atributo error
}

function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input); // partial() permite que el objeto sea parcial y no sea necesario que tenga todos los campos
}

module.exports = {
  validateMovie,
  validatePartialMovie,
};
