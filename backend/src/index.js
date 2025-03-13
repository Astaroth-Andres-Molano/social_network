import express, { json } from 'express';
import { login, register } from './auth.js';
import { createPost, getPosts, likePost } from './publicaciones.js';
import jwt from 'jsonwebtoken';  
const { verify } = jwt;
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  // Permite solicitudes desde cualquier origen
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
  
    // Si la solicitud es un preflight (OPTIONS), responde con un 200
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    next();
  });

app.use(json());

//Middle para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) return res.status(403).send('Token requerido');
  
  verify(token, 'SECRET_KEY', (err, user) => {
    if (err) return res.status(403).send('Token inválido');
    req.user = user;  //se guarda la información del usuario en la solicitud
    next();  
  });
};

//Obtención del usaerID a tráves del Tocken
app.get('/profile', verifyToken, async (req, res) => {
    const userId = req.user.id; 
  
    const user = await prisma.usuario.findUnique({
      where: {
        id: userId,  
      },
    });
  
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  
    res.json(user);  
  });

//Rutas de Autenticación
app.post('/login', login);
app.post('/register', register);

// Rutas de Publicaciones
app.post('/posts', verifyToken, createPost);
app.get('/posts', getPosts);
app.post('/posts/like', verifyToken, likePost);

app.listen(5000, () => {
  console.log('Backend corriendo en el puerto 5000');
});

