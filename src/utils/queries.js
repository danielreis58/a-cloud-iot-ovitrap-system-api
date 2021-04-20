import Permission from "../models/permission.js";
import Profile from "../models/profile.js";
import User from "../models/user.js";

export const isPermByProfile = async (profileId, source) => {
  try {
    const permission = await Permission.findOne({ where: { name: source } });
    const profiles = await permission.getProfile({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return profiles.some((e) => e.dataValues.id === profileId);
  } catch (error) {
    return false;
  }
};

export const getPermsByUser = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });
  const profile = await user.getProfile();
  const permissions = await profile.getPermission({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  const userPermissions = permissions.map((e) => ({
    id: e.dataValues.id,
    name: e.dataValues.name,
  }));
  return userPermissions;
};

export const getPermsByProfile = async (profileId) => {
  const profile = await Profile.findOne({ where: { id: profileId } });
  const permissions = await profile.getPermission({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  const userPermissions = permissions.map((e) => ({
    id: e.dataValues.id,
    name: e.dataValues.name,
  }));
  return userPermissions;
};
