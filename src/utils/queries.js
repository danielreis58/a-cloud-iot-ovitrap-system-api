import pkg from 'sequelize'
import Permission from '../models/permission.js'
import Profile from '../models/profile.js'
import User from '../models/user.js'
import Company from '../models/company.js'

const { Op } = pkg

export const isPermByProfile = async (profileId, source) => {
  try {
    const permission = await Permission.findOne({ where: { name: source } })
    const profiles = await permission.getProfile({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    return profiles.some((e) => e.dataValues.id === profileId)
  } catch (error) {
    return false
  }
}

export const getPermsByUser = async (userId) => {
  const user = await User.findOne({ where: { id: userId } })
  const profile = await user.getProfile()
  const permissions = await profile.getPermission({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  const userPermissions = permissions.map((e) => ({
    id: e.dataValues.id,
    name: e.dataValues.name
  }))
  return userPermissions
}

export const getPermsByProfile = async (profileId) => {
  const profile = await Profile.findOne({ where: { id: profileId } })
  const permissions = await profile.getPermission({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  const userPermissions = permissions.map((e) => ({
    id: e.dataValues.id,
    name: e.dataValues.name
  }))
  return userPermissions
}

export const getForm = async (companyId, profile, resourceArray) => {
  const form = {}
  const { id: admProfileId } = await Profile.findOne({
    where: {
      name: 'Administrador'
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  if (resourceArray.includes('users')) {
    if (profile.isAdmin) {
      const users = await User.findAll({
        attributes: ['id', 'name', 'company_id']
      })
      form.users = users
    } else if (profile.isSuper) {
      const users = await User.findAll({
        where: {
          company_id: companyId,
          profile_id: { [Op.ne]: admProfileId }
        },
        attributes: ['id', 'name']
      })
      form.users = users
    } else {
      const users = await User.findAll({
        where: {
          company_id: companyId
        },
        attributes: ['id', 'name']
      })
      form.users = users
    }
  }
  if (resourceArray.includes('profiles')) {
    if (profile.isAdmin) {
      const profiles = await Profile.findAll({
        attributes: ['id', 'name']
      })
      form.profiles = profiles
    } else {
      const profiles = await Profile.findAll({
        where: {
          id: { [Op.ne]: admProfileId }
        },
        attributes: ['id', 'name']
      })
      form.profiles = profiles
    }
  }
  if (resourceArray.includes('companies')) {
    if (profile.isAdmin) {
      const companies = await Company.findAll({
        attributes: ['id', 'name']
      })
      form.companies = companies
    } else {
      const companies = await Company.findAll({
        where: {
          company_id: companyId
        },
        attributes: ['id', 'name']
      })
      form.companies = companies
    }
  }
  return form
}

export const getProfileType = async (profileId) => {
  const profileQuery = await Profile.findOne({
    where: {
      id: profileId
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  const isAdmin = profileQuery.name === 'Administrador'
  const isSuper = profileQuery.name === 'Supervisor'
  const isAgent = profileQuery.name === 'Agente'

  return { isAdmin, isSuper, isAgent }
}
