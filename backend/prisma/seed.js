const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Borrar todos los usuarios existentes antes de insertar los nuevos
  await prisma.usuario.deleteMany();

  // Crear usuarios predefinidos con contraseñas hasheadas
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('password123', 10);
  const hashedPassword3 = await bcrypt.hash('password123', 10);

  const user1 = await prisma.usuario.create({
    data: {
      email: 'usuario1@ejemplo.com',
      password: hashedPassword1,
      nombre: 'Usuario de Prueba 1',
    },
  });

  const user2 = await prisma.usuario.create({
    data: {
      email: 'usuario2@ejemplo.com',
      password: hashedPassword2,
      nombre: 'Usuario de Prueba 2',
    },
  });

  const user3 = await prisma.usuario.create({
    data: {
      email: 'usuario3@ejemplo.com',
      password: hashedPassword3,
      nombre: 'Usuario de Prueba 3',
    },
  });

  console.log('Usuarios predefinidos creados:', user1, user2, user3);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
