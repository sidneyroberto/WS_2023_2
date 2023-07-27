import { Router } from 'express'
import { ContactController } from '../controllers/ContactController'

export const contactsRouter = Router()
const contactCtrl = new ContactController()

contactsRouter.get('/', (req, res) => contactCtrl.findAll(req, res))
