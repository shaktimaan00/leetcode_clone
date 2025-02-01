import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { LCProblem } from "@/models/LCProblem";

export async function GET() {
  try {
    await connectDB();
    const problems = await LCProblem.find({});
    return NextResponse.json(problems);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch problems" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate required fields
    if (!body.questionId || !body.questionFrontendId || !body.title || !body.content || !body.difficulty) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create problem with validation
    const newProblem = new LCProblem({
      questionId: body.questionId,
      questionFrontendId: body.questionFrontendId,
      titleSlug: body.titleSlug || body.title.replace(/\s+/g, "-").toLowerCase(),
      title: body.title,
      content: body.content,
      difficulty: body.difficulty || "Easy",
      likes: body.likes || 0,
      dislikes: body.dislikes || 0,
      hints: body.hints || [""],
      testCases: body.testCases || [],
      codeSnippets: body.codeSnippets || [],
      topicTags: body.topicTags || []
    });

    const validationError = newProblem.validateSync();
    if (validationError) {
      const errors = Object.values(validationError.errors).map((e: any) => e.message);
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    await newProblem.save();
    return NextResponse.json(newProblem, { status: 201 });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
