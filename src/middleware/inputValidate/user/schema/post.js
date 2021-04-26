import Joi from 'joi'

const validate = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  nickname: Joi.string(),
  profile_id: Joi.number().integer()
})

export default validate
