const Joi = require("joi");

const validate = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().min(4).required(),
});

module.exports = validate;
