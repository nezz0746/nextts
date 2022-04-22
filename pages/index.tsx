import { GetServerSidePropsContext, NextPage } from 'next'
import Link from 'next/link'
import { Launch } from '../types'

interface IndexPageProps {
  launches: Launch[]
}
const IndexPage: NextPage<IndexPageProps> = ({ launches }) => {
  return (
    <div className="p-4">
      <p className="text-2xl">Launches</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {launches.map((launch) => {
          return (
            <Link href={'/' + launch.id} key={launch.id}>
              <div className="border shadow-md rounded-md p-3 hover:bg-slate-50 cursor-pointer">
                <p className="text-center mb-2 font-bold tracking-tighter underline">
                  {launch.mission_name}
                </p>
                {launch.links.mission_patch && (
                  <img src={launch.links.mission_patch} alt="launch-patch-logo" />
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: IndexPageProps }> {
  return {
    props: {
      launches: await fetch(`http://${context.req.headers.host}/api/launches`).then((res) =>
        res.json()
      ),
    },
  }
}

export default IndexPage
