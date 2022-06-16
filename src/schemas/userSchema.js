import joi from "joi";

const signinSchema = joi.object({
    email: joi.string().required().email().messages({
    'string.empty': 'informe um email',
    'string.email': 'informe um email válido'
    }),
    password: joi.string().required().messages({
    'string.empty': 'informe uma senha'
})
})

const signupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    username: joi.string().required(),
    picture: joi.string().uri().required(),
});

export default {signupSchema, signinSchema};