import Joi from 'joi'

const validate = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  nickname: Joi.string().optional().empty(''),
  profile_id: Joi.string().uuid().required()
})

export default validate
