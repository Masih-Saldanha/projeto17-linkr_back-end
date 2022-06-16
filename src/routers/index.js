import { Router } from "express";

import postRouter from "./postRouter.js";

import usersRouter from './usersRouter.js';

const router = Router();

router.use(postRouter);
router.use(usersRouter);

export default router;