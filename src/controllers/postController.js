/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
/* eslint-disable space-before-blocks */
/* eslint-disable no-restricted-syntax */
import hashtagsRepository from '../repositories/hashtagsRepository.js';
import postRepository from '../repositories/postRepository.js';
import convertHashtags from '../utils/convertHashtags.js';

// FIXME: PRECISA ITERAR description PARA BUSCAR HASHTAGS E
// ENVIAR NA TABELA DE hashtags. FAZER ITERAÇÃO NO MIDDLEWARE.
export async function publishPost(req, res) {
  const { description, link } = req.body;
  const { user } = res.locals;
  const userId = user.id;
  // console.log("link: ", link);
  // console.log("description: ", description);
  // console.log("userId: ", userId);
  try {
    const newPost = await postRepository.createPost(description, link, userId);
    const postId = newPost.rows[0].id;
    // console.log("postId: ", postId);
    if (description) {
      const hashtags = convertHashtags(description);
      if (hashtags.length > 0) {
        for (let hashtag of hashtags){
          await hashtagsRepository.addHashtag(hashtag, postId);
        }
      }
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function editPost(req, res) {
  const { postId } = req.params;
  const postIdToInteger = parseInt(postId);
  // console.log(postIdToInteger);

  // console.log(req.body.description);

  const { user } = res.locals;
  // console.log(user);
  try {
    const dados = await postRepository.editPostByPostId(req.body.description, postIdToInteger, user.id);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function deletePost(req, res) {
  const { postId } = req.params;
  const postIdToInteger = parseInt(postId);
  // console.log(postIdToInteger);

  // console.log(req.body.description);

  const { user } = res.locals;
  // console.log(user);
  try {
    await postRepository.deleteLikesByPostId(postIdToInteger);
    await postRepository.deleteHashtagsByPostId(postIdToInteger);
    await postRepository.deletePostById(postIdToInteger, user.id);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getPosts(req, res) {
  const { formatedPostsList } = res.locals;
  try {
    // FIXME: PODE-SE TENTAR LÓGICA DE PAGINAÇÃO AQUI DEPOIS.
    res.status(200).send(formatedPostsList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
