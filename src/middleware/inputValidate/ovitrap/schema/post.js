import Joi from 'joi'

const validate = Joi.object({
  name: Joi.string().min(4).required(),
  user_id: Joi.string().uuid().required()
})

export default validate
