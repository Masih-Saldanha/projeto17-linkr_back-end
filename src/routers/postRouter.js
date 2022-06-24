import { Router } from 'express';

import { deletePost, editPost, getPosts, insertRepost, publishPost } from '../controllers/postController.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { validaHeader } from '../middlewares/authMiddleware.js';
import { urlMetadataFormater, validateEditPost, validateUrlMetadata } from '../middlewares/postMiddleware.js';
import postSchema from '../schemas/postSchema.js';

const postRouter = Router();

postRouter.post('/posts', [validaHeader, validateSchema(postSchema.postSchema), validateUrlMetadata], publishPost);
postRouter.put('/posts/:postId', validaHeader, validateSchema(postSchema.editPostSchema), validateEditPost, editPost);
postRouter.delete('/posts/:postId', validaHeader, validateEditPost, deletePost);
postRouter.get('/posts/:page', [validaHeader, urlMetadataFormater], getPosts);
postRouter.post('/reposts', validaHeader, insertRepost);

export default postRouter;
