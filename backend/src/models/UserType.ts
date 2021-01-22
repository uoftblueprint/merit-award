import mongoose from "mongoose";
import { StudentInterface, CounselorInterface, ReviewerInterface, RecommenderInterface, AdminInterface } from "../types";

const Schema = mongoose.Schema;

const StudentSchema = new Schema<StudentInterface>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  counselorReferral: { type: String },
  reviewerReferral: { type: String },
});

const CounselorSchema = new Schema<CounselorInterface>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Students",
    },
  ],
});

const ReviewerSchema = new Schema<ReviewerInterface>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const RecommenderSchema = new Schema<RecommenderInterface>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const AdminSchema = new Schema<AdminInterface>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

export const Student = mongoose.model<StudentInterface>("student", StudentSchema);
export const Counselor = mongoose.model<CounselorInterface>("counselor", CounselorSchema);
export const Reviewer = mongoose.model<ReviewerInterface>("reviewer", ReviewerSchema);
export const Recommender = mongoose.model<RecommenderInterface>("recommender", RecommenderSchema);
export const Admin = mongoose.model<AdminInterface>("admin", AdminSchema);

