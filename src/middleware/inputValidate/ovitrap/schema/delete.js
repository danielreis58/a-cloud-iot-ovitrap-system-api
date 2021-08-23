import Joi from 'joi'

const validate = Joi.object({
  id: Joi.string()
})

export default validate
