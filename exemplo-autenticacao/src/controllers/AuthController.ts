import { Repository } from 'typeorm'

import { STATUS, User } from '../entity/User'
import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export class AuthController {
  private _repo: Repository<User>

  constructor() {
    this._repo = AppDataSource.getRepository(User)
  }

  async registerUser(user: User): Promise<User> {
    delete user.password // Extremamente necessário!
    const savedUser = await this._repo.save(user)
    return savedUser
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this._repo.findOne({
      where: {
        email
      }
    })

    return user
  }

  static verifyToken(req: Request, res: Response, next: NextFunction) {
    let token = req.headers['authorization']
    if (token) {
      token = token.substring(7, token.length)
      try {
        verify(token, process.env.SECRET)
        next()
        return
      } catch (err) {
        console.log(err)
      }
    }

    return res.status(401).json({ message: STATUS.NOT_AUTHORIZED })
  }
}