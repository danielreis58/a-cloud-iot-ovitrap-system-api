import { responseClient, errorResponse } from '../utils/response.js'
import { pgConnect, pgDisconnect } from '../database/connection/index.js'
import Ovitrap from '../models/ovitrap.js'
import OvitrapCatch from '../models/ovitrap-catch.js'

const show = 'catch'

const getAdminsCompanyIds = async (pgConn) => {
  const query = {
    text: `
    SELECT
      company_id
    FROM
      users u
    WHERE
      u.profile_id = (
      SELECT
        id
      FROM
        profiles p
      WHERE
        name = 'Administrador')
    `,
    values: []
  }
  const data = (await pgConn.query(query))?.rows || []
  return data.map((e) => e.company_id)
}

export default {
  async create(req, res) {
    const pgConn = await pgConnect()
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

        const arrayOfCompanies = await getAdminsCompanyIds(pgConn)

        if (!arrayOfCompanies.includes(companyId)) {
          arrayOfCompanies.push(companyId)
        }

        const id = data.ovitrap_id
        const { number } = data
        const date = data.createdAt

        const body = { id, date, number }

        const io = req.app.get('socketIo')

        for (let index = 0; index < arrayOfCompanies.length; index += 1) {
          const element = arrayOfCompanies[index]
          io.to(element).emit('catch', body)
        }
      }

      responseClient(res, {
        error: false,
        message: `${show} created`,
        data: { id: data.id }
      })
    } catch (error) {
      errorResponse(res, error)
    } finally {
      pgDisconnect(pgConn)
    }
  }
}
