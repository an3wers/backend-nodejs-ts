import { ObjectId } from "mongodb";
import { db } from "../db/db";
import { UserDbType } from "./types";

/*
  Слой работы с данными (Repository)
*/

class UserRepository {
  findUsers(name: string | undefined) {
    let users = db.users;
    if (name) {
      return users.filter((item) => item.name.indexOf(name) > -1);
    }
    return users;
  }
  getUser(id: number) {
    const foundUser = db.users.find((item) => item.id === id);
    return foundUser;
  }
  async createUser(data: UserDbType): Promise<UserDbType> {
    // TODO: Добавить реализацию создания юзера в БД
    return data;
  }

  deleteUser(id: number) {
    const foundUser = db.users.find((item) => item.id === id);
    if (foundUser) {
      db.users.filter((item) => item.id !== id);
      return true;
    }
    return false;
  }

  changeUser(data: { id: number; name?: string; age?: number }) {
    const foundUser = db.users.find((item) => item.id === data.id);

    if (!foundUser) {
      return false;
    } else {
      if (data.name) {
        foundUser.name = data.name;
      }
      if (data.age) {
        foundUser.age = data.age;
      }
      return foundUser;
    }
  }

  async findUserByLogin(login: string) {
    // TODO: Добавить реализацию поиска юзера по логину
    return {
      _id: 1,
    };
  }

  async findUserByEmail(email: string) {
    // TODO: Добавить реализацию поиска юзера по логину
    return {
      _id: 1,
    };
  }

  async updateConfirmation(userId: ObjectId) {
    // TODO: Добавить реализацию
    return true;
  }

  async getUserById(id: ObjectId): Promise<UserDbType> {
    // БД логика
    return {} as UserDbType;
  }
}

export default new UserRepository();
