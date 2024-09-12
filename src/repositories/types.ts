import { ObjectId } from "mongodb";

export interface UserDbType {
  _id: ObjectId;
  accountInfo: {
    login: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: string;
  };
  emailConfirmation: {
    confirmationCode: string;
    expirationDate: Date;
    isConfirmed: boolean;
  };
  registrationData?: {
    ip: string;
    userAgent?: string;
    deviceId?: string;
  };
}
