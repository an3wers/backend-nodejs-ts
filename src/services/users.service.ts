import { UserCreateModel } from "../models/UserCreateModel";
import { UserDbType } from "../repositories/types";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { add } from "date-fns";
import { emailService } from "./email.service";

class UsersService {
  secret: string;
  constructor() {
    this.secret = (process.env.JWT_SECRET as string) || "secret";
  }

  async createUser(
    payload: UserCreateModel,
    ip: string = "",
    userAgent: string = "",
    deviceId: string = ""
  ) {
    // Неправильный паттерн работы с хэшем и солью
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await this.generateHash(
      payload.password,
      passwordSalt
    );

    const newUser: UserDbType = {
      _id: new ObjectId(),
      accountInfo: {
        login: payload.login,
        email: payload.email,
        passwordHash,
        passwordSalt,
        createdAt: new Date().toISOString(),
      },
      emailConfirmation: {
        confirmationCode: uuid(),
        expirationDate: add(new Date(), { hours: 1, minutes: 5 }),
        isConfirmed: false,
      },
    };

    const createdUser = userRepository.createUser(newUser);

    // TODO: Логика вызова email сервиса для отправки письма пользователю

    try {
      await emailService.sendEmailConfirmation(
        newUser.accountInfo.email,
        newUser.emailConfirmation.confirmationCode
      );
    } catch (error) {
      console.error("[sendEmailConfirmation]: ", error);
      // TODO: Логика удаления пользователя или иная бизнес логика

      return null;
    }

    return createdUser;
  }

  async checkCredentials(payload: {
    login: string;
    password: string;
  }): Promise<UserDbType | null> {
    const user = (await userRepository.findUserByLogin(payload.login)) as any;

    if (!user) {
      return null;
    }

    const passwordHash = await this.generateHash(
      payload.password,
      user.passwordSalt
    );

    if (passwordHash !== user.passwordHash) {
      return null;
    }

    return user;
  }

  async loginUser(user: UserDbType) {
    const token = await this.createJWT(user);
    return token;
  }

  async getUserInfo(token: string) {
    const userId = this.verifyJWT(token);

    if (!userId) {
      return null;
    }

    const user = await userRepository.getUserById(userId);

    if (!user) {
      return null;
    }

    return user;
  }

  getUserIdByToken(token: string) {
    return this.verifyJWT(token);
  }

  async confirmEmail(code: string, email: string) {
    const user = (await userRepository.findUserByEmail(
      email
    )) as unknown as UserDbType;

    if (!user) {
      return null;
    }

    // TODO: Логика проверки кода подтверждения
    if (user.emailConfirmation.confirmationCode === code) {
      const res = await userRepository.updateConfirmation(user._id);

      return res; // or true
    }

    return null;
  }

  async getUserById(id: ObjectId) {
    return await userRepository.getUserById(id);
  }

  private generateHash(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  private async createJWT(user: UserDbType) {
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        login: user.accountInfo.login,
      },
      this.secret,
      {
        expiresIn: "1h",
      }
    );
    return token;
  }

  private verifyJWT(token: string) {
    try {
      const res = jwt.verify(token, this.secret) as any;
      const userId = ObjectId.createFromHexString(res.userId.toString());
      return userId;
    } catch (error) {
      return null;
    }
  }
}

export const usersService = new UsersService();
