import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const SECRET = process.env.SECRET_JWT
const SALTS = process.env.PASSWORD_ENCRYPT_SALTS

export const createToken = (obj, secret = SECRET, expiresIn = '10h') =>
  jwt.sign({ ...obj }, secret, { expiresIn })

export const validatePassword = async (password, hash) =>
  bcrypt.compareSync(password, hash)

export const encryptPassword = (password) => {
  const salts = SALTS || 8
  return bcrypt.hash(password, salts)
}
