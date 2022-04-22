import type { NextApiRequest, NextApiResponse } from 'next'
import { callSpacexApi } from 'services/spacex'
import { Launch } from 'types'

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse<{ error?: { message: string; statusCode: number }; launches?: Launch[] }>
): Promise<void> => {
  try {
    const { launchesPast: launches } = await callSpacexApi<{ launchesPast: Launch[] }>(`
    query{
      launchesPast(limit: 3) {
        id
        mission_name
        links {
          mission_patch
        }
      }
    }`)

    if (!launches) {
      res.json({ error: { message: 'No launches found', statusCode: 404 } })
    }

    res.status(200).json({ launches })
  } catch (error) {
    res.send({ error: { message: 'Something went wrong fetching launches', statusCode: 500 } })
  }
}

export default handler
