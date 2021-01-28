import mongoose from "mongoose";

const { Schema } = mongoose;

const QuestionSubmissionSchema = new Schema({
  form: {
    type: Schema.Types.ObjectId,
    ref: "FormSubmission",
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  name: { type: String },
  answers: [{
    type: String,
  }],
  documents: [{
    type: Schema.Types.Mixed
  }]
});
mongoose.model('QuestionSubmission', QuestionSubmissionSchema);

const FormSubmissionSchema = new Schema({
  form: {
    type: Schema.Types.ObjectId,
    ref: "Form",
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "QuestionSubmission",
    },
  ],
});
mongoose.model('FormSubmission', FormSubmissionSchema);

const UserApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  submissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "FormSubmission",
    },
  ],
});

export const UserApplication = mongoose.model('UserApplication', UserApplicationSchema);