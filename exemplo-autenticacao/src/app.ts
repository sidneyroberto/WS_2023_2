import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import dotenv from 'dotenv'

import { authRouter } from './routes/auth'
import { questionsRouter } from './routes/questions'
import { swaggerOptions } from './config/swagger'
import './data-source'

dotenv.config()

export const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.use('/auth', authRouter)
app.use('/questions', questionsRouter)

const specs = swaggerJSDoc(swaggerOptions)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.get('/', (req, res) => res.send('Exemplo Autenticação'))