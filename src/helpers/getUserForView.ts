import { UserType } from "../db/db";
import { UserViewModel } from "../models/UserViewModel";

export const getUserForView = (user: UserType): UserViewModel => {
  return {
    id: user.id,
    name: user.name,
  };
};
