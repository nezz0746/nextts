import { GetServerSidePropsContext, NextPage } from 'next'
import Link from 'next/link'
import { Launch } from 'types'

interface IndexPageProps {
  launches: Launch[]
}
const IndexPage: NextPage<IndexPageProps> = ({ launches }) => {
  return (
    <div className="p-4">
      <p className="text-2xl">Launches</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {launches.map(({ id, mission_name, links: { mission_patch } }) => {
          return (
            <Link href={'/' + id} key={id}>
              <div className="border shadow-md rounded-md p-3 hover:bg-slate-50 cursor-pointer">
                <p className="text-center mb-2 font-bold tracking-tighter underline">
                  {mission_name}
                </p>
                {mission_patch && <img src={mission_patch} alt="launch-patch-logo" />}
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
    props: await fetch(`http://${context.req.headers.host}/api/launches`).then((res) => res.json()),
  }
}

export default IndexPage
