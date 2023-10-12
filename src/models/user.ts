import mongoose, { Schema } from "mongoose";
import { IUser } from "@interfaces/IUser";

const UserSchema: Schema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model using the schema and interface
const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
