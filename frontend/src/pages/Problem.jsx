import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Code, 
  CheckCircle, 
  Clock, 
  Star, 
  Trophy, 
  Target,
  Filter,
  Search,
  ArrowRight,
  Award,
  Play,
  XCircle,
  Zap,
  Users,
  BarChart3,
  Timer,
  ArrowLeft
} from 'lucide-react';

const Problems = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Complete problems database
  const problemsDatabase = [
    {
      id: 1,
      title: 'Sum of Two Numbers',
      difficulty: 'Easy',
      category: 'Math',
      description: 'Given two integers, calculate and return their sum. This is a fundamental programming problem that helps you understand basic input/output operations and arithmetic in programming.',
      detailedDescription: `
You are given two integers as input. Your task is to calculate their sum and output the result.

**Learning Objectives:**
- Understanding basic input/output operations
- Working with integer data types
- Performing arithmetic operations
- Writing clean, readable code

**Approach:**
1. Read two integers from input
2. Add them together
3. Output the result
      `.trim(),
      inputFormat: 'Two space-separated integers a and b (-1000 ≤ a, b ≤ 1000)',
      outputFormat: 'Output a single integer which is the sum of a and b',
      constraints: [
        '-1000 ≤ a, b ≤ 1000',
        'Both numbers are integers'
      ],
      sampleTestCases: [
        { input: '3 5', output: '8', explanation: '3 + 5 = 8' },
        { input: '-2 7', output: '5', explanation: '-2 + 7 = 5' },
        { input: '0 0', output: '0', explanation: '0 + 0 = 0' }
      ],
      solved: true,
      submissions: 1245,
      acceptanceRate: 92,
      tags: ['math', 'beginner', 'arithmetic'],
      starter: `function solve(a, b) {
    // Write your code here
    return a + b;
}`
    },
    {
      id: 2,
      title: 'Maximum of Three Numbers',
      difficulty: 'Easy',
      category: 'Logic',
      description: 'Find and return the maximum among three given integers. This problem helps you understand conditional statements and comparison operations.',
      detailedDescription: `
Given three integers, determine which one is the largest and return it.

**Learning Objectives:**
- Using conditional statements (if-else)
- Comparing multiple values
- Logical thinking and problem-solving
- Understanding control flow

**Approach:**
1. Read three integers
2. Compare them using conditional statements
3. Return the maximum value
      `.trim(),
      inputFormat: 'Three space-separated integers a, b, and c (-100 ≤ a, b, c ≤ 100)',
      outputFormat: 'Output the maximum of the three numbers',
      constraints: [
        '-100 ≤ a, b, c ≤ 100',
        'All numbers are integers',
        'Numbers may be equal'
      ],
      sampleTestCases: [
        { input: '12 25 8', output: '25', explanation: '25 is the largest among 12, 25, and 8' },
        { input: '-5 -2 -10', output: '-2', explanation: '-2 is the largest among the negative numbers' },
        { input: '7 7 7', output: '7', explanation: 'All numbers are equal' }
      ],
      solved: false,
      submissions: 892,
      acceptanceRate: 87,
      tags: ['logic', 'conditionals', 'comparison'],
      starter: `function solve(a, b, c) {
    // Write your code here
    
}`
    },
    {
      id: 3,
      title: 'Fibonacci Sequence',
      difficulty: 'Medium',
      category: 'Algorithms',
      description: 'Generate the first n numbers in the Fibonacci sequence. This classic problem introduces you to sequences, loops, and mathematical patterns.',
      detailedDescription: `
The Fibonacci sequence is a series where each number is the sum of the two preceding ones, usually starting with 0 and 1.

Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

**Learning Objectives:**
- Understanding mathematical sequences
- Implementing iterative solutions
- Working with loops
- Optimizing space complexity

**Approaches:**
1. **Iterative:** Use a loop to calculate each number
2. **Recursive:** Use function recursion (less efficient)
3. **Dynamic Programming:** Store previous results
      `.trim(),
      inputFormat: 'A single integer n (1 ≤ n ≤ 20)',
      outputFormat: 'Output the first n Fibonacci numbers separated by spaces',
      constraints: [
        '1 ≤ n ≤ 20',
        'Output should be space-separated'
      ],
      sampleTestCases: [
        { input: '5', output: '0 1 1 2 3', explanation: 'First 5 Fibonacci numbers' },
        { input: '1', output: '0', explanation: 'Only the first Fibonacci number' },
        { input: '8', output: '0 1 1 2 3 5 8 13', explanation: 'First 8 Fibonacci numbers' }
      ],
      solved: false,
      submissions: 567,
      acceptanceRate: 74,
      tags: ['algorithms', 'sequences', 'loops', 'mathematics'],
      starter: `function solve(n) {
    // Write your code here
    
}`
    },
    {
      id: 4,
      title: 'Prime Number Check',
      difficulty: 'Medium',
      category: 'Math',
      description: 'Determine whether a given number is prime or not. A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.',
      detailedDescription: `
A prime number is a natural number greater than 1 that is not a product of two smaller natural numbers.

**Learning Objectives:**
- Understanding number theory concepts
- Implementing efficient algorithms
- Optimizing loop conditions
- Mathematical problem-solving

**Optimization Tips:**
1. Check divisibility only up to √n
2. Handle even numbers separately
3. Check odd divisors only
      `.trim(),
      inputFormat: 'A single integer n (2 ≤ n ≤ 10000)',
      outputFormat: 'Output "Prime" if the number is prime, "Not Prime" otherwise',
      constraints: [
        '2 ≤ n ≤ 10000',
        'Case-sensitive output required'
      ],
      sampleTestCases: [
        { input: '17', output: 'Prime', explanation: '17 has no divisors other than 1 and 17' },
        { input: '15', output: 'Not Prime', explanation: '15 = 3 × 5' },
        { input: '2', output: 'Prime', explanation: '2 is the smallest prime number' }
      ],
      solved: false,
      submissions: 423,
      acceptanceRate: 68,
      tags: ['math', 'number-theory', 'optimization', 'algorithms'],
      starter: `function solve(n) {
    // Write your code here
    
}`
    },
    {
      id: 5,
      title: 'Array Sum',
      difficulty: 'Easy',
      category: 'Arrays',
      description: 'Calculate the sum of all elements in an array. This problem introduces you to array manipulation and iteration.',
      detailedDescription: `
Given an array of integers, calculate and return the sum of all elements.

**Learning Objectives:**
- Working with arrays
- Iteration and loops
- Accumulator pattern
- Basic array operations

**Approach:**
1. Initialize sum to 0
2. Iterate through each element
3. Add each element to sum
4. Return the final sum
      `.trim(),
      inputFormat: 'First line contains n (size of array), second line contains n space-separated integers',
      outputFormat: 'Output the sum of all array elements',
      constraints: [
        '1 ≤ n ≤ 1000',
        '-1000 ≤ array[i] ≤ 1000'
      ],
      sampleTestCases: [
        { input: '5\n1 2 3 4 5', output: '15', explanation: '1+2+3+4+5 = 15' },
        { input: '3\n-1 0 1', output: '0', explanation: '-1+0+1 = 0' },
        { input: '1\n42', output: '42', explanation: 'Single element array' }
      ],
      solved: true,
      submissions: 1050,
      acceptanceRate: 89,
      tags: ['arrays', 'iteration', 'basic'],
      starter: `function solve(arr) {
    // Write your code here
    
}`
    },
    {
      id: 6,
      title: 'Palindrome Check',
      difficulty: 'Hard',
      category: 'Strings',
      description: 'Check if a given string is a palindrome (reads the same forwards and backwards).',
      detailedDescription: `
A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward.

**Learning Objectives:**
- String manipulation
- Two-pointer technique
- Case handling and normalization
- Algorithm optimization

**Approaches:**
1. **Reverse and Compare:** Reverse the string and compare
2. **Two Pointers:** Compare characters from both ends
3. **Recursive:** Check first and last, then recurse
      `.trim(),
      inputFormat: 'A single string (1 ≤ length ≤ 1000)',
      outputFormat: 'Output "Yes" if palindrome, "No" otherwise',
      constraints: [
        '1 ≤ string length ≤ 1000',
        'String may contain spaces and punctuation',
        'Case insensitive comparison'
      ],
      sampleTestCases: [
        { input: 'racecar', output: 'Yes', explanation: 'Reads same forwards and backwards' },
        { input: 'hello', output: 'No', explanation: 'Not a palindrome' },
        { input: 'A man a plan a canal Panama', output: 'Yes', explanation: 'Ignoring spaces and case' }
      ],
      solved: false,
      submissions: 234,
      acceptanceRate: 56,
      tags: ['strings', 'two-pointers', 'palindrome'],
      starter: `function solve(str) {
    // Write your code here
    
}`
    }
  ];

  // Filter problems based on search and filters
  const filteredProblems = problemsDatabase.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Run code simulation
  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      const results = selectedProblem.sampleTestCases.map((testCase, index) => ({
        id: index + 1,
        input: testCase.input,
        expected: testCase.output,
        actual: testCase.output, // Simulated - in real app, you'd execute the code
        passed: true,
        explanation: testCase.explanation
      }));
      
      setTestResults(results);
      setIsRunning(false);
    }, 2000);
  };

  // Problem list view
  if (!selectedProblem) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                    <Code className="mr-3 text-blue-600" size={32} />
                    Problems
                  </h1>
                  <p className="text-gray-600 mt-1">Practice coding problems and improve your skills</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Trophy className="mr-1 text-yellow-500" size={16} />
                    {problemsDatabase.filter(p => p.solved).length} Solved
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="mr-1 text-blue-500" size={16} />
                    {problemsDatabase.length} Total
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-500" />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="Math">Math</option>
                  <option value="Logic">Logic</option>
                  <option value="Algorithms">Algorithms</option>
                  <option value="Arrays">Arrays</option>
                  <option value="Strings">Strings</option>
                </select>
              </div>
            </div>
          </div>

          {/* Problems List */}
          <div className="space-y-4">
            {filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedProblem(problem)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center">
                        {problem.solved ? (
                          <CheckCircle className="text-green-500 mr-2" size={20} />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-2" />
                        )}
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                          {problem.id}. {problem.title}
                        </h3>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{problem.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users size={14} className="mr-1" />
                          {problem.submissions}
                        </div>
                        <div className="flex items-center">
                          <BarChart3 size={14} className="mr-1" />
                          {problem.acceptanceRate}%
                        </div>
                        <div className="flex items-center">
                          <BookOpen size={14} className="mr-1" />
                          {problem.category}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {problem.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <ArrowRight className="text-gray-400 ml-4" size={20} />
                </div>
              </div>
            ))}
          </div>

          {filteredProblems.length === 0 && (
            <div className="text-center py-12">
              <Search className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No problems found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Problem detail view
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSelectedProblem(null)}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <div className="flex items-center space-x-3">
                    <h1 className="text-xl font-bold text-gray-900">
                      {selectedProblem.id}. {selectedProblem.title}
                    </h1>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedProblem.difficulty)}`}>
                      {selectedProblem.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span>{selectedProblem.category}</span>
                    <span>•</span>
                    <span>{selectedProblem.submissions} submissions</span>
                    <span>•</span>
                    <span>{selectedProblem.acceptanceRate}% acceptance rate</span>
                  </div>
                </div>
              </div>
              {selectedProblem.solved && (
                <div className="flex items-center text-green-600">
                  <CheckCircle size={20} className="mr-2" />
                  Solved
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Problem Description</h2>
              <div className="prose text-gray-700">
                <p className="mb-4">{selectedProblem.description}</p>
                <div className="whitespace-pre-line text-sm">{selectedProblem.detailedDescription}</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Input/Output Format</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Input Format:</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">{selectedProblem.inputFormat}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Output Format:</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">{selectedProblem.outputFormat}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Test Cases</h3>
              <div className="space-y-4">
                {selectedProblem.sampleTestCases.map((testCase, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Example {index + 1}:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Input:</p>
                        <pre className="text-sm bg-gray-50 p-2 rounded border">{testCase.input}</pre>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Output:</p>
                        <pre className="text-sm bg-gray-50 p-2 rounded border">{testCase.output}</pre>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2"><strong>Explanation:</strong> {testCase.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor and Test Results */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Code Editor</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={runCode}
                      disabled={isRunning}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isRunning ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Running...
                        </>
                      ) : (
                        <>
                          <Play size={16} className="mr-2" />
                          Run Code
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <textarea
                  value={userCode || selectedProblem.starter}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-64 font-mono text-sm border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Write your code here..."
                />
              </div>
            </div>

            {/* Test Results */}
            {testResults && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
                <div className="space-y-3">
                  {testResults.map((result) => (
                    <div key={result.id} className={`border rounded-lg p-4 ${result.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Test Case {result.id}</h4>
                        <div className="flex items-center">
                          {result.passed ? (
                            <CheckCircle className="text-green-600" size={20} />
                          ) : (
                            <XCircle className="text-red-600" size={20} />
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Input:</p>
                          <pre className="bg-white p-2 rounded border mt-1">{result.input}</pre>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Expected:</p>
                          <pre className="bg-white p-2 rounded border mt-1">{result.expected}</pre>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Actual:</p>
                          <pre className="bg-white p-2 rounded border mt-1">{result.actual}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;