/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */

import commentsRepository from '../repositories/commentsRepository.js';

export async function getCommentsByPostId(req, res) {
  try {
    const { postid } = req.params;
    const { rows: comentarios } = await commentsRepository.getCommentsByPostId(postid);
    res.status(200).send(comentarios);
  } catch (e) {
    console.log('Erro ao buscar lista de comentários do post', e);
    res.status(500).send(e);
  }
}

export async function addComment(req, res) {
  try {
    const { userid, postid, comment } = req.body;
    await commentsRepository.addComment(userid, postid, comment);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
