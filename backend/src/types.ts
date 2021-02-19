import { Document, Schema } from "mongoose";

export interface User extends Document {
    email: string;
    password: string;
    student: Schema.Types.ObjectId;
    reviewer: Schema.Types.ObjectId;
    counselor: Schema.Types.ObjectId;
    admin: Schema.Types.ObjectId;
}

// user types
export interface StudentInterface extends Document {
    user: Schema.Types.ObjectId;
    counselorReferral: string;
    appplicationId: Schema.Types.ObjectId;
}

export interface ReviewerInterface extends Document {
    user: Schema.Types.ObjectId;
    students: Array<Schema.Types.ObjectId>;
}

export interface CounselorInterface extends Document {
    user: Schema.Types.ObjectId;
    students: Array<Schema.Types.ObjectId>;
}

export interface AdminInterface extends Document {
    user: Schema.Types.ObjectId;
}

export interface AppStatusInterface extends Document {
    applicationId: Schema.Types.ObjectId;
    status: string;
    deadline: string;
    lastEdited: string;
}

export interface Form {
    name: string,
    pages: Record<string, Array<Section>>,
}

export interface Section {
    name: string,
    repeatable: number,
    label: string,
    questions: Array <Question>
}

export interface Question {
    text: string,
    type: string,
    charCount: number,
    options: string[]
}
