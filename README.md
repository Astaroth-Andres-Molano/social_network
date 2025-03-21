Proyecto: Red Social con Node.js, React y Prisma
1. Descripción del Proyecto
Este proyecto consiste en una aplicación de red social básica, que permite a los usuarios registrarse, iniciar sesión, publicar mensajes, dar "likes" a las publicaciones y visualizar un perfil de usuario. El backend está desarrollado con Node.js, utilizando Express.js para las rutas y Prisma ORM para interactuar con la base de datos PostgreSQL. El frontend se desarrolla con React y se utiliza React Router para la navegación entre páginas.
2. Requisitos
Backend:

    - Node.js: Versión 18.20.7
    - Express.js: Para manejar las rutas y solicitudes.
    - Prisma ORM: Para interactuar con la base de datos PostgreSQL.
    - PostgreSQL: Base de datos para almacenar usuarios, publicaciones y likes.
    - JWT: Para autenticación de usuarios.
    
Frontend:

    - React.js: Librería para la creación de la interfaz de usuario.
    - React Router: Para la navegación entre las diferentes rutas de la aplicación.
    - CSS: Para el diseño de la interfaz.
    
3. Estructura del Proyecto

```
project-root/
├── backend/
│   ├── src/
│   │   ├── auth.js
│   │   ├── publicaciones.js
│   │   └── ...
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Posts.js
│   │   │   └── ...
│   ├── Dockerfile
│   ├── package.json
│   └── public/
├── docker-compose.yml
└── README.md
```

4. Instrucciones de Instalación
A. Puesta en marcha en Local (sin Docker)

1. Clona el repositorio en tu máquina local.
   
   ```bash
   git clone <repo_url>
   ```

2. Navega a la carpeta **`backend`** y ejecuta los siguientes comandos:

   - Instala las dependencias del backend:

    ```
     cd backend
     npm install
    ```

   - Crea el archivo **`.env`** con la cadena de conexión a la base de datos (solo modificar si se va a trabajar en Local sin Docker, de lo contrario dejarla como está):

     ```
     DATABASE_URL="postgresql://postgres:12345@localhost:5432/social_network?schema=public"
     ```

   - Ejecuta las migraciones de Prisma para crear las tablas en la base de datos:

     ```
     npx prisma migrate dev --name init
     ```

   - Crea el cliente de Prisma:

     ```
     npx prisma generate
     ```

3. Levanta el backend:

   ```bash
   npm start
   ```

B. Puesta en marcha en Docker

1. Asegúrate de tener **Docker** y **Docker Compose** instalados.
2. En la raíz del proyecto, donde está el archivo **`docker-compose.yml`**, ejecuta:

   ```
   docker-compose up --build
   ```

   Esto construirá las imágenes de **backend** y **frontend** y levantará los contenedores de Docker correspondientes.

3. Una vez que el proceso termine, podrás acceder al frontend en **`http://localhost`** y al backend en **`http://localhost:5000`**.

4. Para insertar usuarios predefinidos en la base de datos, ejecuta el siguiente comando dentro del contenedor **backend**:

   ```
   docker-compose exec backend npm run seed
   ```

C. Configuración de Nginx (para producción)

Si estás utilizando **Nginx** como servidor para servir el frontend, asegúrate de tener la configuración adecuada para que React Router maneje las rutas en lugar de hacer solicitudes directas al servidor. En el archivo de configuración **`nginx.conf`**, asegúrate de tener:

```
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;

    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```



