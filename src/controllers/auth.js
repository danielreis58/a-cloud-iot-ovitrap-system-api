import Blacklist from '../models/blacklist.js'
import User from '../models/user.js'
import { validatePassword, createToken } from '../utils/auth.js'
import { responseClient, errorResponse } from '../utils/response.js'
import { getPermsByProfile } from '../utils/queries.js'

export default {
  async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        where: { email },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      if (!user) {
        throw { code: 400, message: 'User not found' }
      }

      const isValid = await validatePassword(password, user.password)
      if (!isValid) {
        throw { code: 400, message: 'Invalid email/password' }
      }

      const userPermissions = await getPermsByProfile(user.profile_id)

      const Authorization = createToken({
        user: {
          id: user.id,
          name: user.name,
          nickname: user.nickname,
          email: user.email,
          profile_id: user.profile_id
        }
      })

      responseClient(res, {
        error: false,
        message: 'Login success',
        data: {
          Authorization: `Bearer ${Authorization}`,
          userId: user.id,
          userPermissions
        }
      })
    } catch (error) {
      errorResponse(res, error)
    }
  },
  async logout(req, res) {
    try {
      const { authorization } = req.headers
      if (!authorization) {
        throw { code: 401, message: 'Authorization is required' }
      }

      await Blacklist.create({ token: authorization })

      responseClient(res, { error: false, message: 'Logout success' })
    } catch (error) {
      errorResponse(res, error)
    }
  }
}
