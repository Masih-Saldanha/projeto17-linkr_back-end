/* eslint-disable import/extensions */
import { Router } from 'express';

import likesRouter from './likesRouter.js';

import postRouter from "./postRouter.js";

const router = Router();

router.use(postRouter);
router.use(likesRouter);

export default router;
