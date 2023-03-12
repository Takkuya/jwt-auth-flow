import express from 'express'
import {
  login,
  logout,
  refresh,
  register,
} from './controllers/auth'

import { deleteUser,getUsers } from './controllers/users'
import { verifyToken } from './middlewares/auth'

export const routes = express.Router()

routes.get('/api', getUsers)

routes.post('/api/refresh', refresh)

routes.post('/api/register', register)

routes.post('/api/login', login)

routes.post('/api/logout', verifyToken, logout)

routes.delete('/api/users/:userId', verifyToken, deleteUser)
