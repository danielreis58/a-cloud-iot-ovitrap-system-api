import jwt from 'jsonwebtoken'
import Blacklist from '../../models/blacklist.js'
import { errorResponse } from '../../utils/response.js'

const SECRET = process.env.SECRET_JWT

const authenticateToken = async (req, res, next, ignoreExpiration = false) => {
  try {
    let { authorization } = req.headers

    if (!authorization)
      throw { code: 401, message: 'Authorization is required' }

    const blacklist = await Blacklist.findOne({
      where: { token: authorization }
    })

    if (blacklist) throw { code: 401, message: 'Invalid Authorization' }

    authorization = authorization.split('Bearer ')
    authorization = authorization[authorization.length - 1]

    jwt.verify(authorization, SECRET, { ignoreExpiration }, (err, decoded) => {
      if (err) throw { code: 401, message: 'Invalid Authorization' }

      Object.entries(decoded).forEach((e) => {
        const key = e[0]
        const value = e[1]
        req[key] = value
      })
      next()
    })
  } catch (error) {
    errorResponse(res, error)
  }
}

export default authenticateToken
