import jwt from 'jsonwebtoken';
const { sign } = jwt;  // Solo necesitamos 'sign'
import { compare, hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario || !(await compare(password, usuario.password))) {
    return res.status(400).json({ error: 'Credenciales inválidas' });
  }

  const token = sign({ id: usuario.id }, 'SECRET_KEY', { expiresIn: '1h' });
  res.json({ token });
};

export const register = async (req, res) => {
  const { email, password, nombre } = req.body;
  const hashedPassword = await hash(password, 10);

  const usuario = await prisma.usuario.create({
    data: { email, password: hashedPassword, nombre },
  });

  res.json(usuario);
};


