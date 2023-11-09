import { Router } from 'express'

import { STATUS, User } from '../entity/User'
import { AuthController } from '../controllers/AuthController'
import { sign } from 'jsonwebtoken'

export const authRouter = Router()
const authCtrl = new AuthController()

authRouter.post('/register', async (req, res) => {
  const { email, name, password } = req.body

  const user = new User(email, name, password)
  const response = user.isValid()

  if (response === STATUS.OK) {
    const savedUser = await authCtrl.registerUser(user)
    return res.status(201).json({ user: savedUser })
  }

  return res.status(400).json({ message: response })
})

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await authCtrl.findUserByEmail(email)
  if (user && user.isPasswordCorrect(password)) {
    const token = sign(
      { user: email, authTime: new Date().getTime() * 1000 },
      process.env.SECRET,
      {
        expiresIn: '20s',
      }
    )

    return res.status(200).json({
      authorized: true,
      user,
      token
    })
  }

  return res.status(401).json({
    authorized: false,
    message: STATUS.NOT_AUTHORIZED
  })
})