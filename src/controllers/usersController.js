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

    const followersSearch = await usersRepository.getFollowersByUserId(id);
    const checkIfUserIsFollowing = followersSearch.rows.find(
      (follower) => follower.followerId === user.id,
    );

    const objToSend = {
      ...userSearch.rows[0],
      posts: formatedPostsList,
      followingAlready: checkIfUserIsFollowing !== undefined,
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

export async function getUsersByQuery(req, res) {
  const { user } = res.locals;
  const { query } = req.params;

  //   function orderUsers(users) {
  //     const searchOrdered = users.sort((a, b) => {
  //       if (b.userFollows === true) return -1;
  //       if (a.userFollows === true) return 1;
  //       return 0;
  //     });

  //     return searchOrdered;
  //   }

  //   function addFollowedTest(search, followedUsers) {
  //     const usernames = followedUsers.rows.map((followed) => followed.username);
  //     return search.rows.map((result) => (
  //       {
  //         ...result,
  //         userFollows: Object.values(usernames).find(result.username) !== undefined,
  //       }
  //     ));
  //   }

  try {
    const search = await usersRepository.getUsersByQuery(query);
    // const followedUsers = await usersRepository.getFollowersByUserIdWithUsername(user.id);

    // const usersWithFollowedUsersTest = addFollowedTest(search, followedUsers);
    // const orderedArr = orderUsers(usersWithFollowedUsersTest);

    res.status(200).send(search.rows);
  } catch (e) {
    console.log('Erro ao buscar a query do usuário', e);
    res.status(500).send(e);
  }
}
