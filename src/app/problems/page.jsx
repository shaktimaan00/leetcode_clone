import { connectDB } from '@/lib/db';
import { LCProblem } from '@/models/LCProblem';
import Link from 'next/link';

export default async function ProblemsPage() {
	await connectDB();
	const problems = await LCProblem.find({}).lean();
	console.log(problems.length);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Problems</h1>
			<div className="grid gap-4">
				{problems.map(problem => (
					<Link
						key={problem._id.toString()}
						href={`/problems/${problem._id}`}
						className="p-4 border rounded-lg hover:bg-gray-800 transition-colors"
					>
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-semibold">{problem.title}</h2>
							<span className={`badge ${getDifficultyColor(problem.difficulty)}`}>
								{problem.difficulty}
							</span>
						</div>
						<div className="mt-2 flex gap-2">
							{problem.topicTags.map(tag => (
								<span key={tag.slug} className="text-sm bg-gray-900 px-2 py-1 rounded">
									{tag.name}
								</span>
							))}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

function getDifficultyColor(difficulty) {
	switch (difficulty) {
		case 'Easy': return ' text-green-600';
		case 'Medium': return 'text-yellow-600';
		case 'Hard': return 'text-red-800';
		default: return 'text-gray-800';
	}
}