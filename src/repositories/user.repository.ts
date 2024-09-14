import { ObjectId } from "mongodb";
// import { db } from "../db/db";
import { UserDbType } from "./types";
import { UserModel } from "../db/userSchema";

class UserRepository {
  async createUser(data: UserDbType) {
    const res = await UserModel.create(data);
    return res;
  }

  async deleteUser(userId: ObjectId) {
    const res = await UserModel.deleteOne({ _id: userId });
    return res;
  }

  async changeUser(data: {
    userId: ObjectId;
    email?: string;
    password?: string;
  }) {
    if (!data.email && !data.password) return null;
    const changeUser: Record<string, any> = {};

    if (data.email) {
      changeUser["accountInfo.email"] = data.email;
    }

    if (data.password) {
      changeUser["accountInfo.passwordHash"] = data.password;
    }

    const res = await UserModel.updateOne(
      { _id: data.userId },
      {
        $set: changeUser,
      }
    );

    return res;
  }

  async findUserByLogin(login: string) {
    const user = await UserModel.findOne({ accountInfo: { login } });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await UserModel.findOne({ accountInfo: { email } });
    return user;
  }

  async updateConfirmation(userId: ObjectId) {
    const res = await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          "emailConfirmation.isConfirmed": true,
        },
      }
    );
    return res.matchedCount === 1;
  }

  async findUserById(userId: ObjectId) {
    const res = await UserModel.findOne({ _id: userId });
    return res;
  }

  async findAllUsers() {
    const res = await UserModel.find();
    return res;
  }
}

export const userRepository = new UserRepository();
