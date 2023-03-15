/* eslint-disable camelcase */
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export const axiosJWT = axios.create({
  baseURL: 'http://localhost:5000/api',
})
