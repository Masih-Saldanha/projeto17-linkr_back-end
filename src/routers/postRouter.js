import { Router } from 'express';

import { deletePost, editPost, getPosts, publishPost } from '../controllers/postController.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { validaHeader } from '../middlewares/authMiddleware.js';
import { urlMetadataFormater, validateEditPost, validateUrlMetadata } from '../middlewares/postMiddleware.js';
import postSchema from '../schemas/postSchema.js';

const postRouter = Router();

// FIXME: Precisa de middleware de autenticação:
postRouter.post('/posts', [validaHeader, validateSchema(postSchema.postSchema), validateUrlMetadata], publishPost);
postRouter.put('/posts/:postId', validaHeader, validateSchema(postSchema.editPostSchema), validateEditPost, editPost);
postRouter.delete('/posts/:postId', validaHeader, validateEditPost, deletePost);
postRouter.get('/posts', validaHeader, urlMetadataFormater, getPosts);

export default postRouter;
