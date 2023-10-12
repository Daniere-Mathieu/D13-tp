import { IContact } from "@interfaces/IContact";
import ContactModel from "@models/contact";

export class ContactService {
  static instance: ContactService;

  constructor() {
    if (ContactService.instance) {
      throw new Error("Use TaskService.getInstance() instead of new keyword");
    }
  }

  static getInstance() {
    if (!ContactService.instance) {
      ContactService.instance = new ContactService();
    }
    return ContactService.instance;
  }

  async create(contact: IContact, userId: string) {
    contact._id = userId + new Date().toISOString();
    return await ContactModel.create(contact);
  }

  async find(idUser: string) {
    return await ContactModel.find({ _id: { $regex: idUser, $options: "i" } });
  }

  async findOne(id: string) {
    return await ContactModel.findOne({ _id: id });
  }

  async update(id: string, contact: IContact) {
    return await ContactModel.updateOne({ _id: id }, contact);
  }
  async delete(id: string) {
    return await ContactModel.deleteOne({ _id: id });
  }
}
