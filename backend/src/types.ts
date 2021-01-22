import { Document, Schema } from "mongoose";

export interface User extends Document {
    email: string;
    password: string;
    student: Schema.Types.ObjectId;
    recommender: Schema.Types.ObjectId;
    reviewer: Schema.Types.ObjectId;
    counselor: Schema.Types.ObjectId;
    admin: Schema.Types.ObjectId;
}

// user types
export interface StudentInterface extends Document {
    user: Schema.Types.ObjectId;
    counselorReferralUrl: String;
}

export interface RecommenderInterface extends Document {
    user: Schema.Types.ObjectId;
}

export interface ReviewerInterface extends Document {
    user: Schema.Types.ObjectId;
}

export interface CounselorInterface extends Document {
    user: Schema.Types.ObjectId;
    students: Array<Schema.Types.ObjectId>;
}

export interface AdminInterface extends Document {
    user: Schema.Types.ObjectId;
}