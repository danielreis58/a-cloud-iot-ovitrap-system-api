import User from '../models/user.js'
import { getFromToken } from '../utils/auth.js'
import { responseClient, errorResponse } from '../utils/response.js'

export default {
  async forgot(req, res) {
    try {
      const isRegisteredUser = await User.findOne({
        where: { email: req.body.email }
      })

      if (!isRegisteredUser) {
        throw { code: 400, message: 'User not founded' }
      }

      responseClient(res, {
        error: false,
        message: `Password request sent to email`
      })
    } catch (error) {
      errorResponse(res, error)
    }
  },
  async new(req, res) {
    try {
      const { token } = req.headers
      const { password } = req.body

      const { user } = await getFromToken(token, ['user'])

      const [isRegistered] = await User.update(
        { password },
        {
          where: {
            id: user.id
          },
          returning: true
        }
      )

      if (!isRegistered) {
        throw { code: 400, message: `User not founded` }
      }

      responseClient(res, {
        error: false,
        message: `Password change successfully`
      })
    } catch (error) {
      errorResponse(res, error)
    }
  }
}
