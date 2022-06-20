/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
import 'dotenv/config';

import postRepository from '../repositories/postRepository.js';
import likesRepository from '../repositories/likesRepository.js';

export async function likePost(req, res) {
  const { idPost } = req.params;
  const { user } = res.locals;

  try {
    const postSearch = await postRepository.searchPostById(idPost);

    if (postSearch.rowCount === 0) return res.status(404).send('Post não encontrado');

    await likesRepository.insertLike(user.id, idPost);

    res.status(201).send('Like adicionado!');
  } catch (e) {
    res.status(500).send(e);
    console.log('Erro ao inserir like no banco de dados', e);
  }
}

export async function getUsersWhoLiked(req, res) {
  const { idPost } = req.params;
  const { user } = res.locals;

  try {
    const likeSearch = await likesRepository.getUsers(idPost);

    const checkIfUserLiked = likeSearch.rows.find((like) => like.userId === user.id);

    res.status(200).send({
      likes: likeSearch.rows,
      userLiked: checkIfUserLiked,
    });
  } catch (e) {
    res.status(500).send(e);
    console.log('Erro ao buscar likes no banco de dados', e);
  }
}

export async function dislikePost(req, res) {
  const { idPost } = req.params;
  const { user } = res.locals;

  try {
    const postSearch = await postRepository.searchPostById(idPost);

    if (postSearch.rowCount === 0) return res.status(404).send('Post não encontrado');

    await likesRepository.deleteLike(user.id, idPost);

    res.status(200).send('Like deletado!');
  } catch (e) {
    res.status(500).send(e);
    console.log('Erro ao deletar like no banco de dados', e);
  }
}
