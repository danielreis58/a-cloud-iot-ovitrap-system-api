import Joi from 'joi'

const validate = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string(),
  email: Joi.string().email(),
  document: Joi.string(),
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
