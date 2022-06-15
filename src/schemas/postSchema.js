import joi from "joi";

const postSchema = joi.object({
    description: joi.string().max(140),
    link: joi.string().uri().required()
});

export default postSchema;