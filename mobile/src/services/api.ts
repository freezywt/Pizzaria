import axios from 'axios'

const api = axios.create({
  baseURL: 'https://sheltered-shore-48117.herokuapp.com/' //put your api url
})

export { api }
