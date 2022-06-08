import axios from 'axios'

const api = axios.create({
    baseURL: '' //put your api url
})

export { api }