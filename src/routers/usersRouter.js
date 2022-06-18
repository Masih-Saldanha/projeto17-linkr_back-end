import { Router } from 'express';
import { getUserInfos } from '../controllers/usersController.js';
import { validaHeader } from '../middlewares/authMiddleware.js';
import { urlMetadataFormater } from '../middlewares/postMiddleware.js';

const usersRouter = Router();

usersRouter.get('/user/:id', [validaHeader, urlMetadataFormater], getUserInfos);

export default usersRouter;
