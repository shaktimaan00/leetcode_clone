import { connectDB } from "@/lib/db";
import { Submission } from "@/models/Submission";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const submissions = await Submission.find({});
        return NextResponse.json(submissions);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch submissions" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectDB();
        console.log("connected");

        const { code, language, problemId } = await request.json();
        const userId = "123";

        const trimmedProblemId = problemId.trim().toString();
        console.log("trimmedProblemId: ", trimmedProblemId);

        const problem = await fetch(`https://leetcoode.vercel.app/api/lcproblems/${trimmedProblemId}`);
        console.log("Fetch response status: ", problem.status);

        if (!problem.ok) {
            const errorText = await problem.text();
            console.error('Problem not found:', errorText);
            throw new Error('Problem not found');
        }

        const problemJson = await problem.json();

        const functionNameMatch = code.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
        const functionName = functionNameMatch ? functionNameMatch[1] : null;
        if (!functionName) {
            return NextResponse.json({ error: "Function name not found" }, { status: 400 });
        }

        const results = await Promise.all(
            problemJson.testCases.map(async (testCase) => {
                const formattedInput = testCase.input.replace(/\s+/g, '');

                const wrappedCode = `${code} \n\nsolution = Solution()\noutput = solution.${functionName}(${formattedInput})\nprint(output)\n`;

                console.log(wrappedCode);

                const payload = {
                    language,
                    version: "3.10.0",
                    files: [{ content: `${wrappedCode}` }]
                };

                let response;
                let result;
                let actualOutput;
                const normalizeOutput = (output) => output.replace(/\s+/g, "");

                for (let attempt = 1; attempt <= 5; attempt++) {
                    try {
                        response = await fetch("https://emkc.org/api/v2/piston/execute", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload)
                        });
                        console.log(`Attempt ${attempt}: Response status: ${response.status}`);

                        if (response.ok) {
                            result = await response.json();
                            actualOutput = result.run?.output ? result.run.output.trim() : "No output";
                            break;
                        } else {
                            console.error(`Attempt ${attempt}: Piston API Error: ${response.status}`);
                        }
                    } catch (error) {
                        console.error(`Attempt ${attempt}: Execution failed`, error);
                    }

                    if (attempt < 5) {
                        console.log(`Retrying in 2 seconds...`);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                }

                if (!response.ok) {
                    return { expected: testCase.expectedOutput, actual: "Execution failed", passed: false };
                }

                return {
                    input: testCase.input,
                    expectedOutput: normalizeOutput(testCase.expectedOutput),
                    actual: normalizeOutput(actualOutput),
                    passed: normalizeOutput(actualOutput) === normalizeOutput(testCase.expectedOutput)
                };

            })
        );

        const status = results.every((r) => r.passed) ? "Accepted" : "Wrong Answer";
        console.log("Status: ", status);
        console.log("Results: ", results);

        const submission = new Submission({
            userId,
            problemId,
            code,
            language,
            status,
            runtime: results[0]?.run?.time ? results[0].run.time * 1000 : 0
        });

        await submission.save();

        return NextResponse.json({
            status,
            results,
            submissionId: submission._id
        }, { status: 201 });

    } catch (error) {
        console.error('Error processing submission:', error);
        return NextResponse.json(
            { error: "Failed to process submission" },
            { status: 500 }
        );
    }
}