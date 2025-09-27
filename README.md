<h1 align="center">
  Developer - 4Z4C
</h1>
<div align="center">
  <img src="https://images.icon-icons.com/2699/PNG/512/nodejs_logo_icon_169910.png" alt="Node.js Logo" width="175"/>
</div>

<br/>

1. Clonar el `.env.template` y crear el `.env`.
2. Ejecutar el comando `docker compose up -d`.
3. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```
4. Correr la semilla de datos:
   ```bash
   npm run seed
   ```
5. Levantar el backend en modo desarrollo:
   ```bash
   npm run start:dev
   ```

### Dependencias principales utilizadas en el proyecto:

- **express**: Framework web para Node.js.
- **jsonwebtoken**: Para la generación y validación de tokens JWT.
- **bcryptjs**: Para el hashing de contraseñas.
- **dotenv**: Para manejar variables de entorno.
- **nodemailer**: Para el envío de correos electrónicos.
- **@prisma/client**: Cliente de Prisma para interactuar con la base de datos.
- **zod**: Para validación y manejo de esquemas de datos.

### Dependencias de desarrollo:

- **typescript**: Para añadir tipado estático al proyecto.
- **ts-node-dev**: Para ejecutar el proyecto en modo desarrollo con soporte para TypeScript.
- **rimraf**: Para limpiar directorios durante el proceso de construcción.
- **prisma**: Herramienta de Prisma para manejar migraciones y el esquema de la base de datos.

> **Nota:** No es necesario ejecutar `npx prisma migrate dev` si las migraciones ya están aplicadas en la base de datos. Solo asegúrate de que la base de datos esté sincronizada con el esquema actual.
