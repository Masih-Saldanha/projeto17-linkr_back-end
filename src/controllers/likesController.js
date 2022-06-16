/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import postRepository from '../repositories/postRepository.js';
import likesRepository from '../repositories/likesRepository.js';

export async function likePost(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();

  if (!token) return res.status(401).send('Esta rota precisa do token de acesso');

  const { idPost } = req.params;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const postSearch = await postRepository.searchPostById(idPost);

    if (postSearch.rowCount === 0) return res.status(404).send('Post não encontrado');

    await likesRepository.insertLike(user.id, idPost);

    res.status(201).send('Like adicionado!');
  } catch (e) {
    res.status(500).send(e);
    console.log('Erro ao inserir like no banco de dados', e);
  }
}

export async function dislikePost(req, res) {
    const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();

  if (!token) return res.status(401).send('Esta rota precisa do token de acesso');

  const { idPost } = req.params;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const postSearch = await postRepository.searchPostById(idPost);

    if (postSearch.rowCount === 0) return res.status(404).send('Post não encontrado');

    await likesRepository.deleteLike(user.id, idPost);

    res.status(200).send('Like deletado!');
  } catch (e) {
    res.status(500).send(e);
    console.log('Erro ao deletar like no banco de dados', e);
  }
}