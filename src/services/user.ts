import UserModel from "@models/user";
import { IUser } from "@interfaces/IUser";
import bcrypt from "bcrypt";

export class UserService {
  static instance: UserService;

  constructor() {
    if (UserService.instance) {
      throw new Error("Use TaskService.getInstance() instead of new keyword");
    }
  }

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async create(user: IUser): Promise<boolean> {
    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
      return false;
    }
    user.password = await this.hashPassword(user.password);
    await UserModel.create(user);
    return true;
  }

  async find() {
    return await UserModel.find();
  }

  async findOne(id: string) {
    return await UserModel.findById(id);
  }

  async findOneByEmail(email: string) {
    return await UserModel.findOne({ email: email });
  }

  async update(id: string, user: IUser) {
    return await UserModel.updateOne({ _id: id }, user);
  }

  async delete(id: string) {
    return await UserModel.deleteOne({ _id: id });
  }

  async verify(
    email: string,
    password: string
  ): Promise<{ verified: boolean; user?: IUser }> {
    try {
      const user = await this.findOneByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return { verified: false };
      }
      return { verified: true, user: user };
    } catch (error) {
      throw error;
    }
  }
}
