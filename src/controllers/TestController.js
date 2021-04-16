import Blacklist from "../models/blacklist.js";
import Permission from "../models/permission.js";
import Profile from "../models/profile.js";
import User from "../models/user.js";
import { isArray } from "../utils/utils.js";
import { validatePassword, createToken } from "../utils/auth.js";
import { responseClient, errorResponse } from "../utils/response.js";

const isPermByProfile = async (profileId, source) => {
  try {
    const permission = await Permission.findOne({ where: { name: source } });
    const profiles = await permission.getProfile({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return profiles.some((e) => e.dataValues.id === profileId);
  } catch (error) {
    return false;
  }
};

const getPermsByUser = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });
  const profile = await user.getProfile();
  const permissions = await profile.getPermission({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  const userPermissions = permissions.map((e) => ({
    id: e.dataValues.id,
    name: e.dataValues.name,
  }));
  return userPermissions;
};

const getPermsByProfile = async (profileId) => {
  const profile = await Profile.findOne({ where: { id: profileId } });
  const permissions = await profile.getPermission({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  const userPermissions = permissions.map((e) => ({
    id: e.dataValues.id,
    name: e.dataValues.name,
  }));
  return userPermissions;
};

export default {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!user) {
        throw { code: 400, message: "User not found" };
      }

      const isValid = await validatePassword(password, user.password);
      if (!isValid) {
        throw { code: 400, message: "Invalid email/password" };
      }

      const userPermissions = await getPermsByUser(user.id);

      const Authorization = createToken({
        user: {
          id: user.id,
          name: user.name,
          nickname: user.nickname,
          email: user.email,
          profile_id: user.profile_id,
        },
      });

      responseClient(res, {
        error: false,
        message: "Login success",
        data: {
          Authorization: `Bearer ${Authorization}`,
          userId: user.id,
          userPermissions,
        },
      });
    } catch (error) {
      errorResponse(res, error);
    }
  },
  async logout(req, res) {
    try {
      let { authorization } = req.headers;
      if (!authorization)
        throw { code: 401, message: "Authorization is required" };

      await Blacklist.create({ token: authorization });

      responseClient(res, { error: false, message: "Logout success" });
    } catch (error) {
      errorResponse(res, error);
    }
  },

  async rota1(req, res) {
    try {
      const { user } = req;
      const isPermitted = await isPermByProfile(user.profile_id, "Rota 1");
      if (!isPermitted) throw { code: 401, message: "Invalid Authorization" };

      responseClient(res, { user });
    } catch (error) {
      errorResponse(res, error);
    }
  },
  async rota2(req, res) {
    try {
      const { user } = req;
      const isPermitted = await isPermByProfile(user.profile_id, "Rota 2");
      if (!isPermitted) throw { code: 401, message: "Invalid Authorization" };

      const profile = await Profile.findOne({
        where: { id: user?.profile_id },
      });

      responseClient(res, { user, profile });
    } catch (error) {
      errorResponse(res, error);
    }
  },
  async rota3(req, res) {
    try {
      const { user } = req;
      const isPermitted = await isPermByProfile(user.profile_id, "Rota 3");
      if (!isPermitted) throw { code: 401, message: "Invalid Authorization" };

      const permissions = await Permission.findAll();

      responseClient(res, { permissions });
    } catch (error) {
      errorResponse(res, error);
    }
  },
  async rota4(req, res) {
    try {
      const { user } = req;
      const isPermitted = await isPermByProfile(user.profile_id, "Rota 4");
      if (!isPermitted) throw { code: 401, message: "Invalid Authorization" };

      const permissionsByUser = await getPermsByUser(user.id);

      responseClient(res, { permissionsByUser });
    } catch (error) {
      errorResponse(res, error);
    }
  },
  async rota5(req, res) {
    try {
      const { user } = req;
      const isPermitted = await isPermByProfile(user.profile_id, "Rota 5");
      if (!isPermitted) throw { code: 401, message: "Invalid Authorization" };

      const permissionsByProfile = await getPermsByProfile(user.profile_id);

      responseClient(res, { permissionsByProfile });
    } catch (error) {
      errorResponse(res, error);
    }
  },
};
