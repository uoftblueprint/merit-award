import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../types";

const Schema = mongoose.Schema;
const options = { discriminatorKey: 'userType' };

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
}, options);

const User = mongoose.model<User, UserModel>("user", UserSchema);

const StudentSchema = User.discriminator('Student',
  new Schema({
    // schema for student
  }, options));

const ReviewerSchema = User.discriminator('Reviewer',
  new Schema({
    // schema for reviewer
  }, options));

const RecommenderSchema = User.discriminator('Recommender',
  new Schema({
    // schema for recommender
  }, options));

const AdminSchema = User.discriminator('Admin',
  new Schema({
    // schema for admin
  }, options));

const CounselorSchema = User.discriminator('Counselor',
  new Schema({
    // schema for counselor
  }, options));

UserSchema.pre("save", async function (this: User, next: any) {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (
  this: User,
  password: string
) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

export default User;
