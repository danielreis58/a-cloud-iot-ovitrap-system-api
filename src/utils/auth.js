import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Blacklist from "../models/blacklist.js";
import { errorResponse } from "./response.js";

const SECRET = process.env.SECRET_JWT;
const SALTS = process.env.PASSWORD_ENCRYPT_SALTS;

export const createToken = (obj, secret = SECRET, expiresIn = "10h") => {
  return jwt.sign({ ...obj }, secret, { expiresIn });
};

export const authenticateToken = async (
  req,
  res,
  next,
  ignoreExpiration = false
) => {
  try {
    let { authorization } = req.headers;

    if (!authorization)
      throw { code: 401, message: "Authorization is required" };

    const blacklist = await Blacklist.findOne({
      where: { token: authorization },
    });

    if (blacklist) throw { code: 401, message: "Invalid Authorization" };

    authorization = authorization.split("Bearer ");
    authorization = authorization[authorization.length - 1];

    jwt.verify(authorization, SECRET, { ignoreExpiration }, (err, decoded) => {
      if (err) throw { code: 401, message: "Invalid Authorization" };

      Object.entries(decoded).forEach((e) => {
        req[e[0]] = e[1];
      });
      next();
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const validatePassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};

export const encryptPassword = (password) => {
  const salts = parseInt(SALTS) || 8;
  return bcrypt.hash(password, salts);
};
