/* eslint-disable import/extensions */
import { Router } from 'express';

import { getCommentsByPostId, getQtyCommentsByPostId, addComment } from '../controllers/commentsController.js';
import { validaHeader } from '../middlewares/authMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import commentsSchema from '../schemas/commentsSchema.js';

const commentsRouter = Router();

commentsRouter.get('/comment/qty/:postId', validaHeader, getQtyCommentsByPostId);
commentsRouter.get('/comment/:postId', validaHeader, getCommentsByPostId);
commentsRouter.post('/comment', validaHeader, validateSchema(commentsSchema.addCommentSchema), addComment);

export default commentsRouter;
