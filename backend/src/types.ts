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
export interface Student extends Document {
    user: Schema.Types.ObjectId;
    // other data for Student dashboard goes here
}

export interface Recommender extends Document {
    user: Schema.Types.ObjectId;
}

export interface Reviewer extends Document {
    user: Schema.Types.ObjectId;
}

export interface Counselor extends Document {
    user: Schema.Types.ObjectId;
}

export interface Admin extends Document {
    user: Schema.Types.ObjectId;
}