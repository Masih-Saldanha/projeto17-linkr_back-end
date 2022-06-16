import { Router } from 'express';

import { likePost, dislikePost } from '../controllers/likesController.js';
import { validaHeader } from '../middlewares/authMiddleware.js';

const likesRouter = Router();

likesRouter.post('/like/:idPost', validaHeader, likePost);
likesRouter.delete('/like/:idPost', validaHeader, dislikePost);

export default likesRouter;
