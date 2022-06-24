/* eslint-disable no-restricted-syntax */
import urlMetadata from 'url-metadata';

import postRepository from '../repositories/postRepository.js';
import likesRepository from '../repositories/likesRepository.js';

export async function validateUrlMetadata(req, res, next) {
  try {
    const metadata = await urlMetadata(req.body.link);

    next();
  } catch (error) {
    console.log(error);
    res.status(400).send('Esse link não é aceito, envie um link válido');
  }
}

export async function urlMetadataFormater(req, res, next) {
  const page = req.params.page;
  const { user } = res.locals;
  const { id } = req.params;
  try {
    if (!id) {
      const followerList = await postRepository.searchFollowerId(user.id);
      if (followerList.rowCount === 0) return res.status(200).send("You don't follow anyone yet. Search for new friends!");
    }
    const { rows: postsList } = id ? await postRepository.getPostsByUserId(id) : await postRepository.getPostsList(user.id, page * 10);
    if (postsList.length === 0 && !id) return res.status(200).send("No posts found from your friends");
    const formatedPostsList = [];
    for (let post of postsList) {
      const { link } = post;
      const metadata = await urlMetadata(link);
      const checkLike = await likesRepository.checkIfPostIsLiked(user.id, post.postId);
      const newObject = {
        likedByUser: (checkLike.rowCount > 0),
        linkUrl: link,
        linkTitle: metadata.title,
        linkDescription: metadata.description,
        linkImage: metadata.image,
      };
      post = { ...post, link: newObject };
      formatedPostsList.push(post);
    }

    res.locals.formatedPostsList = formatedPostsList;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function validateEditPost(req, res, next) {
  const postId = req.params.postId;
  const postIdToInteger = parseInt(postId);
  const user = res.locals.user;
  try {
    const post = await postRepository.searchPostId(postIdToInteger, user.id);
    const postObject = post.rows[0];
    if (post.rowCount === 0) {
      return res.status(404).send(`Post not found, it doesn't exist or user is not the post creator.`)
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}