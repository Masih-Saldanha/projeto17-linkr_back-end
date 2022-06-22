import joi from 'joi';

const addCommentSchema = joi.object({
  userId: joi.required(),
  postId: joi.required(),
  comment: joi.string().required(),
});

const getCommentSchema = joi.object({
  postId: joi.required(),
});

export default { addCommentSchema, getCommentSchema };
