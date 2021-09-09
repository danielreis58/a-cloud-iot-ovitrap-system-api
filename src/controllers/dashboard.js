import { responseClient, errorResponse } from '../utils/response.js'
import { getFromToken } from '../utils/auth.js'
import OvitrapCatch from '../models/ovitrap-catch.js'

const index = 'ovitraps'

export default {
  async index(req, res) {
    try {
      const { company } = await getFromToken(req.headers.authorization, [
        'company'
      ])
      console.log(company)
      const data = await OvitrapCatch.findAll({
        order: [['createdAt', 'ASC']]
      })

      responseClient(res, {
        error: false,
        message: `${index} founded`,
        data
      })
    } catch (error) {
      errorResponse(res, error)
    }
  }
}
