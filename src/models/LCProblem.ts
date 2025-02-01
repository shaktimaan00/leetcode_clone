import mongoose, { Schema } from 'mongoose';

const testCaseSchema = new Schema({
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    explanation: { type: String }
});

const lcProblemSchema = new Schema({
    questionId: { type: String, required: true },
    questionFrontendId: { type: String, required: true },
    titleSlug: { type: String, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard']
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    hints: [{ type: String }],
    testCases: [testCaseSchema], 
    codeSnippets: [{
        lang: { type: String },
        langSlug: { type: String },
        code: { type: String },
        __typename: { type: String }
    }],
    topicTags: [{
        name: { type: String },
        slug: { type: String },
    }]
}, { timestamps: true });

export const LCProblem = mongoose.models.LCProblem || mongoose.model("LCProblem", lcProblemSchema);