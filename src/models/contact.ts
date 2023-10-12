import mongoose, { Schema } from "mongoose";
import { IContact } from "@src/interfaces/IContact";
import { Sector } from "@src/enum";

const ContactSchema: Schema = new Schema({
  _id: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  company: { type: String },
  address: { type: String },
  sector: { type: String, enum: Object.values(Sector), required: true },
});

const contactModel = mongoose.model<IContact>("Contact", ContactSchema);
export default contactModel;
