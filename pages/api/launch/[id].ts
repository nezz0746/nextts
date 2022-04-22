import type { NextApiRequest, NextApiResponse } from 'next'
import { callSpacexApi } from 'services/spacex'
import { Launch } from 'types'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ error?: { message: string; statusCode: number }; launch?: Launch }>
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
      res.send({ error: { message: `Launch ${launchID} not found`, statusCode: 404 } })
    }

    res.status(200).json({ launch })
  } catch (error) {
    res.send({
      error: { message: `Something went wrong fetching launch ${launchID}`, statusCode: 500 },
    })
  }
}

export default handler
