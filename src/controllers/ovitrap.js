import pkg from 'sequelize'
import { responseClient, errorResponse } from '../utils/response.js'
import { getFromToken } from '../utils/auth.js'
import Ovitrap from '../models/ovitrap.js'
import User from '../models/user.js'
import Profile from '../models/profile.js'
import { getForm, getProfileType } from '../utils/queries.js'

const show = 'ovitrap'
const index = 'ovitraps'

const { Op } = pkg

export default {
  async index(req, res) {
    try {
      const {
        company: companyId,
        profile: profileId,
        user
      } = await getFromToken(req.headers.authorization, [
        'company',
        'profile',
        'user'
      ])
      const profile = await getProfileType(profileId)
      const resourceArray = profile.isAdmin ? ['users', 'companies'] : ['users']
      const form = await getForm(companyId, profile, resourceArray)

      const { id: admProfileId } = await Profile.findOne({
        where: {
          name: 'Administrador'
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })

      let data = []
      if (profile.isAdmin) {
        data = await Ovitrap.findAll({
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          order: [['name', 'ASC']]
        })
      } else if (profile.isSuper) {
        data = await Ovitrap.findAll({
          where: {
            company_id: companyId
          },
          include: [
            {
              model: User,
              as: 'user',
              where: { profile_id: { [Op.ne]: admProfileId } },
              required: true
            }
          ],
          attributes: { exclude: ['createdAt', 'updatedAt', 'company_id'] },
          order: [['name', 'ASC']]
        })
      } else {
        data = await Ovitrap.findAll({
          where: {
            company_id: companyId,
            user_id: user.id
          },
          attributes: { exclude: ['createdAt', 'updatedAt', 'company_id'] },
          order: [['name', 'ASC']]
        })
      }

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
      const data = await Ovitrap.findOne({
        where: {
          id: req.params.id
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'company_id'] }
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
      let { company } = await getFromToken(req.headers.authorization, [
        'company'
      ])

      if (req.body.company_id) {
        company = req.body.company_id
      }

      const isRegisteredUser = await User.findOne({
        where: { id: req.body.user_id }
      })

      if (!isRegisteredUser) {
        throw { code: 400, message: 'User not founded' }
      }

      const [data, isNew] = await Ovitrap.findCreateFind({
        where: {
          name: req.body.name,
          user_id: req.body.user_id
        },
        defaults: { ...req.body, company_id: company }
      })

      if (!isNew) {
        throw { code: 400, message: 'Name already registered' }
      }

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
      if (req.body.user_id) {
        const isRegisteredUser = await User.findOne({
          where: { id: req.body.user_id }
        })

        if (!isRegisteredUser) {
          throw { code: 400, message: 'User not founded' }
        }
      }

      const [isRegistered, rowAffected] = await Ovitrap.update(req.body, {
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
      const data = await Ovitrap.destroy({
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
