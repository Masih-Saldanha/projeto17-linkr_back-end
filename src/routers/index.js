import { Router } from "express";
import  authRouters  from "./authRouters.js";

const index = Router();
index.use(authRouters);

// index.use(ROUTER_AUTENTICAÇÃO);

export default index;