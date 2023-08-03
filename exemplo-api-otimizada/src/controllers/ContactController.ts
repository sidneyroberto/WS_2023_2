import { Request, Response } from 'express'
import { ContactDAO } from '../daos/ContactDAO'
import { Params, getParams } from '../types/Params'

export class ContactController {
  private _dao: ContactDAO

  constructor() {
    this._dao = new ContactDAO()
  }

  async findByName(req: Request, res: Response) {
    const { name } = req.params
    const params: Params = getParams(req.query)
    const { page, perPage } = params

    const contacts = await this._dao.findByName(name, page, perPage)
    return res.status(200).json({ contacts })
  }
}
