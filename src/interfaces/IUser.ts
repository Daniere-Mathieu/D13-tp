import { Document } from "mongoose";

export interface IUser extends Document {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
}
