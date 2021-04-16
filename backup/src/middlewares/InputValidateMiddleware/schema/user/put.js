const Joi = require("joi");

const validate = Joi.object({
  id: Joi.string().uuid().required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(4).required(),
});

module.exports = validate;
