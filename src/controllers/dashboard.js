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
        WITH catches AS (
          SELECT
            ovitrap_id,
            ARRAY(
            SELECT
              json_build_object('number', o2.number, 'created_at', extract(epoch FROM o2.created_at) * 1000)
            FROM
              ovitrap_catches o2
            WHERE
              o2.ovitrap_id = ct.ovitrap_id
            ORDER BY created_at) AS DATA
          FROM
            ovitrap_catches ct
          GROUP BY
            ovitrap_id)
          SELECT
            o.id,
            o.name AS ovitrap_name,
            ct.data,	
            o.latitude,
            o.longtude,
            o.user_id,
            u.name AS user_name,
            o.company_id,
            c.name AS company_name,	
            o.created_at
          FROM
            ovitraps o
          LEFT JOIN catches ct ON
            ct.ovitrap_id = o.id
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
