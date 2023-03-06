import express from 'express'
import cors from 'cors'
import { routes } from './routes'
import dotenv from 'dotenv'

// reading .env file variables
dotenv.config()

const app = express()
app.use(express.json())

app.use(cors())
app.use(routes)

app.listen(5000, () => {
  console.log('Background server running on 5000 port')
})
