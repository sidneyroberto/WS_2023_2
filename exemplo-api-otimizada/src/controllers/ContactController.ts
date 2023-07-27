import { Request, Response } from 'express'
import { ContactDAO } from '../daos/ContactDAO'

export class ContactController {
  private _dao: ContactDAO

  constructor() {
    this._dao = new ContactDAO()
  }

  async findAll(req: Request, res: Response) {
    const contacts = await this._dao.findAll()
    return res.status(200).json({ contacts })
  }
}
