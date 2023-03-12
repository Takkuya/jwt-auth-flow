import jwt from 'jsonwebtoken'
import express from 'express'

type UserData = {
  id: string
  email: string
  username: string
  password: string
  isAdmin?: boolean
}

export const generateAccessToken = (user: UserData) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '15m',
    }
  )
}

export const generateRefreshToken = (user: UserData) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN_SECRET,
  )
}

export const verifyToken =  (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (authHeader) {
      const accessToken = authHeader.split(' ')[1]

      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          console.error(err)
          return res.status(403).json('Token is not valid')
        }

        req.user = user
        next()
      })   
    } else {
      res.status(401).json('You are not authenticated')
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
