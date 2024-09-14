import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  accountInfo: {
    login: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    passwordHash: String,
    passwordSalt: String,
    createdAt: String,
  },
  emailConfirmation: {
    confirmationCode: String,
    expirationDate: Date,
    isConfirmed: Boolean,
  },
  registrationData: {
    ip: String,
    userAgent: String,
    deviceId: String,
  },
});

export const UserModel = mongoose.model("users", usersSchema);
