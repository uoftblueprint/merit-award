import { Document, Schema } from "mongoose";

export interface User extends Document {
    email: string;
    password: string;
}

// TODO: do we need these interfaces?
// user types
// export interface StudentModel extends Document {
//     user: Schema.Types.ObjectId;
//     // other data for Student dashboard goes here
// }

// export interface RecommenderModel extends Document {
//     user: Schema.Types.ObjectId;
// }

// export interface ReviewerModel extends Document {
//     user: Schema.Types.ObjectId;
// }

// export interface CounselorModel extends Document {
//     user: Schema.Types.ObjectId;
// }

// export interface AdminModel extends Document {
//     user: Schema.Types.ObjectId;
// }