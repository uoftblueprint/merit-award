import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../types";

const Schema = mongoose.Schema;

export interface UserModel extends Model<User> {
  isValidPassword(password: string): boolean;
}

const UserSchema = new Schema<User, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpires: {
    type: Date,
    required: false
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  counselor: {
    type: Schema.Types.ObjectId,
    ref: "Counselor",
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: "Reviewer",
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

UserSchema.pre("save", async function (this: User, next: any) {
  if (this.isNew) {
    console.log('this.isNew :>> ', this.isNew);
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
});

UserSchema.methods.isValidPassword = async function (
  this: User,
  password: string
) {
  console.log('this.password :>> ', this.password);
  console.log('password :>> ', password);
  const compare = await bcrypt.compare(this.password, password);
  console.log('compare :>> ', compare);
  return compare;
};

UserSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

const User = mongoose.model<User, UserModel>("user", UserSchema);

export default User;
