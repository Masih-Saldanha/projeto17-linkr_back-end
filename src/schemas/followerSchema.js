import joi from 'joi';

const followerSchema = joi.object({
    followerId: joi.required(),
    followedId: joi.required(),
});

export default followerSchema;