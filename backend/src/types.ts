import { Document } from "mongoose";

export interface User extends Document {
    email: string;
    password: string;
}

export interface Form { 
    name: string;
    pages: Record<string, Array<Section>>;
}

export interface Section {
    name: string;
    repeatable: number;
    label: string;
    questions: Array <Question>
}

export interface Question {
    text: string;
    type: string;
    charCount: number;
}