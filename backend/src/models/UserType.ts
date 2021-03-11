import mongoose from "mongoose";
import { StudentInterface, CounselorInterface, ReviewerInterface, AdminInterface, RecommenderInterface, RecommendationInterface, AReccomendationInterface, ECReccomendationInterface } from "../types";

const Schema = mongoose.Schema;

const StudentSchema = new Schema<StudentInterface>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  counselorReferral: { type: String },
  reviewerReferral: { type: String },
  recommenderRequest: [String],
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
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Students",
    },
  ],
});

const ECReccomendationSchema = new Schema<ECReccomendationInterface>({
  activities: [String],
  details: String,
  contributions: String,
});

const AReccomendationSchema = new Schema<AReccomendationInterface>({
  courses: String,
  comments: String,
});

const RecommendationSchema = new Schema<RecommendationInterface>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  status: String,
  relationship: String,
  message: String,
  type: String,
  reccomend: String,
  date: Schema.Types.Date,
  length: String,
  worthy: String,
  ecreccomendation: ECReccomendationSchema,
  areccomendation: AReccomendationSchema,
})

const RecommenderSchema = new Schema<RecommenderInterface>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recommendations: [RecommendationSchema],
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

