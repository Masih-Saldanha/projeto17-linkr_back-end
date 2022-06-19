import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import userSchema from '../schemas/userSchema.js';
import { signup, signin } from '../controllers/authController.js';
// import signUpSchema from "../schemas/signUpSchema.js";
// import SigninValidation from "../schemas/signinSchema.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(userSchema.signupSchema), signup);
// authRouter.post("/signin", validateSchema(userSchema.signinSchema), signin);
authRouter.post('/signin', validateSchema(userSchema.signinSchema), signin);

export default authRouter;
