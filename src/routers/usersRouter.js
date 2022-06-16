import { Router } from 'express';
import { getUserInfos } from '../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get('/user/:id', getUserInfos)

export default usersRouter;