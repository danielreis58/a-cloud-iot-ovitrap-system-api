import { responseClient, errorResponse } from '../utils/response.js'
import { getFromToken } from '../utils/auth.js'
import { pgConnect, pgDisconnect } from '../database/connection/index.js'

const index = 'ovitraps'

export default {
  async index(req, res) {
    const pgConn = await pgConnect()

    try {
      const { user, profile, company } = await getFromToken(
        req.headers.authorization,
        ['user', 'profile', 'company']
      )
      console.log(user, profile, company)

      const query = {
        text: `
          SELECT
            oc.id,
            oc.number,	
            o.latitude,
            o.longtude,
            oc.ovitrap_id,
            o.name AS ovitrap_name,	
            o.user_id,
            u.name AS user_name,
            o.company_id,
            c.name AS company_name,
            oc.created_at
          FROM
            ovitrap_catches oc
          INNER JOIN ovitraps o ON
            o.id = oc.ovitrap_id
          INNER JOIN users u ON
            u.id = o.user_id
          INNER JOIN companies c ON
            c.id = o.company_id
        `,
        values: []
      }
      const data = (await pgConn.query(query)).rows || []

      responseClient(res, {
        error: false,
        message: `${index} founded`,
        data
      })
    } catch (error) {
      errorResponse(res, error)
    } finally {
      pgDisconnect(pgConn)
    }
  }
}
