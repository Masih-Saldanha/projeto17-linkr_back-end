/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */

import commentsRepository from '../repositories/commentsRepository.js';

export async function getCommentsByPostId(req, res) {
  try {
    const { postId } = req.params;
    const { rows: comentarios } = await commentsRepository.getCommentsByPostId(postId);
    res.status(200).send(comentarios);
  } catch (e) {
    console.log('Erro ao buscar lista de comentários do post', e);
    res.status(500).send(e);
  }
}

export async function addComment(req, res) {
  try {
    const { userId, postId, comment } = req.body;
    await commentsRepository.addComment(userId, postId, comment);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getQtyCommentsByPostId(req, res) {
  try {
    const { postId } = req.params;
    const { rows: quantidade } = await commentsRepository.getQtyCommentsByPostId(postId);
    res.status(200).send(quantidade);
  } catch (e) {
    console.log('Erro ao buscar quantidade de comentários do post', e);
    res.status(500).send(e);
  }
}