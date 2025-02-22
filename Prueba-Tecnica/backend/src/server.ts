import app from "./app";

const PORT = process.env.HOST_PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
