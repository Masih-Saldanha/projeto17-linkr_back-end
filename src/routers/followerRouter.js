import { Router } from 'express';
import { validaHeader } from '../middlewares/authMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import followerSchema from '../schemas/followerSchema.js';
import { insertFollower, deleteFollower } from '../controllers/followerController.js';

const followerRouter = Router();

followerRouter.post('/follow', validaHeader, insertFollower);
followerRouter.post('/unfollow', validaHeader, deleteFollower);

export default followerRouter;
