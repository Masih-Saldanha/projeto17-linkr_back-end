import { Router } from "express";

import likesRouter from "./likesRouter.js";

const index = Router();

index.use(likesRouter);

// index.use(ROUTER_AUTENTICAÇÃO);

export default index;