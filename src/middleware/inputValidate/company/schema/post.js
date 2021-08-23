import Joi from 'joi'

const validate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  document: Joi.string().required(),
  site: Joi.string().optional().empty(''),
  cep: Joi.string().optional().empty(''),
  address: Joi.string().optional().empty(''),
  number: Joi.number().integer().optional().empty(null),
  neighborhood: Joi.string().optional().empty(''),
  city: Joi.string().optional().empty(''),
  state: Joi.string().optional().empty(''),
  telephone: Joi.string().optional().empty(''),
  note: Joi.string().optional().empty('')
})

export default validate
