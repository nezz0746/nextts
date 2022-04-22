import dayjs from 'dayjs'
import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import { Launch } from '../../types'

type LaunchPageProps = {
  launch: Launch
}

const LaunchPage: NextPage<LaunchPageProps> = ({
  launch: {
    mission_name,
    links: { video_link },
    launch_date_local,
    rocket: { rocket_name },
  },
}): JSX.Element => {
  return (
    <div className="flex flex-row justify-center border-red-500 p-5">
      <div className="border flex flex-col rounded-md h-96 p-4 shadow-md w-full sm:w-2/3 md:w-1-2 lg:w-1/3 text-center">
        <p className="text-2xl">{mission_name}</p>
        <div className="border-b mb-2" />
        <iframe
          src={`https://www.youtube.com/embed/${video_link.split('/').slice(-1)[0]}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={mission_name}
          className="grow"
        />
        <p className="text-gray-400">
          Launch date: {dayjs(launch_date_local).format('dddd mm YYYY, hh:mm a')}
        </p>
        <p className="text-gray-400">Rocket name: {rocket_name}</p>
      </div>
    </div>
  )
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: LaunchPageProps }> {
  const launch = await fetch(
    `http://${context.req.headers.host}/api/launch/${context.query.id}`
  ).then((res) => res.json())

  return {
    props: {
      launch,
    },
  }
}

export default LaunchPage
