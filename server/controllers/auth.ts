import express from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from '../middlewares/auth'
import { prisma } from '../src/lib/prisma'

export const refresh = async (req: express.Request, res: express.Response) => {
  try {
    const refreshToken = req.body.refreshToken
    const databaseRefreshToken = await prisma.user.findFirst({
      where: {
        refreshToken: refreshToken
      }
    })

    const refreshTokenDatabase = databaseRefreshToken?.refreshToken
    //  const refreshTokenWithoutHash = bcrypt.compare(refreshToken, databaseRefreshToken?.refreshToken)

    if (!refreshToken) {
      return res
        .status(401)
        .json('You are not authenticated')
    }

    if (!refreshTokenDatabase) {
      return res.status(403).json('Refresh token is not valid')
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err: any, user: any) => {
        if (err) {
          console.log(err)
          res.status(403).json('Refresh token is not valid')
        } else {
          const newAccessToken = generateAccessToken(user)
          const newRefreshToken = generateRefreshToken(user)

          console.log('newRefreshToken', newRefreshToken)

          await prisma.user.update({
            where: {
              id: user.id
            },
            data: {
              refreshToken: newRefreshToken
            }
          })

          // if everything is okay create a new access token and send this token to the user
          res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
          })
        }
      }
    )
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, username, password } = req.body

    const databaseEmail = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    const databaseUsername = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

    if (databaseEmail) {
      return res.status(409).json('This email is already in use')
    }

    if (databaseUsername) {
      return res.status(409).json('This username is already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = {
      id: uuidv4(),
      email,
      username,
      password: passwordHash
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    const hashedRefreshToken = bcrypt.hashSync(refreshToken, salt)

    const newUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      // refreshTakenWithoutHash: refreshToken,
      refreshToken: refreshToken
    }

    const createUser = await prisma.user.create({ data: newUser })

    return res.status(201).json({
      username: user.username,
      password: user.password,
      accessToken,
      refreshToken
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken: refreshToken
      }
    })

    return res.json({
      username: user.username,
      password: user.password,
      accessToken,
      refreshToken
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    const refreshToken = req.body.refreshToken

    await prisma.user.updateMany({
      where: {
        refreshToken: refreshToken
      },
      data: {
        refreshToken: ''
      }
    })

    return res.status(200).json('Logged out')
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
