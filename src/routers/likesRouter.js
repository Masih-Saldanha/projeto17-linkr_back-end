import { Router } from 'express';

import { likePost, dislikePost } from '../controllers/likesController.js';

const likesRouter = Router();

likesRouter.post('/like/:idPost', likePost);
likesRouter.delete('/like/:idPost', dislikePost);

export default likesRouter;
