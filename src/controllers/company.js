import { responseClient, errorResponse } from '../utils/response.js'
import Company from '../models/company.js'

const show = 'company'
const index = 'companies'

export default {
  async index(req, res) {
    try {
      const data = await Company.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order: [['name', 'ASC']]
      })

      responseClient(res, {
        error: false,
        message: `${index} founded`,
        data: {
          [index]: data
        }
      })
    } catch (error) {
      errorResponse(res, error)
    }
  },

  async show(req, res) {
    try {
      const data = await Company.findOne({
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
        data: {
          [show]: data
        }
      })
    } catch (error) {
      errorResponse(res, error)
    }
  },

  async create(req, res) {
    try {
      const [data, isNew] = await Company.findCreateFind({
        where: {
          document: req.body.document
        },
        defaults: req.body
      })

      if (!isNew) {
        throw { code: 400, message: 'Document already registered' }
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
      const [isRegistered, rowAffected] = await Company.update(req.body, {
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
      const data = await Company.destroy({
        where: {
          id: req.params.id
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
