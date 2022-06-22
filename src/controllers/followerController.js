import usersRepository from '../repositories/usersRepository.js';
import followerRepository from '../repositories/followerRepository.js';

export async function insertFollower(req, res) {
  const { followerId, followedId } = req.body;

  try {
    const followerSearch = await usersRepository.getUserInfoById(followerId);
    const followedSearch = await usersRepository.getUserInfoById(followedId);

    if (followerSearch.rowCount > 0 && followedSearch.rowCount > 0 && followerId !== followedId) {
      await followerRepository.insertFollower(followedId, followerId);
      return res.sendStatus(201);
    }

    res.status(422).send('Os usuários não existem ou colidem');
  } catch (e) {
    res.status(500).send(e);
    console.log('Erro ao dar follow no banco de dados', e);
  }
}

export async function deleteFollower(req, res) {
  const { followerId, followedId } = req.body;

  try {
    const followerSearch = await usersRepository.getUserInfoById(followerId);
    const followedSearch = await usersRepository.getUserInfoById(followedId);

    if (followerSearch.rowCount > 0 && followedSearch.rowCount > 0 && followerId !== followedId) {
      await followerRepository.deleteFollower(followedId, followerId);
      return res.sendStatus(200);
    }

    res.status(422).send('Os usuários não existem ou colidem');
  } catch (e) {
    res.status(500).send(e);
    console.log('Erro ao dar follow no banco de dados', e);
  }
}
