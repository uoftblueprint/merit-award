import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import { Student } from "../types";

const Schema = mongoose.Schema;

const StudentSchema = new Schema<Student>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const Student = mongoose.model<Student>("student", StudentSchema);

export default Student;
