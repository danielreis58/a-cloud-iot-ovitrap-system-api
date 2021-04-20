import Joi from 'joi';

const validate = Joi.object({
  id: Joi.string().uuid().required(),
});

export default validate;
