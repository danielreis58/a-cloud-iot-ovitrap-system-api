import { responseClient, errorResponse } from '../utils/response.js'
import OvitrapCatch from '../models/ovitrap-catch.js'

const show = 'catch'

export default {
  async create(req, res) {
    try {
      const isRegisteredOvitrap = await OvitrapCatch.findOne({
        where: { ovitrap_id: req.params.id }
      })

      if (!isRegisteredOvitrap) {
        throw { code: 400, message: 'Ovitrap not founded' }
      }

      const data = await OvitrapCatch.create({
        number: req.body.number,
        ovitrap_id: req.params.id
      })

      responseClient(res, {
        error: false,
        message: `${show} created`,
        data: { id: data.id }
      })
    } catch (error) {
      errorResponse(res, error)
    }
  }
}
