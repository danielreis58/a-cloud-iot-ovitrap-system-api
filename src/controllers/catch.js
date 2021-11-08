import { responseClient, errorResponse } from '../utils/response.js'
import Ovitrap from '../models/ovitrap.js'
import OvitrapCatch from '../models/ovitrap-catch.js'

const show = 'catch'

export default {
  async create(req, res) {
    try {
      const isRegisteredOvitrap = await Ovitrap.findOne({
        where: { id: req.params.id }
      })

      if (!isRegisteredOvitrap) {
        throw { code: 400, message: 'Ovitrap not founded' }
      }

      const data = await OvitrapCatch.create({
        number: req.body.number,
        ovitrap_id: req.params.id
      })
      if (data) {
        const { company_id: companyId } = await Ovitrap.findOne({
          where: { id: req.params.id }
        })

        const id = data.ovitrap_id
        const { number } = data
        const date = data.createdAt

        const body = { id, date, number }

        const io = req.app.get('socketIo')
        io.to(companyId).emit('catch', body)
      }

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
