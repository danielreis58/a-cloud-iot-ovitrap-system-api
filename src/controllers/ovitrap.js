import { responseClient, errorResponse } from '../utils/response.js'

export default {
  async index(req, res) {
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
  async show(req, res) {
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
