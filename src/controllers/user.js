import { responseClient, errorResponse } from '../utils/response.js'
import { getFromToken } from '../utils/auth.js'
import User from '../models/user.js'
import Profile from '../models/profile.js'

const show = 'user'
const index = 'users'

export default {
  async index(req, res) {
    try {
      const data = await User.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order: [['name', 'ASC']]
      })

      responseClient(res, {
        error: false,
        message: `${index} founded`,
        data
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
        attributes: { exclude: ['createdAt', 'updatedAt'] }
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
      const isRegisteredProfile = await Profile.findOne({
        where: { id: req.body.profile_id }
      })

      if (!isRegisteredProfile) {
        throw { code: 400, message: 'Profile not founded' }
      }

      const { company } = await getFromToken(req.headers.authorization, [
        'company'
      ])

      req.body.company_id = company

      const [data, isNew] = await User.findCreateFind({
        where: {
          email: req.body.email
        },
        defaults: req.body
      })

      if (!isNew) {
        throw { code: 400, message: 'Email already registered' }
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
      if (req.body.profile_id) {
        const isRegisteredProfile = await Profile.findOne({
          where: { id: req.body.profile_id }
        })

        if (!isRegisteredProfile) {
          throw { code: 400, message: 'Profile not founded' }
        }
      }

      if (req.body.email) {
        const isRegisteredEmail = await User.findOne({
          where: {
            email: req.body.email
          }
        })

        if (isRegisteredEmail) {
          throw { code: 400, message: 'Email already registered' }
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
          id: req.params.id.split(',').map(Number)
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
