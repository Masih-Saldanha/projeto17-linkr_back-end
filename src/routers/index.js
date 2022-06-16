/* eslint-disable import/extensions */
import { Router } from 'express';

import likesRouter from './likesRouter.js';
import postRouter from './postRouter.js';
import usersRouter from './usersRouter.js';

import hashtagsRouter from './hashtagsRouter.js';

const router = Router();

router.use(postRouter);
router.use(usersRouter);
router.use(likesRouter);
router.use(hashtagsRouter);

export default router;
