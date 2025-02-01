import mongoose, { Schema } from "mongoose";

// const testCaseSchema = new Schema({
//   input: { type: String, required: true },
//   expectedOutput: { type: String, required: true },
//   isPublic: { type: Boolean, default: false }
// }, { _id: true });

// const problemSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   difficulty: { 
//     type: String, 
//     required: true,
//     enum: ['Easy', 'Medium', 'Hard']
//   },
//   tags: [{ type: String }],
//   testCases: [testCaseSchema]
// });

const testCaseSchema = new Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  isPublic: { type: Boolean, default: false }
}, { _id: true });

const problemSchema = new Schema({
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
  sampleTestCase: {type: String},
  codeSnippets: [{
    lang: { type: String },
    langSlug: { type: String },
    code: { type: String },
    __typename: { type: String }
  }],
  topicTags: [ {
    name: { type: String },
    slug: { type: String },
  }]
}, { timestamps: true });



// Key Fix: Check if model exists first
// const Problem = models.Problem || model("Problem", problemSchema);

// export default Problem; 
export const Problem = mongoose.models.Problem || mongoose.model("Problem", problemSchema);