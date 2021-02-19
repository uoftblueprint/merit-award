import mongoose from "mongoose";
import { AppStatusInterface } from "../types";

const Schema = mongoose.Schema;

const AppStatusSchema = new Schema<AppStatusInterface>({
  applicationId: Schema.Types.ObjectId,
  status: { type: String },
  deadline: { type: String },
  lastEdited: { type: String }
});

export const AppStatus = mongoose.model<AppStatusInterface>("admin", AppStatusSchema);
