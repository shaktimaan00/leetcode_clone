import { connectDB } from "@/lib/db"
import Link from "next/link"
import { LCProblem } from "@/models/LCProblem"

const tags = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Sorting",
  "Greedy",
  "Depth-First Search",
  "Database",
  "Binary Search",
  "Tree",
  "Breadth-First Search",
]

export default async function Home() {
  await connectDB()
  const problems = await LCProblem.find({}).lean();
  return (
    <div className="space-y-8 bg-gray-900">
      <div className="bg-black shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-200">Problem Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-black rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-200">Problem Set</h1>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Difficulty</th>
              <th className="py-2 px-4 text-left">Tags</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem : any) => (
              <tr key={problem._id.toString()} className="border-b border-gray-800">
                <td className="py-2 px-4">
                  <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                </td>
                <td className="py-2 px-4">
                  <Link href={`/problems/${problem._id}`} className="text-blue-400 hover:underline">
                    {problem.title}
                  </Link>
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`
                    px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      problem.difficulty === "Easy"
                        ? "bg-green-800 text-green-100"
                        : problem.difficulty === "Medium"
                          ? "bg-yellow-800 text-yellow-100"
                          : "bg-red-800 text-red-100"
                    }
                  `}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex flex-wrap gap-1">
                    {problem.topicTags.map((tag : any) => (
                      <span key={tag.name} className="px-2 py-1 bg-gray-800 text-gray-300 cursor-pointer hover:bg-gray-700 rounded-full text-xs">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProblemCard title="Daily Challenge" description="Solve the daily coding challenge and earn rewards!" />
        <ProblemCard title="Study Plan" description="Follow a structured learning path to improve your skills" />
        <ProblemCard title="Contest" description="Participate in coding contests and compete with others" />
      </div>
    </div>
  )
}

function ProblemCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-black rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-2 text-slate-300">{title}</h2>
      <p className="mb-4 text-slate-400">{description}</p>
      <Link href="#" className="text-blue-400 hover:underline">
        Learn more →
      </Link>
    </div>
  )
}

