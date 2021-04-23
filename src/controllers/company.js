import { responseClient, errorResponse } from '../utils/response.js'
import Company from '../models/company.js'

export default {
  async index(req, res) {
    try {
      const companies = await Company.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      responseClient(res, {
        error: false,
        message: 'Companies founded',
        data: {
          companies
        }
      })
    } catch (error) {
      errorResponse(res, error)
    }
  },
  async show(req, res) {
    try {
      const company = await Company.findOne({
        where: {
          id: req.params.id
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      responseClient(res, {
        error: false,
        message: 'Company founded',
        data: {
          company
        }
      })
    } catch (error) {
      errorResponse(res, error)
    }
  },

  async create(req, res) {
    try {
      //
      responseClient(res, {
        error: false,
        message: '',
        data: {}
      })
    } catch (error) {
      errorResponse(res, error)
    }
  },
  async update(req, res) {
    try {
      //
      responseClient(res, {
        error: false,
        message: '',
        data: {}
      })
    } catch (error) {
      errorResponse(res, error)
    }
  },
  async delete(req, res) {
    try {
      //
      responseClient(res, {
        error: false,
        message: '',
        data: {}
      })
    } catch (error) {
      errorResponse(res, error)
    }
  }
}
