import jwt from 'jsonwebtoken';
import 'dotenv/config';
import usersRepository from '../repositories/usersRepository.js';
import postRepository from '../repositories/likesRepository.js';

export async function getUserInfos(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();

  if (!token) return res.status(401).send('Esta rota precisa de um token de acesso');

  const { id } = req.params;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const userSearch = await usersRepository.getUserInfoById(id);

    if (userSearch.rowCount === 0) return res.status(404).send('Usuário inexistente');

    // TODO: buscar as hashtags correspondentes na query também

    const userPosts = await postRepository.getPostsByUserId(id);

    const objToSend = { ...userSearch.rows[0], posts: userPosts.rows };

    res.status(200).send(objToSend);
  } catch (e) {
    res.status(500).send(e);
    console.log('Erro ao buscar os dados do usuário', e);
  }
}
