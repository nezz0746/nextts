import axios from 'axios'

export const callSpacexApi = <Response>(query: string): Promise<Response> =>
  axios
    .create({ baseURL: 'https://api.spacex.land' })
    .post('/graphql', { query })
    .then((res) => res.data.data)
