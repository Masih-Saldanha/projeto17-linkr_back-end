/* eslint-disable import/extensions */
import { Router } from 'express';

import { getTrendingHashtags, getHashtagsByHashtag } from '../controllers/hashtagsController.js';
import { validaHeader } from '../middlewares/authMiddleware.js';

const hashtagsRouter = Router();

hashtagsRouter.get('/hashtag/trending', validaHeader, getTrendingHashtags);
hashtagsRouter.get('/hashtag/:hashtag', validaHeader, getHashtagsByHashtag);

export default hashtagsRouter;
