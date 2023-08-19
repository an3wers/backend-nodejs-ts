import { db } from "../db/db";

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
  createUser(data: { name: string; age: number }) {
    const user = { id: +new Date(), ...data };
    db.users.push(user);
    return user;
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
}

export default new UserRepository();
