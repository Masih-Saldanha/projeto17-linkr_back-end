/* eslint-disable import/extensions */
import { Router } from "express";
import authRouters  from "./authRouters.js";
import postRouter from './postRouter.js';
import usersRouter from './usersRouter.js';
import likesRouter from './likesRouter.js';
import hashtagsRouter from './hashtagsRouter.js';

const router = Router();

router.use(authRouters);
router.use(postRouter);
router.use(usersRouter);
router.use(likesRouter);
router.use(hashtagsRouter);

export default router;
