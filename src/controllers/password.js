import User from '../models/user.js'
import sendEmail from '../services/email.js'
import { createToken, encryptPassword, getFromToken } from '../utils/auth.js'
import { resetPassword } from '../utils/email.js'
import { responseClient, errorResponse } from '../utils/response.js'

export default {
  async forgot(req, res) {
    try {
      const user = await User.findOne({
        where: { email: req.body.email }
      })

      if (!user) {
        throw { code: 400, message: 'User not founded' }
      }

      const token = createToken(
        {
          user: {
            id: user.id,
            name: user.name,
            nickname: user.nickname,
            email: user.emai
          }
        },
        '30m'
      )

      const body = resetPassword(token)
      sendEmail(user.email, 'Smart Ovitraps - Cadastrar nova senha', body)

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
      const { password } = req.body

      const { user } = await getFromToken(req.headers.authorization, ['user'])

      const hashPassword = await encryptPassword(password)

      const [isRegistered] = await User.update(
        { password: hashPassword },
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
