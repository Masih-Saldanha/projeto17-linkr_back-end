/* eslint-disable import/extensions */
import { Router } from 'express';

import { getCommentsByPostId, addComment } from '../controllers/commentsController.js';
import { validaHeader } from '../middlewares/authMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import commentsSchema from '../schemas/commentsSchema.js';

const commentsRouter = Router();

commentsRouter.get('/comment/:postid', validaHeader, validateSchema(commentsSchema.getCommentSchema), getCommentsByPostId);
commentsRouter.post('/comment', validaHeader, validateSchema(commentsSchema.addCommentSchema), addComment);

export default commentsRouter;
