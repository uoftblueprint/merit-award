import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";
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
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
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
  recommender: {
    type: Schema.Types.ObjectId,
    ref: "Recommender",
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

UserSchema.pre("save", async function (this: User, next: any) {
  if (this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
});

UserSchema.methods.isValidPassword = async function (
  this: User,
  password: string
) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

const User = mongoose.model<User, UserModel>("user", UserSchema);

export default User;
