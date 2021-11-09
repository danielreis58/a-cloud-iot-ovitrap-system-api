import { responseClient, errorResponse } from '../utils/response.js'
import { getFromToken } from '../utils/auth.js'
import { pgConnect, pgDisconnect } from '../database/connection/index.js'
import { getProfileType } from '../utils/queries.js'

const index = 'ovitraps'

export default {
  async index(req, res) {
    const pgConn = await pgConnect()
    try {
      const lastDays = 30

      const { company: companyId, profile: profileId } = await getFromToken(
        req.headers.authorization,
        ['company', 'profile']
      )

      const { offset } = req.params

      const profile = await getProfileType(profileId)

      const timezone = {
        text: `
            SET TIMEZONE = ${-(offset / 60)};
        `,
        values: []
      }

      await pgConn.query(timezone)

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
            json_build_object(
              'lat', o.latitude, 
              'lng', o.longitude
            ) AS coordinates,
            COALESCE((SELECT sum("number") FROM catches_by_day cbd WHERE cbd.ovitrap_id = o.id), 0)::INTEGER AS total,
            ARRAY(
            SELECT
              json_build_object(
                'date', d, 
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
          ${!profile.isAdmin ? `WHERE company_id = '${companyId}'` : ''}
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
