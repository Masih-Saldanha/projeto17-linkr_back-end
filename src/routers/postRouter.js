import { Router } from 'express';

import { getPosts, publishPost } from '../controllers/postController.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { validaHeader } from '../middlewares/authMiddleware.js';
import postSchema from '../schemas/postSchema.js';

const postRouter = Router();

// FIXME: Precisa de middleware de autenticação:
postRouter.post('/posts', [validaHeader, validateSchema(postSchema)], publishPost);
postRouter.get('/posts', validaHeader, getPosts);

export default postRouter;