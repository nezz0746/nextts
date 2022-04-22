import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Error from 'next/error'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />
  }

  return (
    <div className="h-screen">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
