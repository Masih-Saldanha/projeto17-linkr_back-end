import { Router } from 'express';
import { getUserInfos, getUserPicture, getUsersByQuery } from '../controllers/usersController.js';
import { validaHeader } from '../middlewares/authMiddleware.js';
import { urlMetadataFormater } from '../middlewares/postMiddleware.js';

const usersRouter = Router();

usersRouter.get('/user/:id', [validaHeader, urlMetadataFormater], getUserInfos);
// ta assim pra evitar conflito com a requisição acima
usersRouter.get('/picture/user', validaHeader, getUserPicture);
usersRouter.get('/search/:query', validaHeader, getUsersByQuery);

export default usersRouter;
