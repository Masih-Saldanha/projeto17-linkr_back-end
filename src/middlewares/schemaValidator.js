/* eslint-disable import/prefer-default-export */
export function validateSchema(schema) {
  return (req, res, next) => {
    const schemaValidation = schema.validate(req.body, { abortEarly: false });
    if (schemaValidation.error) {
      return res.status(422).send(schemaValidation.error.details.map((error) => {
        console.log(error.message);
        return error.message;
      }));
    }

    next();
  };
}
