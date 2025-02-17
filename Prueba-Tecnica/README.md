Proyecto de Gestión de Traslados
================================

Descripción
-----------

Este proyecto permite registrar, visualizar, buscar, editar y eliminar traslados, además de calcular la huella de carbono generada. También permite exportar la información en formato Excel.

Requisitos
----------

-   **Node.js 20** (Vite no soporta la última versión de Node)
-   **MySQL** como base de datos

Instalación y Configuración
---------------------------

1.  **Clonar el repositorio:**

    ```
    git clone <URL_DEL_REPOSITORIO>
    cd Prueba-Tecnica

    ```

2.  **Instalar dependencias:**

    ```
    npm install

    ```

3.  **Configurar las variables de entorno:**

    -   Crear un archivo `.env` en la raíz del proyecto con los siguientes valores:

        ```
        PORT=3000
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=tu_contraseña
        DB_NAME=nombre_base_de_datos
        JWT_SECRET=clave_secreta

        ```

4.  **Iniciar la base de datos:**

    -   Asegúrate de tener MySQL corriendo y con la base de datos configurada.

Ejecución del Proyecto
----------------------

### Backend

Desde la raíz del proyecto, ejecutar:

```
npm run dev

```

El servidor se ejecutará en `http://localhost:3000`

### Frontend

Desde la carpeta `views`, ejecutar:

```
cd views
npm run dev

```

El frontend se ejecutará en `http://localhost:5173`

Funcionalidades
---------------

-   Autenticación de usuarios (registro e inicio de sesión)
-   Registro y gestión de traslados
-   Búsqueda de traslados por nombre, dirección de inicio y dirección de fin
-   Edición y eliminación de traslados
-   Cálculo automático de la huella de carbono
-   Descarga de reportes en Excel

Consideraciones
---------------

-   Algunas funciones pueden contener errores, pido disculpas por ello.
-   Si encuentras problemas, intenta asegurarte de que las variables de entorno y la base de datos están configuradas correctamente.
-   Si usas una versión de Node superior a 20, podrías encontrar problemas de compatibilidad con Vite.

Autor
-----

**Daniel Ullauri**