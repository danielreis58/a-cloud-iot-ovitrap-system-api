import pkg from 'sequelize'
import { responseClient, errorResponse } from '../utils/response.js'
import { createToken, getFromToken } from '../utils/auth.js'
import User from '../models/user.js'
import Profile from '../models/profile.js'
import { getForm, getProfileType } from '../utils/queries.js'
import sendEmail from '../services/email.js'
import { createPassword, resetPassword } from '../utils/email.js'

const show = 'user'
const index = 'users'

const { Op } = pkg

export default {
  async index(req, res) {
    try {
      const { company: companyId, profile: profileId } = await getFromToken(
        req.headers.authorization,
        ['company', 'profile']
      )
      const profile = await getProfileType(profileId)

      const { id: admProfileId } = await Profile.findOne({
        where: {
          name: 'Administrador'
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })

      let data = []
      let resourceArray = []
      if (profile.isAdmin) {
        data = await User.findAll({
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
          },
          order: [['name', 'ASC']]
        })
        resourceArray = ['profiles', 'companies']
      } else {
        data = await User.findAll({
          where: {
            company_id: companyId,
            profile_id: { [Op.ne]: admProfileId }
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
          },
          order: [['name', 'ASC']]
        })
        resourceArray = ['profiles']
      }
      const form = await getForm(companyId, profile, resourceArray)

      responseClient(res, {
        error: false,
        message: `${index} founded`,
        data,
        form
      })
    } catch (error) {
      errorResponse(res, error)
    }
  },

  async show(req, res) {
    try {
      const data = await User.findOne({
        where: {
          id: req.params.id
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'company_id', 'password']
        }
      })

      if (!data) {
        throw { code: 400, message: `${show} not founded` }
      }

      responseClient(res, {
        error: false,
        message: `${show} founded`,
        data
      })
    } catch (error) {
      errorResponse(res, error)
    }
  },

  async create(req, res) {
    try {
      const { company } = await getFromToken(req.headers.authorization, [
        'company'
      ])

      const isRegisteredProfile = await Profile.findOne({
        where: { id: req.body.profile_id }
      })

      if (!isRegisteredProfile) {
        throw { code: 400, message: 'Profile not founded' }
      }

      const [data, isNew] = await User.findCreateFind({
        where: {
          email: req.body.email
        },
        defaults: { ...req.body, company_id: company }
      })

      if (!isNew) {
        throw { code: 400, message: 'Email already registered' }
      }

      const token = createToken(
        {
          user: {
            id: data.id,
            name: data.name,
            nickname: data.nickname,
            email: data.email
          }
        },
        '30m'
      )

      const body = createPassword(token)
      sendEmail(data.email, 'Smart Ovitraps - Boas vindas!', body)

      responseClient(res, {
        error: false,
        message: `${show} created`,
        data: { id: data.id }
      })
    } catch (error) {
      errorResponse(res, error)
    }
  },

  async update(req, res) {
    try {
      const { id, email, profile_id: profileId } = req.body

      const user = await User.findOne({
        where: {
          id: { [Op.eq]: id }
        }
      })

      if (profileId) {
        const isRegisteredProfile = await Profile.findOne({
          where: { id: profileId }
        })

        if (!isRegisteredProfile) {
          throw { code: 400, message: 'Profile not founded' }
        }
      }

      if (email) {
        const usersWithSameEmail = await User.findOne({
          where: {
            id: { [Op.ne]: id },
            email: { [Op.eq]: email }
          }
        })
        if (usersWithSameEmail) {
          throw { code: 400, message: 'Email already registered' }
        }

        if (email !== user?.email) {
          const token = createToken(
            {
              user: {
                id: user.id,
                name: user.name,
                nickname: user.nickname,
                email: user.email
              }
            },
            '30m'
          )

          const body = resetPassword(token)
          sendEmail(email, 'Smart Ovitraps - Cadastrar nova senha', body)
        }
      }

      const [isRegistered, rowAffected] = await User.update(req.body, {
        where: {
          id: req.params.id
        },
        returning: true
      })

      if (!isRegistered) {
        throw { code: 400, message: `${show} not founded` }
      }

      const data = rowAffected?.[0]?.dataValues

      responseClient(res, {
        error: false,
        message: `${show} updated`,
        data: { id: data.id }
      })
    } catch (error) {
      errorResponse(res, error)
    }
  },

  async delete(req, res) {
    try {
      const data = await User.destroy({
        where: {
          id: req.params.id.split(',')
        }
      })

      if (!data) {
        throw { code: 400, message: `${show} not founded` }
      }

      responseClient(res, {
        error: false,
        message: `${show} deleted`,
        data: { id: req.params.id }
      })
    } catch (error) {
      errorResponse(res, error)
    }
  }
}
