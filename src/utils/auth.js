import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const SECRET = process.env.SECRET_JWT
const SALTS = process.env.PASSWORD_ENCRYPT_SALTS

export const createToken = (obj, expiresIn = '10h', secret = SECRET) =>
  jwt.sign({ ...obj }, secret, { expiresIn })

export const validatePassword = async (password, hash) =>
  bcrypt.compareSync(password, hash)

export const encryptPassword = async (password) => {
  const salts = SALTS || 8
  return bcrypt.hash(password, parseInt(salts, 10))
}

export const getFromToken = async (authorization, resourceArray) => {
  try {
    if (!authorization)
      throw { code: 401, message: 'Authorization is required' }

    const data = {}

    let auth = authorization
    auth = auth.split('Bearer ')
    auth = auth[auth.length - 1]

    jwt.verify(auth, SECRET, { ignoreExpiration: false }, (err, decoded) => {
      if (err) throw { code: 401, message: 'Invalid Authorization' }
      Object.entries(decoded).forEach((e) => {
        const key = e[0]
        const value = e[1]
        if (resourceArray.includes(key)) {
          data[key] = value
        }
      })
    })
    return data
  } catch (error) {
    return error
  }
}
