'use client';
import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ReactMarkdown from 'react-markdown';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const ProblemPage = ({ params }) => {
  const [code, setCode] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [problem, setProblem] = useState(null);
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const usepathname = usePathname();
  const problemId = usepathname.split('/')[2];

  // ✅ Correct useEffect for fetching problem data
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`/api/lcproblems/${problemId}`);
        if (!res.ok) throw new Error('Problem not found');
        
        const data = await res.json();
        setProblem(data);
        const pythonSnippet = data.codeSnippets.find(snippet => snippet.lang === 'Python3');
        const defaultCode = pythonSnippet ? `# Add import statements as required\n\n${pythonSnippet.code}` : '# Add import statements as required';
        setCode(defaultCode);
      } catch (error) {
        console.error('Failed to fetch problem:', error);
      }
    };
    fetchProblem();
  }, [params.id]);

  // ✅ Improved API handling
  const handleRun = async () => {
    console.log('Running code:', code);
    setIsLoading(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: 'python3', problemId: problemId }),
      });

      if (!res.ok){
        console.log('Submission failed:', res);
      }

      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!problem) return <div>Loading problem...</div>;

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <div className='flex-col'>
          <div className='pb-5'>
            <Link href="/problems" className="p-2 bg-gray-700 rounded-xl"> -- Back to Problems -- </Link>
          </div>
          <h1 className="text-2xl font-bold">{problem.questionId}. {problem.title}</h1>
        </div>
        <button
          onClick={handleRun}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Running...' : 'Run Code'}
        </button>
      </div>

      <PanelGroup direction="horizontal" className="flex-1">
        <Panel defaultSize={50} className="overflow-auto">
          <div className="p-4 h-full">
            <ReactMarkdown className="prose max-w-none">
              {problem.description}
            </ReactMarkdown>
                <div className="mt-2 pb-4 flex gap-4">
                  {problem.topicTags.map(tag => (
                    <span key={tag.slug} className="text-md text-white bg-gray-700 px-2 py-1 rounded-md">
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className='flex-wrap' dangerouslySetInnerHTML={{ __html: problem.content }} />
          </div>
        </Panel>

        <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-blue-300 cursor-col-resize" />

        <Panel defaultSize={50}>
          <div className="h-full flex flex-col">
            <div className="p-4 flex justify-end bg-black">
              <div>
                <select
                  id="theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="p-2 border rounded text-gray-100 bg-gray-900 border-black focus:outline-none appearance-auto"
                >
                  <option value="vs-dark">vs-dark</option>
                  <option value="light">Light</option>
                  <option value="hc-black">High Contrast black</option>
                  <option value="hc-light">High Contrast Light</option>
                </select>
              </div>
              <div>
                <select
                  id="fontSize"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="p-2 border rounded text-gray-100 bg-gray-600 border-black focus:outline-none"
                >
                  <option value="12">12</option>
                  <option value="14">14</option>
                  <option value="16">16</option>
                  <option value="18">18</option>
                  <option value="20">20</option>
                  <option value="22">22</option>
                  <option value="24">24</option>
                  {/* Add more font sizes as needed */}
                </select>
              </div>
            </div>
            <Editor
              height="70%"
              defaultLanguage="python"
              theme={theme}
              value={code} // ✅ Controlled component
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: true },
                fontSize: fontSize,
                lineNumbers: 'on',
                roundedSelection: true,
                scrollBeyondLastLine: true,
              }}
            />
            
            <div className="h-[30%] border-t overflow-auto bg-black ">
              <div className="p-4">
                <h3 className="font-bold mb-2">Test Results</h3>
                {results.length === 0 ? (
                   problem.testCases.map((testCase, index) => (
                    <div key={index} className="p-2 mb-2 rounded bg-gray-800">
                      <div className="flex justify-between text-gray-200">
                        <span className='pb-3 text-md'>Test Case {index + 1}</span>
                        <span>✗ Not run</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-300">
                        <p className='pb-3'>Input: <code className='p-1 rounded-md bg-gray-500 ml-1'>{testCase.input}</code></p>
                        <p className='pb-3'>Expected: <code className='p-1 rounded-md bg-gray-500 ml-1'>{testCase.expectedOutput}</code></p>
                      </div>
                    </div>
                  ))
                ) : (
                  results.map((result, index) => (
                    <div
                      key={index}
                      className={`p-2 mb-2 rounded ${
                        result.passed ? 'bg-green-800' : 'bg-red-600'
                      }`}
                    >
                      <div className="flex justify-between text-gray-200">
                        <span className='pb-3 text-md'>Test Case {index + 1}</span>
                        <span>{result.passed ? '✓ Passed' : '✗ Failed'}</span>
                      </div>
                      {/* {!result.passed && ( */}
                        <div className="mt-2 text-sm text-gray-300">
                          <p className='pb-3'>Input: <code className='p-1 rounded-md bg-gray-500 ml-1'>{result.input}</code></p>
                          <p className='pb-3'>Expected: <code className='p-1 rounded-md bg-gray-500 ml-1'>{result.expectedOutput}</code></p>
                          <p className='pb-3'>Actual: <code className='p-1 rounded-md bg-gray-500 ml-1'>{result.actual}</code></p>
                        </div>
                      {/* )} */}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default ProblemPage;
