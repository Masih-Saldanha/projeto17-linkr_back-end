import { Router } from "express";

import { getPosts, publishPost } from "../controllers/postController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import postSchema from "../schemas/postSchema.js";

const postRouter = Router();

 // FIXME: Precisa de middleware de autenticação:
postRouter.post("/posts", validateSchema(postSchema), publishPost);
 // FIXME: Precisa de middleware de autenticação:
postRouter.get("/posts", getPosts);

export default postRouter;