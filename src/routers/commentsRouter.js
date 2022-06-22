/* eslint-disable import/extensions */
import { Router } from 'express';

import { getCommentsByPostId, addComment } from '../controllers/commentsController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import commentsSchema from '../schemas/commentsSchema.js';

const commentsRouter = Router();

commentsRouter.get('/comment/:postid', validateSchema(commentsSchema.getCommentSchema), getCommentsByPostId);
commentsRouter.post('/comment', validateSchema(commentsSchema.addCommentSchema), addComment);

export default commentsRouter;
