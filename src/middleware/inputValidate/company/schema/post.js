import Joi from 'joi'

const validate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  document: Joi.string().required(),
  site: Joi.string(),
  cep: Joi.string(),
  address: Joi.string(),
  number: Joi.number().integer(),
  neighborhood: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  telephone: Joi.string(),
  note: Joi.string()
})

export default validate
