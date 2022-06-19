/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import usersRepository from '../repositories/usersRepository.js';
import postRepository from '../repositories/likesRepository.js';

export async function getUserInfos(req, res) {
  const { id } = req.params;
  const { user, formatedPostsList } = res.locals;

  try {
    const userSearch = await usersRepository.getUserInfoById(id);

    if (userSearch.rowCount === 0) return res.status(404).send('Usuário inexistente');

    const objToSend = {
      ...userSearch.rows[0],
      posts: formatedPostsList,
    };

    res.status(200).send(objToSend);
  } catch (e) {
    console.log('Erro ao buscar os dados do usuário', e);
    res.status(500).send(e);
  }
}

export async function getUserPicture(req, res) {
  const { id } = res.locals.user;
  try {
    const { rows: userPicture } = await usersRepository.getUserPictureByUserId(id);
    res.status(200).send(userPicture[0]);
  } catch (error) {
    console.log('Erro ao buscar os dados do usuário', error);
    res.status(500).send(error);
  }
}