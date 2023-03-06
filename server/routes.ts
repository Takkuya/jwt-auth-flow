import express from 'express'
import {
  deleteUser,
  login,
  logout,
  refresh,
  register,
} from './controllers/auth'
import { verifyToken } from './middlewares/auth'

export const routes = express.Router()

routes.get('/', (req, res) => {
  return res.status(200).json({
    message: 'teste',
  })
})

routes.post('/api/refresh', refresh)

routes.post('/api/register', register)

routes.post('/api/login', login)

routes.post('/api/logout', verifyToken, logout)

routes.delete('/api/users/:userId', verifyToken, deleteUser)
