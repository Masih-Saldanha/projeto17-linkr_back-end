/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function validaHeader(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();
    if (!token) return res.status(401).send('Esta rota precisa do token de acesso');

    const user = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.user = user;

    next();
  } catch (e) {
    console.log('Erro ao validar header', e);
    return res.sendStatus(500);
  }
}
