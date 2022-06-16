/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
import 'dotenv/config';

// eslint-disable-next-line import/extensions
import hashtagsRepository from '../repositories/hashtagsRepository.js';

export async function getTrendingHashtags(req, res) {
  try {
    const { rows: hashtagsTrending } = await hashtagsRepository.getTrendingHashtags();
    res.status(200).send(hashtagsTrending);
  } catch (e) {
    console.log('Erro ao buscar trending hashtags', e);
    res.status(500).send(e);
  }
}

export async function getHashtagsByHashtag(req, res) {
  try {
    const { hashtag } = req.params;
    const { rows: hashtags } = await hashtagsRepository.getHashtagsByHashtag(hashtag);
    res.status(200).send(hashtags);
  } catch (e) {
    console.log('Erro ao buscar lista de hashtags por hashtag', e);
    res.status(500).send(e);
  }
}
