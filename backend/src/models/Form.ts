import mongoose from "mongoose";

const { Schema } = mongoose;

const QuestionSchema = new Schema({
    text: String,
    type: String,
    charCount: Number,
    options: [String]
})

const SectionSchema = new Schema({
    name: String,
    repeatable: Number,
    label: String,
    questions: [QuestionSchema]
});


const FormSchema = new Schema({
    name: String,
    pages: {
        type: Map,
        of: [SectionSchema]
    }
});

export const FormModel = mongoose.model('Form', FormSchema);