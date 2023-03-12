import express from 'express'
import { prisma } from '../src/lib/prisma'


export const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await prisma.user.findMany()

    return res.status(200).json(users)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}


export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (req.user.id == req.params.userId || req.user.isAdmin) {
      const user = await prisma.user.delete({
        where: {
          id: req.params.userId,
        },
      })
      res.status(200).json(user.username + ' has been deleted')
    }
    return res.status(403).json('You are not allowed to delete this user')
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}