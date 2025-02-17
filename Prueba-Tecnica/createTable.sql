-- Creación de la base de datos
DROP DATABASE IF EXISTS employeetransfer;
CREATE DATABASE employeetransfer;

-- Usar la base de datos
USE employeetransfer;


-- Creación de la tabla de usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único de usuario (se incrementa automáticamente).
  nombre VARCHAR(255) NOT NULL, -- Nombre del usuario (obligatorio).
  email VARCHAR(255) UNIQUE NOT NULL, -- Correo electrónico único (obligatorio).
  password VARCHAR(255) NOT NULL, -- Contraseña del usuario (obligatorio).
  role ENUM('admin', 'trabajador') NOT NULL DEFAULT 'trabajador', -- roles
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha y hora en que se creó el usuario.
);


-- Creación de la tabla de traslados
CREATE TABLE traslados (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único del traslado (se incrementa automáticamente).
  nombre_trabajador VARCHAR(255) NOT NULL, -- Nombre del trabajador que realiza el traslado (obligatorio).
  direccion_inicio VARCHAR(255) NOT NULL, -- Dirección de inicio del viaje (obligatorio).
  direccion_fin VARCHAR(255) NOT NULL, -- Dirección de destino del viaje (obligatorio).
  medio_transporte ENUM( -- Tipo de transporte utilizado en el traslado (obligatorio).
    'Metro',
    'Auto (Gasolina)',
    'Camioneta (Diésel)',
    'Motocicleta (Gasolina)',
    'Bus Transantiago',
    'Bus (Privado)',
    'Avión (Nacional)',
    'Avión (Internacional)',
    'Caminando'
  ) NOT NULL,
  fecha_viaje DATE NOT NULL, -- Fecha en que se realizó el viaje (obligatorio).
  kilometros FLOAT NOT NULL, -- Distancia recorrida en kilómetros (obligatorio).
  ida_y_vuelta BOOLEAN NOT NULL, -- Indica si el viaje es ida y vuelta (true o false).
  huella_carbono FLOAT NOT NULL, -- Cálculo de la huella de carbono del traslado (obligatorio).
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha y hora en que se registró el traslado.
);

-- Insertar datos usuarios(referencias)
INSERT INTO usuarios (nombre, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2a$10$U1JmF/QxXUNOrUg5RZqB3eBZBRHd9Y8NbbdZ8tE0KP0tQ/6MZ7zJm', 'admin'),
('Juan Pérez', 'juan@example.com', '$2a$10$U1JmF/QxXUNOrUg5RZqB3eBZBRHd9Y8NbbdZ8tE0KP0tQ/6MZ7zJm', 'trabajador'),
('María López', 'maria@example.com', '$2a$10$U1JmF/QxXUNOrUg5RZqB3eBZBRHd9Y8NbbdZ8tE0KP0tQ/6MZ7zJm', 'trabajador');

-- Insertar datos traslados(referencias)
INSERT INTO traslados (nombre_trabajador, direccion_inicio, direccion_fin, medio_transporte, fecha_viaje, kilometros, ida_y_vuelta, huella_carbono) VALUES
('Juan Pérez', 'Avenida Siempre Viva 742', 'Plaza Mayor', 'Auto (Gasolina)', '2025-02-15', 15.5, true, 6.51),
('María López', 'Calle 23', 'Terminal de Buses', 'Metro', '2025-02-14', 10.2, false, 0.34),
('Juan Pérez', 'Estación Central', 'Aeropuerto', 'Avión (Nacional)', '2025-02-16', 500, false, 139.5);


