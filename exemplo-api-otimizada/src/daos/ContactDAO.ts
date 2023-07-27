import { Contact, ContactModel } from '../models/ContactModel'

export class ContactDAO {
  async findAll(): Promise<Contact[]> {
    const contacts = await ContactModel.find()
    return contacts
  }
}
