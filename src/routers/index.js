/* eslint-disable import/extensions */
import { Router } from 'express';

import likesRouter from './likesRouter.js';

import postRouter from "./postRouter.js";

import hashtagsRouter from './hashtagsRouter.js';

const router = Router();

router.use(postRouter);
router.use(likesRouter);
router.use(hashtagsRouter);

export default router;
