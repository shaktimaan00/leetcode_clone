// import { Schema, model } from "mongoose";

// const submissionSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, required: false }, // Optional for now
//   problemId: { type: Schema.Types.ObjectId, required: true },
//   code: { type: String, required: true },
//   language: { type: String, required: true },
//   status: { 
//     type: String, 
//     enum: ["Accepted", "Wrong Answer", "Runtime Error", "Pending"],
//     default: "Pending"
//   },
//   runtime: { type: Number },
// }, { timestamps: true });

// export const Submission = model("Submission", submissionSchema);

import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  status: { type: String, enum: ["Accepted", "Wrong Answer", "Error"], required: true },
  runtime: { type: Number, default: 0 }
}, { timestamps: true });

export const Submission = mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);
