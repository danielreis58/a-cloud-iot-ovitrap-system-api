import { responseClient, errorResponse } from '../utils/response.js'
import { getFromToken } from '../utils/auth.js'
import Ovitrap from '../models/ovitrap.js'
import User from '../models/user.js'

const show = 'ovitrap'
const index = 'ovitraps'

export default {
  async index(req, res) {
    try {
      const data = await Ovitrap.findAll({
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
      const data = await Ovitrap.findOne({
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
      // TODO: Checek profile type
      const { company } = await getFromToken(req.headers.authorization, [
        'company'
      ])

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

      if (req.body.name) {
        const isRegisteredName = await Ovitrap.findOne({
          where: {
            name: req.body.name
          }
        })

        if (isRegisteredName) {
          throw { code: 400, message: 'Name already registered' }
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
