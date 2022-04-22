import type { NextApiRequest, NextApiResponse } from 'next'
import { callSpacexApi } from 'services/spacex'
import { Launch } from 'types'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Launch[] | { message: string }>
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
      throw new Error('Not launches found.')
    }

    res.status(200).json(launches)
  } catch (error) {
    res.status(404).json({ message: 'No launches found' })
  }
}

export default handler
