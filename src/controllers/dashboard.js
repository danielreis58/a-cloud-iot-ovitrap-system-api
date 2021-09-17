import { responseClient, errorResponse } from '../utils/response.js'
import { getFromToken } from '../utils/auth.js'
import { pgConnect, pgDisconnect } from '../database/connection/index.js'

const index = 'ovitraps'

export default {
  async index(req, res) {
    const pgConn = await pgConnect()

    try {
      const lastDays = 30

      const { user, profile, company } = await getFromToken(
        req.headers.authorization,
        ['user', 'profile', 'company']
      )
      console.log(user, profile, company)

      const query = {
        text: `
        WITH catches_by_day AS (
          SELECT
            ovitrap_id,
            created_at::date AS created_at,
            sum("number") AS "number"
          FROM
            ovitrap_catches
          GROUP BY
            1,
            2
          ORDER BY
            ovitrap_id
          )
          SELECT
            o.id,
            o.name,
            ARRAY(
            SELECT
              json_build_object(
                'date', d::date, 
                'total', COALESCE(cbd.number, 0)
              )
            FROM
              generate_series((now()::date - ${lastDays})::date, now()::date, '1 day'::INTERVAL) AS d
            LEFT JOIN catches_by_day cbd ON
              cbd.created_at::date = d::date
              AND cbd.ovitrap_id = o.id
            ) AS DATA
          FROM
            ovitraps o
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
