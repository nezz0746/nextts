import type { NextApiRequest, NextApiResponse } from 'next'
import { callSpacexApi } from 'services/spacex'
import { Launch } from 'types'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Launch | { message: string }>
): Promise<void> => {
  const launchID = req.query.id as string

  if (!launchID) {
    throw new Error('LaunchID undefined')
  }

  try {
    const { launch } = await callSpacexApi<{ launch: Launch }>(`
    query{
      launch(id: ${launchID}) {
        id
        mission_name
        launch_date_local
        launch_site {
          site_name_long
        }
        links {
          video_link
        }
        rocket {
          rocket_name
        }
    
      }
    }`)

    if (!launch) {
      throw new Error('No launch found.')
    }

    res.status(200).json(launch)
  } catch (error) {
    res.status(404).json({ message: 'No launch found' })
  }
}

export default handler
