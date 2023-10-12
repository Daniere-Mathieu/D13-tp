import { Sector } from "@src/enum";
import { Document } from "mongoose";

export interface IContact extends Document {
  _id: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  sector: Sector;
}
