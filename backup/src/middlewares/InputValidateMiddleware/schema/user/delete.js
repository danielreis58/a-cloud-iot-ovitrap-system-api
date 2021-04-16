const Joi = require("joi");

const validate = Joi.object({
  id: Joi.string().uuid().required(),
});

module.exports = validate;
