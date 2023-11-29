import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

export const questionsRouter = Router()

questionsRouter.get('/', AuthController.verifyToken, (req, res) => {
  return res.status(200).json({ answer: 'The secret of the universe is 42' })
})