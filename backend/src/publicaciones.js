import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Crear una publicación
export const createPost = async (req, res) => {
    const { content } = req.body;
    const post = await prisma.publicacion.create({
      data: { 
        content, 
        usuarioId: req.user.id,
        createdAt: new Date(),
    },
    });
    res.json(post);
  };
  
  // Obtener todas las publicaciones
  export const getPosts = async (req, res) => {
    const posts = await prisma.publicacion.findMany({
      include: { usuario: true },
    });
    res.json(posts);
  };
  
  
  // Agregar un like a una publicación
  export const likePost = async (req, res) => {
    const { postId } = req.body;
    const post = await prisma.publicacion.update({
      where: { id: postId },
      data: { likes: { increment: 1 } },
    });
    res.json(post);
  };
  