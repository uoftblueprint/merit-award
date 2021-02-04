import mongoose from "mongoose";

const { Schema } = mongoose;

const userSubmissionSchema = new Schema({
  _id: String,
  name: String,
  answers: {
    type: Map,
    of: [String]
  }
})

const UserApplicationSchema = new Schema({
  user: String,
  studentSubmissions: userSubmissionSchema
});

export const UserApplication = mongoose.model('UserApplication', UserApplicationSchema);