import React, { useState, useEffect, useCallback, useMemo } from 'react';
// For a real advanced editor, you'd import something like:
// import Editor from '@monaco-editor/react';
// Or integrate CodeMirror

// Utility function to generate a unique ID for mock data (like contest IDs)
const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

function App() {
    // --- State Management ---
    // Manages the current view/page in the single-page application
    const [currentView, setCurrentView] = useState('login'); // 'login', 'problems', 'editor', 'profile'

    // Authentication states
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Stores current user data: { username, email, solved, rank, streak, joinDate, profileViews, contributions, badge, lastSolvedProblemId }
    const [user, setUser] = useState(null);

    // Problem-specific states
    const [selectedProblem, setSelectedProblem] = useState(null); // The problem currently open in the editor
    const [code, setCode] = useState(''); // User's code in the editor
    const [input, setInput] = useState(''); // Custom input for 'Run Code'
    const [output, setOutput] = useState(''); // Output from 'Run' or 'Submit'
    // Detailed test results for submissions: Array of { input, expected, actual, passed, message }
    const [testResults, setTestResults] = useState([]);

    // UI states for editor/console tabs
    const [activeTab, setActiveTab] = useState('description'); // 'description', 'solution', 'submissions' (for problem detail)
    const [consoleTab, setConsoleTab] = useState('testcase'); // 'testcase', 'result' (for console panel)

    // Loading/running state for buttons
    const [isRunning, setIsRunning] = useState(false); // True when 'Run' or 'Submit' is active

    // Tracks user submissions for each problem: { problemId: 'accepted' | 'wrong' | 'pending' }
    const [submissions, setSubmissions] = useState({});

    // Language selected in the code editor
    const [activeLanguage, setActiveLanguage] = useState('cpp'); // Default language

    // --- Mock Problem Data ---
    // Using useMemo to prevent re-creation on every render if problems array is large
    const problems = useMemo(() => [
        {
            id: 1,
            title: "Two Sum",
            slug: "two-sum",
            difficulty: "Easy",
            acceptance: "49.1%",
            description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly one solution***, and you may not use the *same* element twice.

You can return the answer in any order.

**Example 1:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
Explanation: Because nums[1] + nums[2] == 6, we return [1, 2].
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [3,3], target = 6
Output: [0,1]
\`\`\`
`,
            constraints: [
                "2 <= nums.length <= 10^4",
                "-10^9 <= nums[i] <= 10^9",
                "-10^9 <= target <= 10^9",
                "Only one valid answer exists."
            ],
            examples: [{
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            }, {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
                explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
            }],
            starterCode: {
                cpp: `class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        // Your C++ code goes here
        // Example solution idea: Use a hash map to store numbers and their indices.
        // For each number, check if (target - current_number) exists in the map.
    }
};`,
                python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Your Python code goes here
        # Example solution idea: Iterate through the list, for each element,
        # calculate the complement (target - element) and check if it's in a dictionary/hash map.
        pass`,
                java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your Java code goes here
        // Example solution idea: Use a HashMap to store numbers and their indices.
        // Iterate through the array; for each element, compute the complement.
        // If the complement exists in the map, return indices.
    }
}`,
                javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your JavaScript code goes here
    // Example solution idea: Use a Map or an object to store numbers and their indices.
    // Loop through the array, for each number, calculate its complement (target - number).
    // If the complement is in the map, return the indices.
};`
            },
            testCases: [
                { id: 1, input: "[2,7,11,15]\\n9", expected: "[0,1]", isHidden: false },
                { id: 2, input: "[3,2,4]\\n6", expected: "[1,2]", isHidden: false },
                { id: 3, input: "[3,3]\\n6", expected: "[0,1]", isHidden: true },
                { id: 4, input: "[5,6,7,8,9,10]\\n15", expected: "[0,5]", isHidden: true },
                { id: 5, input: "[-1,0,1]\\n0", expected: "[0,2]", isHidden: true }
            ]
        },
        {
            id: 2,
            title: "Add Two Numbers",
            slug: "add-two-numbers",
            difficulty: "Medium",
            acceptance: "37.8%",
            description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

The numbers do not contain any leading zero, except the number 0 itself.

**Example 1:**
\`\`\`
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
\`\`\`

**Example 2:**
\`\`\`
Input: l1 = [0], l2 = [0]
Output: [0]
\`\`\`

**Example 3:**
\`\`\`
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
\`\`\`
`,
            constraints: [
                "The number of nodes in each linked list is in the range [1, 100].",
                "0 <= Node.val <= 9",
                "It is guaranteed that the list represents a number that does not have leading zeros."
            ],
            examples: [{
                input: "l1 = [2,4,3], l2 = [5,6,4]",
                output: "[7,0,8]",
                explanation: "342 + 465 = 807."
            }, {
                input: "l1 = [0], l2 = [0]",
                output: "[0]",
                explanation: ""
            }],
            starterCode: {
                cpp: `struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Your C++ code goes here
        // Think about handling carry-overs.
    }
};`,
                python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Your Python code goes here
        # Implement a dummy head node.
        pass`,
                java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 * int val;
 * ListNode next;
 * ListNode() {}
 * ListNode(int val) { this.val = val; }
 * ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Your Java code goes here
        // Remember to handle the case where one list is longer than the other.
    }
}`,
                javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // Your JavaScript code goes here
    // Use a 'dummy' node to simplify list construction.
};`
            },
            testCases: [
                { id: 1, input: "[2,4,3]\\n[5,6,4]", expected: "[7,0,8]", isHidden: false },
                { id: 2, input: "[0]\\n[0]", expected: "[0]", isHidden: false },
                { id: 3, input: "[9,9,9,9,9,9,9]\\n[9,9,9,9]", expected: "[8,9,9,9,0,0,0,1]", isHidden: true }
            ]
        },
        {
            id: 3,
            title: "Longest Substring Without Repeating Characters",
            slug: "longest-substring-without-repeating-characters",
            difficulty: "Medium",
            acceptance: "33.8%",
            description: `Given a string \`s\`, find the length of the *longest substring* without repeating characters.

A substring is a contiguous non-empty sequence of characters within a string. A repeating character means a character that has appeared more than once in the current substring.

**Example 1:**
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
\`\`\`

**Example 3:**
\`\`\`
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
\`\`\`
`,
            constraints: [
                "0 <= s.length <= 5 * 10^4",
                "s consists of English letters, digits, symbols and spaces."
            ],
            examples: [{
                input: 's = "abcabcbb"',
                output: "3",
                explanation: 'The answer is "abc", with the length of 3.'
            }, {
                input: 's = "bbbbb"',
                output: "1",
                explanation: 'The answer is "b", with the length of 1.'
            }],
            starterCode: {
                cpp: `class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        // Your C++ code goes here
        // Consider using a sliding window approach with a hash set.
    }
};`,
                python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Your Python code goes here
        # Use a sliding window and a set to keep track of characters in the current window.
        pass`,
                java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Your Java code goes here
        // A sliding window with a HashSet is a common approach.
    }
}`,
                javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // Your JavaScript code goes here
    // Implement a sliding window with a Set to track unique characters.
};`
            },
            testCases: [
                { id: 1, input: "abcabcbb", expected: "3", isHidden: false },
                { id: 2, input: "bbbbb", expected: "1", isHidden: false },
                { id: 3, input: "pwwkew", expected: "3", isHidden: false },
                { id: 4, input: "dvdf", expected: "3", isHidden: true },
                { id: 5, input: " ", expected: "1", isHidden: true }
            ]
        }
    ], []); // Empty dependency array means problems data is created only once

    // --- Mock Backend API Calls ---

    // This simulates user authentication (login/registration)
    const mockAuthCall = useCallback(async (type, data) => {
        setIsRunning(true);
        setOutput(`Attempting ${type === 'login' ? 'login' : 'registration'}...`);
        return new Promise(resolve => {
            setTimeout(() => {
                setIsRunning(false);
                setConsoleTab('result'); // Switch to result tab after operation

                const mockExistingUsers = ['testuser', 'coder1']; // Mock existing usernames
                const mockExistingEmails = ['test@example.com', 'coder@example.com']; // Mock existing emails

                if (type === 'login') {
                    // Simulate successful login for specific mock user
                    if (data.username === 'testuser' && data.password === 'password123') {
                        setUser({
                            username: data.username,
                            email: 'test@example.com',
                            solved: Object.keys(submissions).filter(sId => submissions[sId] === 'accepted').length, // Current count based on state
                            rank: 1250,
                            streak: 3,
                            joinDate: '2023-01-15',
                            profileViews: Math.floor(Math.random() * 1000) + 100,
                            contributions: Math.floor(Math.random() * 500) + 50,
                            badge: "Algorithm Enthusiast"
                        });
                        setIsLoggedIn(true);
                        setCurrentView('problems'); // Redirect to problems page
                        resolve({ success: true, message: "Login successful!" });
                    } else if (data.username === 'coder1' && data.password === 'pass123') {
                        setUser({
                            username: data.username,
                            email: 'coder@example.com',
                            solved: Object.keys(submissions).filter(sId => submissions[sId] === 'accepted').length,
                            rank: 890,
                            streak: 10,
                            joinDate: '2022-07-20',
                            profileViews: Math.floor(Math.random() * 2000) + 500,
                            contributions: Math.floor(Math.random() * 1000) + 100,
                            badge: "Master Coder"
                        });
                        setIsLoggedIn(true);
                        setCurrentView('problems');
                        resolve({ success: true, message: "Login successful!" });
                    }
                    else {
                        resolve({ success: false, message: "Invalid username or password. Please try again." });
                    }
                } else if (type === 'register') {
                    // Simulate registration: check if username/email already exists
                    if (mockExistingUsers.includes(data.username) || mockExistingEmails.includes(data.email)) {
                        resolve({ success: false, message: "Username or email already exists. Please try logging in or use different credentials." });
                    } else {
                        // Simulate successful registration and auto-login
                        setUser({
                            username: data.username,
                            email: data.email,
                            solved: 0,
                            rank: 2000, // New users start at a base rank
                            streak: 0,
                            joinDate: new Date().toISOString().split('T')[0],
                            profileViews: 0,
                            contributions: 0,
                            badge: "Newbie Hacker"
                        });
                        setIsLoggedIn(true);
                        setCurrentView('problems'); // Redirect to problems page
                        resolve({ success: true, message: "Account created successfully!" });
                    }
                }
            }, 1500); // Simulate network delay
        });
    }, [submissions]); // `submissions` is a dependency because `user.solved` depends on it

    // This simulates running code against custom input or problem examples
    const mockRunCode = useCallback(async (problemId, code, language, customInput) => {
        setIsRunning(true);
        setOutput('Running code...');
        setConsoleTab('result'); // Always switch to result tab after execution

        return new Promise(resolve => {
            setTimeout(() => {
                const problem = problems.find(p => p.id === problemId);
                if (!problem) {
                    setIsRunning(false);
                    setOutput('Error: Problem not found.');
                    return resolve({ status: 'error', message: 'Problem not found' });
                }

                let simulatedOutput = '';
                const runtime = Math.floor(Math.random() * 150) + 20; // 20-170ms
                const memory = Math.floor(Math.random() * 70) + 15; // 15-85MB

                // Simulate compilation errors for specific keywords
                if (code.includes('COMPILE_ERROR') || code.includes('segmentation fault')) {
                    simulatedOutput = `Compilation Error in ${language}!\n\nDetails: Your code contains syntax errors or unhandled exceptions. Please check your syntax and logic.\n\nSimulated error output: \`Error: Undefined variable 'x'\``;
                    setIsRunning(false);
                    setOutput(simulatedOutput);
                    return resolve({ status: 'compilation_error', output: simulatedOutput, runtime: 0, memory: 0 });
                }

                if (customInput) {
                    // Simulating logic for custom input (very basic)
                    simulatedOutput = `Successfully ran your ${language} code with custom input:\n\n\`\`\`\n${customInput}\n\`\`\`\n\n--- Your Simulated Output ---\n${problem.examples[0]?.output || 'Simulated output based on problem logic.'}\n\nRuntime: ${runtime} ms\nMemory: ${memory} MB`;
                } else {
                    // Simulating running against problem's first example
                    const example = problem.examples[0];
                    if (example) {
                        simulatedOutput = `Successfully ran your ${language} code against Problem Example 1:\nInput:\n\`\`\`\n${example.input}\n\`\`\`\nExpected Output:\n\`\`\`\n${example.output}\n\`\`\`\n\n--- Your Simulated Output ---\n\`\`\`\n${example.output}\n\`\`\` (Assuming correct for demo)\n\nRuntime: ${runtime} ms\nMemory: ${memory} MB`;
                    } else {
                        simulatedOutput = `Successfully ran your ${language} code.\n\nMock Output for '${problem.title}': No examples available to test against.\n\nRuntime: ${runtime} ms\nMemory: ${memory} MB`;
                    }
                }

                setOutput(simulatedOutput);
                setTestResults([]); // Clear previous submission test results
                setIsRunning(false);
                resolve({
                    status: 'executed',
                    output: simulatedOutput,
                    runtime,
                    memory
                });
            }, 1800); // Simulate network/execution delay
        });
    }, [problems]);

    // This simulates submitting code to be judged against all test cases
    const mockSubmitCode = useCallback(async (problemId, code, language) => {
        setIsRunning(true);
        setOutput('Judging solution...');
        setConsoleTab('result'); // Always switch to result tab after submission

        return new Promise(resolve => {
            setTimeout(() => {
                const problem = problems.find(p => p.id === problemId);
                if (!problem) {
                    setIsRunning(false);
                    setOutput('Error: Problem not found.');
                    return resolve({ status: 'error', message: 'Problem not found' });
                }

                // Simulate random pass/fail for test cases, making hidden ones harder to pass
                const mockJudgeResult = problem.testCases.map((testCase, idx) => {
                    let passed = false;
                    let message = '';
                    const randomFailFactor = testCase.isHidden ? 0.6 : 0.2; // 60% chance to fail hidden, 20% to fail public

                    // Basic code content check for demo success/fail
                    if (code.includes('// CORRECT_SOLUTION_MARKER')) { // If solution marker is in code, pass all tests
                        passed = true;
                    } else if (Math.random() > randomFailFactor) { // Otherwise, random pass/fail
                        passed = true;
                    }

                    if (passed) {
                        message = 'Test case passed.';
                    } else {
                        message = 'Wrong Answer: Output mismatch.';
                        if (code.includes('// TIME_LIMIT_EXCEEDED')) message = 'Time Limit Exceeded.';
                        if (code.includes('// RUNTIME_ERROR')) message = 'Runtime Error.';
                    }

                    return {
                        id: testCase.id,
                        input: testCase.input,
                        expected: testCase.expected,
                        actual: passed ? testCase.expected : `Mock Incorrect Output for test ${idx + 1}`, // Mock incorrect output
                        passed: passed,
                        message: message,
                        isHidden: testCase.isHidden // Keep hidden status for display
                    };
                });

                const allPassed = mockJudgeResult.every(r => r.passed);
                const passedCount = mockJudgeResult.filter(r => r.passed).length;
                const totalTests = mockJudgeResult.length;

                let finalOutput;
                let submissionStatus;
                let actualRuntime = Math.floor(Math.random() * 100) + 20; // 20-120ms
                let actualMemory = Math.floor(Math.random() * 20) + 10; // 10-30MB

                if (allPassed) {
                    submissionStatus = 'accepted';
                    // Update user's solved count and streak only if new problem solved
                    setUser(prevUser => {
                        const isProblemNewlyAccepted = !submissions[problemId] || submissions[problemId] !== 'accepted';
                        let newSolved = prevUser.solved;
                        let newStreak = prevUser.streak;
                        let newRank = prevUser.rank;

                        if (isProblemNewlyAccepted) {
                            newSolved = (prevUser.solved || 0) + 1;
                            newStreak = (prevUser.streak || 0) + 1;
                            // Improve rank based on problem difficulty
                            if (prevUser.rank > 100) {
                                newRank = prevUser.rank - (problem.difficulty === 'Easy' ? 5 : problem.difficulty === 'Medium' ? 15 : 30);
                            }
                        }

                        return {
                            ...prevUser,
                            solved: newSolved,
                            streak: newStreak,
                            rank: newRank
                        };
                    });
                    setSubmissions(prev => ({ ...prev, [problemId]: 'accepted' }));
                    finalOutput = `🎉 Accepted! 🎉\n\nAll ${totalTests} test cases passed.\nRuntime: ${actualRuntime} ms (beats ${Math.floor(Math.random() * 30) + 60}%)\nMemory: ${actualMemory} MB (beats ${Math.floor(Math.random() * 30) + 60}%)\n\nCongratulations! Your solution is correct and efficient.`;
                } else {
                    submissionStatus = 'wrong';
                    setSubmissions(prev => ({ ...prev, [problemId]: 'wrong' }));
                    const firstFailedTest = mockJudgeResult.find(r => !r.passed);
                    finalOutput = `❌ Wrong Answer ❌\n\n${passedCount}/${totalTests} test cases passed.\n\n` +
                        `Failed on Test Case ${firstFailedTest?.id || 'N/A'}:\n` +
                        `Input: \`${firstFailedTest?.input || 'N/A'}\`\n` +
                        `Expected: \`${firstFailedTest?.expected || 'N/A'}\`\n` +
                        `Your Output: \`${firstFailedTest?.actual || 'N/A'}\`\n\n` +
                        `Tip: Review your logic carefully, especially edge cases and constraints.`;
                }

                setOutput(finalOutput);
                setTestResults(mockJudgeResult);
                setIsRunning(false);
                resolve({
                    status: submissionStatus,
                    testResults: mockJudgeResult,
                    message: finalOutput,
                    runtime: actualRuntime,
                    memory: actualMemory
                });
            }, 2500); // Simulate network/judging delay (longer than run)
        });
    }, [problems, submissions]); // Depend on problems and submissions for accurate mocking

    // Effect to set default code when a problem is selected or language changes
    useEffect(() => {
        if (selectedProblem) {
            // Set code from starterCode for the active language, or fallback to cpp
            setCode(selectedProblem.starterCode[activeLanguage] || selectedProblem.starterCode.cpp);
            // Clear previous outputs/results when a new problem is opened
            setOutput('');
            setTestResults([]);
            setActiveTab('description'); // Default tab to description
            setConsoleTab('testcase'); // Default console tab to testcase
        }
    }, [selectedProblem, activeLanguage]); // Re-run when problem or language changes

    // --- Components ---

    // Login/Register Page Component
    const LoginPage = () => {
        const [loginData, setLoginData] = useState({ username: '', password: '', email: '' });
        const [isSignUp, setIsSignUp] = useState(false); // Toggles between login and sign-up form
        const [loginMessage, setLoginMessage] = useState(''); // Displays feedback messages

        // Handles form submission for both login and registration
        const handleSubmit = async (e) => {
            e.preventDefault(); // Prevent default form submission
            setLoginMessage(''); // Clear previous messages

            // Basic client-side validation
            if (!loginData.username || !loginData.password) {
                setLoginMessage('Please enter both username and password.');
                return;
            }
            if (isSignUp && !loginData.email) {
                setLoginMessage('Please enter your email for registration.');
                return;
            }

            // Call the mock authentication function
            const result = await mockAuthCall(isSignUp ? 'register' : 'login', loginData);
            if (!result.success) {
                setLoginMessage(result.message); // Display error message from mock backend
            }
            // If successful, mockAuthCall already handles state updates (isLoggedIn, user, currentView)
        };

        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 font-inter">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 backdrop-blur-sm bg-opacity-95 transform hover:scale-[1.01] transition-all duration-300">
                    <div className="text-center mb-8">
                        <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg animate-pulse-once">
                            <span className="text-white text-2xl font-bold">{"</>"}</span> {/* Code icon */}
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            CodeQuorem
                        </h1>
                        <p className="text-gray-600 mt-2 text-lg">Master algorithms, conquer challenges</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email input for sign-up */}
                        {isSignUp && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        )}
                        {/* Username input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder={isSignUp ? 'Choose a username' : 'Enter username (e.g., testuser)'}
                                required
                            />
                        </div>

                        {/* Password input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder={isSignUp ? 'Create a password' : 'Enter password (e.g., password123)'}
                                required
                            />
                        </div>
                        {/* Feedback message (error/success) */}
                        {loginMessage && (
                            <div className="text-red-600 text-sm text-center font-medium">{loginMessage}</div>
                        )}
                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isRunning} // Disable button if operation is in progress
                            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform shadow-lg
                                ${isRunning ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02]'}
                                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                        >
                            {isRunning ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                        </button>
                    </form>

                    {/* Toggle between login and sign-up */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setLoginData({ username: '', password: '', email: '' }); // Clear form on toggle
                                setLoginMessage(''); // Clear message
                            }}
                            className="text-purple-600 hover:text-purple-700 text-sm font-medium focus:outline-none"
                        >
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Global Navigation Bar Component
    const Navbar = () => (
        <nav className="bg-white shadow-lg border-b border-gray-200 px-6 py-4 sticky top-0 z-50 font-inter">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Left side: Logo and main navigation links */}
                <div className="flex items-center space-x-8">
                    {/* Logo/Brand */}
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white text-lg font-bold">{"</>"}</span>
                        </div>
                        {/* Brand name, clickable to problems page */}
                        <button
                            onClick={() => setCurrentView('problems')}
                            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity focus:outline-none"
                        >
                            CodeQuorem
                        </button>
                    </div>

                    {/* Main Navigation Links (hidden on small screens) */}
                    <div className="hidden md:flex space-x-1">
                        <button
                            onClick={() => setCurrentView('problems')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none ${
                                currentView === 'problems'
                                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            Problems
                        </button>
                        <button
                            onClick={() => setCurrentView('profile')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none ${
                                currentView === 'profile'
                                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            Profile
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none">
                            Contest
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none">
                            Discuss
                        </button>
                    </div>
                </div>

                {/* Right side: User stats and logout */}
                <div className="flex items-center space-x-4">
                    {/* User Rank Display */}
                    <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 shadow-sm">
                        <span className="text-lg">🏆</span> {/* Trophy emoji */}
                        <span className="font-semibold text-gray-700">{user?.rank || 'N/A'}</span>
                    </div>

                    {/* User Avatar and Username */}
                    <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white text-sm font-bold">{user?.username?.[0]?.toUpperCase() || 'U'}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 hidden sm:block">{user?.username || 'Guest'}</span>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={() => {
                            setIsLoggedIn(false); // Set logged out state
                            setCurrentView('login'); // Redirect to login page
                            setUser(null); // Clear user data
                            setSubmissions({}); // Clear submissions
                            setSelectedProblem(null); // Clear selected problem
                            // Reset all editor-related states
                            setCode('');
                            setInput('');
                            setOutput('');
                            setTestResults([]);
                            setActiveTab('description');
                            setConsoleTab('testcase');
                            setIsRunning(false);
                            setActiveLanguage('cpp');
                        }}
                        className="text-gray-500 hover:text-red-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-all focus:outline-none"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );

    // Profile Page Component
    const ProfilePage = () => {
        // Calculate solved problem counts by difficulty
        const solvedCount = Object.keys(submissions).filter(id => submissions[id] === 'accepted').length;
        const easyCount = problems.filter(p => p.difficulty === 'Easy' && submissions[p.id] === 'accepted').length;
        const mediumCount = problems.filter(p => p.difficulty === 'Medium' && submissions[p.id] === 'accepted').length;
        const hardCount = problems.filter(p => p.difficulty === 'Hard' && submissions[p.id] === 'accepted').length;

        // Total problems per difficulty
        const totalEasy = problems.filter(p => p.difficulty === 'Easy').length;
        const totalMedium = problems.filter(p => p.difficulty === 'Medium').length;
        const totalHard = problems.filter(p => p.difficulty === 'Hard').length;

        // Mock upcoming contests data
        const upcomingContests = useMemo(() => [
            { id: generateUniqueId(), name: "Weekly Contest 350", date: "Jul 1, 2025", time: "10:30 AM IST", duration: "1h 30m" },
            { id: generateUniqueId(), name: "Biweekly Contest 120", date: "Jul 15, 2025", time: "08:00 PM IST", duration: "1h 30m" },
            { id: generateUniqueId(), name: "July Monthly Challenge", date: "Jul 20, 2025", time: "06:00 AM IST", duration: "24h" },
            { id: generateUniqueId(), name: "Data Structures & Algorithms Marathon", date: "Aug 5, 2025", time: "09:00 AM IST", duration: "3h 00m" },
        ], []); // Memoize to prevent unnecessary re-creation

        return (
            <div className="min-h-screen bg-gray-50 font-inter">
                <Navbar />
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* User Profile Header Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 transform hover:scale-[1.005] transition-transform duration-200">
                        <div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-6 sm:space-y-0">
                            {/* User Avatar */}
                            <div className="h-32 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 flex-shrink-0">
                                <span className="text-white text-5xl font-bold">{user?.username?.[0]?.toUpperCase() || 'U'}</span>
                            </div>
                            {/* User Info and Stats */}
                            <div className="flex-1 text-center sm:text-left">
                                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{user?.username}</h1>
                                <p className="text-gray-600 text-lg mb-4">Joined CodeQuorem on {user?.joinDate}</p>
                                {/* Key Metrics Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                                    <div className="p-4 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
                                        <div className="text-3xl font-bold text-blue-700">{user?.rank || 'N/A'}</div>
                                        <div className="text-sm text-gray-600 mt-1">Global Rank</div>
                                    </div>
                                    <div className="p-4 bg-orange-50 rounded-xl shadow-sm border border-orange-100">
                                        <div className="text-3xl font-bold text-orange-700">{user?.streak || 0}</div>
                                        <div className="text-sm text-gray-600 mt-1">🔥 Day Streak</div>
                                    </div>
                                    <div className="p-4 bg-purple-50 rounded-xl shadow-sm border border-purple-100">
                                        <div className="text-3xl font-bold text-purple-700">{user?.profileViews || 0}</div>
                                        <div className="text-sm text-gray-600 mt-1">Profile Views</div>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-xl shadow-sm border border-green-100">
                                        <div className="text-3xl font-bold text-green-700">{user?.contributions || 0}</div>
                                        <div className="text-sm text-gray-600 mt-1">Contributions</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid: Solved Problems and Contests */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Solved Problems by Difficulty Section */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Solved Problems by Difficulty</h2>
                            <div className="space-y-6">
                                {/* Easy Problems Progress */}
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold text-gray-700 min-w-[70px]">Easy</span>
                                    <div className="flex items-center space-x-2 min-w-[100px]">
                                        <span className="text-lg font-bold text-green-600">{easyCount}</span>
                                        <span className="text-gray-500">/ {totalEasy}</span>
                                    </div>
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-green-600 h-full rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${(easyCount / totalEasy) * 100 || 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                                {/* Medium Problems Progress */}
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold text-gray-700 min-w-[70px]">Medium</span>
                                    <div className="flex items-center space-x-2 min-w-[100px]">
                                        <span className="text-lg font-bold text-yellow-600">{mediumCount}</span>
                                        <span className="text-gray-500">/ {totalMedium}</span>
                                    </div>
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-yellow-600 h-full rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${(mediumCount / totalMedium) * 100 || 0}%` }}
                                ></div>
                                    </div>
                                </div>
                                {/* Hard Problems Progress */}
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold text-gray-700 min-w-[70px]">Hard</span>
                                    <div className="flex items-center space-x-2 min-w-[100px]">
                                        <span className="text-lg font-bold text-red-600">{hardCount}</span>
                                        <span className="text-gray-500">/ {totalHard}</span>
                                    </div>
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-red-600 h-full rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${(hardCount / totalHard) * 100 || 0}%` }}
                                ></div>
                                    </div>
                                </div>
                            </div>
                            {/* Total Solved Summary */}
                            <div className="mt-8 text-center bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                                <h3 className="text-xl font-bold text-blue-800 mb-2">Total Solved: {solvedCount} / {problems.length}</h3>
                                <p className="text-blue-600">Keep up the great work! 🎉</p>
                            </div>
                        </div>

                        {/* Upcoming Contests Section */}
                        <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Contests</h2>
                            {upcomingContests.length === 0 ? (
                                <div className="text-center py-6">
                                    <span className="text-3xl mb-3 block">😴</span>
                                    <p className="text-gray-500">No upcoming contests at the moment.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {upcomingContests.map(contest => (
                                        <div key={contest.id} className="p-4 bg-purple-50 rounded-lg border border-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between transition-all duration-200 hover:shadow-md">
                                            <div>
                                                <h3 className="font-semibold text-purple-800 text-lg mb-1">{contest.name}</h3>
                                                <p className="text-sm text-gray-600">{contest.date} - {contest.time}</p>
                                            </div>
                                            <span className="text-xs font-medium text-purple-700 bg-purple-200 px-3 py-1 rounded-full mt-2 sm:mt-0">{contest.duration}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mt-6 text-center">
                                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium focus:outline-none">
                                    View All Contests →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Submissions Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Submissions</h2>
                        {Object.keys(submissions).length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                                <span className="text-4xl mb-4 block">📝</span>
                                <p className="text-gray-500 text-lg">No submissions yet</p>
                                <p className="text-gray-400 text-sm mt-2">Start solving problems to see your activity here</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {Object.entries(submissions).map(([problemId, status]) => {
                                    const problem = problems.find(p => p.id === parseInt(problemId));
                                    if (!problem) return null; // Handle case where problem might not be found

                                    return (
                                        <div key={problemId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-sm">
                                            <div className="flex items-center space-x-4">
                                                {/* Submission Status Icon */}
                                                <span className={`text-xl ${status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                                                    {status === 'accepted' ? '✅' : '❌'}
                                                </span>
                                                {/* Problem Title and Difficulty */}
                                                <div>
                                                    <div className="font-semibold text-gray-800 text-base">{problem?.title}</div>
                                                    <div className="text-sm text-gray-500">{problem?.difficulty}</div>
                                                </div>
                                            </div>
                                            {/* Status Badge */}
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                status === 'accepted'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {status === 'accepted' ? 'Accepted' : 'Wrong Answer'}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Problems List Page Component
    const ProblemsPage = () => (
        <div className="min-h-screen bg-gray-50 font-inter">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Problems</h1>
                    <p className="text-gray-600 text-lg">Challenge yourself with coding problems</p>
                </div>

                {/* Problems List Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">All Problems</h2>
                        {/* Solved Problems Count */}
                        <div className="text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                            {Object.keys(submissions).filter(id => submissions[id] === 'accepted').length} / {problems.length} solved
                        </div>
                    </div>

                    {/* List of Problems */}
                    <div className="divide-y divide-gray-100">
                        {problems.map((problem) => (
                            <div
                                key={problem.id}
                                className="px-8 py-6 hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
                                onClick={() => {
                                    setSelectedProblem(problem); // Set the problem to display in the editor
                                    // Reset editor related states for the new problem
                                    setCode(problem.starterCode[activeLanguage] || problem.starterCode.cpp);
                                    setInput('');
                                    setOutput('');
                                    setTestResults([]);
                                    setActiveTab('description'); // Default tab to description
                                    setConsoleTab('testcase'); // Default console tab to testcase
                                    setCurrentView('editor'); // Navigate to the editor view
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-6">
                                        {/* Problem Status Icon (Solved/Attempted/Unattempted) */}
                                        <div className="flex-shrink-0">
                                            {submissions[problem.id] === 'accepted' ? (
                                                <span className="text-green-500 text-xl">✅</span> // Accepted
                                            ) : submissions[problem.id] === 'wrong' ? (
                                                <span className="text-red-500 text-xl">❌</span> // Wrong Answer
                                            ) : (
                                                <div className="h-6 w-6 rounded-full border-2 border-gray-300 group-hover:border-blue-400 transition-colors flex items-center justify-center">
                                                    <span className="text-gray-400 text-xs font-semibold">{problem.id}</span> {/* Problem ID as placeholder */}
                                                </div>
                                            )}
                                        </div>

                                        {/* Problem Title and Description Snippet */}
                                        <div>
                                            <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                                {problem.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{problem.description.split('\n')[0].replace(/`/g, '')}...</p> {/* First line as snippet */}
                                        </div>
                                    </div>

                                    {/* Problem Difficulty and Acceptance Rate */}
                                    <div className="flex items-center space-x-6">
                                        {/* Difficulty Badge */}
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                                problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {problem.difficulty}
                                        </span>
                                        {/* Acceptance Rate */}
                                        <span className="text-sm font-medium text-gray-500">{problem.acceptance}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // Code Editor and Problem Detail Page Component
    const CodeEditor = () => {

        // Handler for "Run Code" button
        const handleRun = async () => {
            await mockRunCode(selectedProblem.id, code, activeLanguage, input);
            // Output and test results are set directly by mockRunCode
        };

        // Handler for "Submit Code" button
        const handleSubmit = async () => {
            await mockSubmitCode(selectedProblem.id, code, activeLanguage);
            // Output and test results are set directly by mockSubmitCode
        };

        // A very basic, visual-only syntax highlighter for the textarea.
        // For a real editor, you'd typically use a dedicated library (e.g., Monaco Editor, CodeMirror).
        const highlightCode = (codeText, lang) => {
            // Apply different colors based on keywords/patterns
            let highlighted = codeText
                .replace(/\b(class|public|private|static|void|int|double|bool|string|std::vector|vector|ListNode|struct|return|if|else|for|while|try|catch|new|this|pass|def|var|function|const|let)\b/g, '<span class="text-blue-400 font-semibold">$&</span>') // Keywords
                .replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500 italic">$&</span>') // Comments
                .replace(/"([^"]*)"|'([^']*)'/g, '<span class="text-orange-300">$&</span>') // Strings
                .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-purple-400">$&</span>') // Booleans/null
                .replace(/\b\d+(\.\d+)?\b/g, '<span class="text-green-400">$&</span>') // Numbers
                .replace(/\b(cout|cin|printf|scanf|console\.log|System\.out\.println|print)\b/g, '<span class="text-yellow-400">$&</span>'); // Common I/O

            return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
        };

        return (
            <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
                <Navbar /> {/* Global navigation bar */}

                {/* Main content area: Problem Description (left) and Code Editor/Console (right) */}
                <div className="flex flex-1 pt-16 lg:flex-row flex-col"> {/* pt-16 for fixed navbar */}
                    {/* Left Panel: Problem Description */}
                    <div className="w-full lg:w-1/2 bg-white border-r border-gray-200 overflow-y-auto shadow-md">
                        <div className="p-8">
                            {/* Back to Problems button and Difficulty Badge */}
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={() => setCurrentView('problems')}
                                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm focus:outline-none"
                                >
                                    <span>←</span>
                                    <span>Back to Problems</span>
                                </button>
                                <span className={`px-4 py-2 text-xs font-semibold rounded-full ${
                                    selectedProblem?.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                        selectedProblem?.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    {selectedProblem?.difficulty}
                                </span>
                            </div>

                            {/* Problem Title */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                                {selectedProblem?.title}
                            </h1>

                            {/* Tabs for Description, Solution, Submissions */}
                            <div className="flex border-b border-gray-200 mb-6">
                                <button
                                    onClick={() => setActiveTab('description')}
                                    className={`px-6 py-3 text-sm font-semibold transition-colors focus:outline-none ${
                                        activeTab === 'description'
                                            ? 'text-blue-600 border-b-2 border-blue-500'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Description
                                </button>
                                <button
                                    onClick={() => setActiveTab('solution')}
                                    className={`px-6 py-3 text-sm font-semibold transition-colors focus:outline-none ${
                                        activeTab === 'solution'
                                            ? 'text-blue-600 border-b-2 border-blue-500'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Solution (Mock)
                                </button>
                                <button
                                    onClick={() => setActiveTab('submissions')}
                                    className={`px-6 py-3 text-sm font-semibold transition-colors focus:outline-none ${
                                        activeTab === 'submissions'
                                            ? 'text-blue-600 border-b-2 border-blue-500'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Submissions
                                </button>
                            </div>

                            {/* Content based on active tab */}
                            {activeTab === 'description' && (
                                <div className="prose prose-gray max-w-none text-base leading-relaxed">
                                    {/* Problem Description (renders Markdown-like text) */}
                                    <pre className="whitespace-pre-wrap font-sans text-gray-700">
                                        {selectedProblem?.description}
                                    </pre>

                                    {/* Examples Section */}
                                    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Examples:</h3>
                                    {selectedProblem?.examples.map((example, idx) => (
                                        <div key={idx} className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="font-semibold text-gray-900">Input:</span>
                                                    <pre className="mt-2 bg-gray-200 px-3 py-2 rounded-lg text-sm whitespace-pre-wrap break-words font-mono text-gray-800">{example.input}</pre>
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-gray-900">Output:</span>
                                                    <pre className="mt-2 bg-gray-200 px-3 py-2 rounded-lg text-sm whitespace-pre-wrap break-words font-mono text-gray-800">{example.output}</pre>
                                                </div>
                                                {example.explanation && (
                                                    <div>
                                                        <span className="font-semibold text-gray-900">Explanation:</span>
                                                        <p className="ml-2 text-gray-700 mt-1 text-sm">{example.explanation}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Constraints Section */}
                                    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Constraints:</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                                        {selectedProblem?.constraints.map((constraint, idx) => (
                                            <li key={idx} className="text-sm">{constraint}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {activeTab === 'solution' && (
                                <div className="text-center py-12 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
                                    <span className="text-5xl mb-4 block">💡</span>
                                    <h3 className="text-xl font-bold text-gray-800">Solution Coming Soon!</h3>
                                    <p className="text-gray-600 mt-2">Detailed official solutions will be available after you solve the problem or unlock premium features.</p>
                                </div>
                            )}

                            {activeTab === 'submissions' && (
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Your Submissions for This Problem</h3>
                                    {submissions[selectedProblem.id] ? (
                                        <div className={`p-4 rounded-lg flex items-center justify-between transition-all duration-200 hover:shadow-md ${
                                            submissions[selectedProblem.id] === 'accepted' ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
                                            }`}>
                                            <span className={`text-lg font-semibold ${submissions[selectedProblem.id] === 'accepted' ? 'text-green-700' : 'text-red-700'}`}>
                                                {submissions[selectedProblem.id] === 'accepted' ? '✅ Accepted' : '❌ Wrong Answer'}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-600">
                                            <span className="text-4xl mb-3 block">🧐</span>
                                            No submissions for this problem yet. Be the first!
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel: Code Editor and Console */}
                    <div className="w-full lg:w-1/2 flex flex-col shadow-lg">
                        {/* Editor Controls (Language Selector, Run/Submit Buttons) */}
                        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
                            <select
                                value={activeLanguage}
                                onChange={(e) => setActiveLanguage(e.target.value)}
                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 font-medium bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                                aria-label="Select programming language"
                            >
                                {/* Map through available languages from starterCode */}
                                {Object.keys(selectedProblem?.starterCode || {}).map(lang => (
                                    <option key={lang} value={lang}>
                                        {lang.toUpperCase()} {/* Display as C++, PYTHON, JAVA etc. */}
                                    </option>
                                ))}
                            </select>
                            <div className="flex space-x-3">
                                {/* Run Button */}
                                <button
                                    onClick={handleRun}
                                    disabled={isRunning}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all transform shadow-md
                                        ${isRunning
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-[1.01]'}
                                        focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2`}
                                    aria-label="Run code"
                                >
                                    <span>{isRunning ? '⏳' : '▶️'}</span>
                                    <span>{isRunning ? 'Running...' : 'Run'}</span>
                                </button>
                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={isRunning}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all transform shadow-md
                                        ${isRunning
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-green-600 hover:bg-green-700 text-white hover:scale-[1.01]'}
                                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                                    aria-label="Submit code"
                                >
                                    {isRunning ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </div>

                        {/* Code Editor Area (using textarea for simplicity in this demo) */}
                        <div className="flex-1 relative border-b border-gray-700">
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-full bg-gray-900 text-gray-100 font-mono text-sm p-6 resize-none outline-none border-none leading-relaxed tracking-wide custom-scrollbar"
                                style={{
                                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                    tabSize: 4 // Visual tab size
                                }}
                                placeholder="Write your code here..."
                                spellCheck={false} // Disable browser spell check
                                autoCorrect="off" // Disable autocorrect
                                autoCapitalize="off" // Disable autocapitalize
                                aria-label="Code editor"
                            />
                            {/*
                            // For actual syntax highlighting, you would typically use a library like Monaco Editor:
                            // <Editor
                            //   height="100%"
                            //   language={activeLanguage}
                            //   value={code}
                            //   onChange={(newValue) => setCode(newValue)}
                            //   theme="vs-dark" // Or 'vs-light'
                            //   options={{
                            //     minimap: { enabled: false },
                            //     lineNumbers: 'on',
                            //     wordWrap: 'on',
                            //     scrollBeyondLastLine: false,
                            //     fontSize: 14,
                            //     automaticLayout: true,
                            //     fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                            //   }}
                            // />
                            */}
                        </div>

                        {/* Console Panel (Testcase/Result tabs) */}
                        <div className="h-72 bg-white border-t border-gray-200 shadow-inner overflow-hidden">
                            {/* Console Tabs */}
                            <div className="flex border-b border-gray-200">
                                <button
                                    onClick={() => setConsoleTab('testcase')}
                                    className={`px-6 py-3 text-sm font-semibold transition-colors focus:outline-none ${
                                        consoleTab === 'testcase'
                                            ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    aria-controls="testcase-panel"
                                >
                                    Testcase
                                </button>
                                <button
                                    onClick={() => setConsoleTab('result')}
                                    className={`px-6 py-3 text-sm font-semibold transition-colors focus:outline-none ${
                                        consoleTab === 'result'
                                            ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    aria-controls="result-panel"
                                >
                                    Result
                                </button>
                            </div>

                            {/* Console Content based on active console tab */}
                            <div className="p-6 h-full overflow-y-auto pb-12 custom-scrollbar" role="tabpanel" id={`${consoleTab}-panel`}>
                                {/* Testcase Tab Content */}
                                {consoleTab === 'testcase' && (
                                    <div>
                                        <div className="mb-6">
                                            <label htmlFor="custom-input" className="block text-sm font-semibold text-gray-700 mb-3">Custom Input:</label>
                                            <textarea
                                                id="custom-input"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                className="w-full h-24 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-y custom-scrollbar"
                                                placeholder="Enter custom test input here (e.g., [1,2,3]\n5 for Two Sum)..."
                                                spellCheck={false}
                                                aria-label="Custom test input area"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">Default Test Cases:</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Display non-hidden example test cases */}
                                                {selectedProblem?.testCases.filter(tc => !tc.isHidden).map((testCase, idx) => (
                                                    <div key={testCase.id} className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-sm font-mono shadow-sm">
                                                        <h4 className="font-semibold text-gray-800 mb-2">Test Case {idx + 1} (Example)</h4>
                                                        <div className="space-y-1">
                                                            <div><span className="text-gray-600">Input:</span> <code className="text-purple-700 whitespace-pre-wrap break-words">{testCase.input}</code></div>
                                                            <div><span className="text-gray-600">Expected:</span> <code className="text-green-700 whitespace-pre-wrap break-words">{testCase.expected}</code></div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {/* Indication for hidden test cases */}
                                                {selectedProblem?.testCases.filter(tc => tc.isHidden).length > 0 && (
                                                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-sm font-mono col-span-full shadow-sm">
                                                        <h4 className="font-semibold text-gray-800 mb-2">Hidden Test Cases (More)</h4>
                                                        <p className="text-gray-500">Additional, more rigorous test cases will be run upon submission.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Result Tab Content */}
                                {consoleTab === 'result' && (
                                    <div className="h-full">
                                        {isRunning ? (
                                            // Loading spinner while running/submitting
                                            <div className="text-center py-12 text-blue-600 text-lg flex flex-col items-center justify-center">
                                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                                                <pre className="whitespace-pre-wrap font-mono">{output}</pre>
                                            </div>
                                        ) : testResults.length > 0 ? (
                                            // Display detailed test results for submissions
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold text-gray-800 mb-3">Test Execution Results:</h3>
                                                {testResults.map((result, idx) => (
                                                    <div key={result.id || idx} className={`p-4 rounded-lg border shadow-sm ${
                                                        result.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                                                        }`}>
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="text-sm font-semibold text-gray-800">Test Case {idx + 1} ({result.isHidden ? 'Hidden' : 'Example'})</span>
                                                            <span className={`text-sm font-semibold ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                                                                {result.passed ? '✅ Passed' : '❌ Failed'}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-gray-600 space-y-1 font-mono break-all whitespace-pre-wrap">
                                                            <div><strong>Input:</strong> {result.input}</div>
                                                            <div><strong>Expected:</strong> {result.expected}</div>
                                                            <div><strong>Actual:</strong> {result.actual}</div>
                                                            {result.message && <div><strong>Message:</strong> {result.message}</div>}
                                                        </div>
                                                    </div>
                                                ))}
                                                {/* Final output message for submission */}
                                                <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm font-mono text-gray-700 border border-blue-200 whitespace-pre-wrap shadow-inner">
                                                    {output}
                                                </div>
                                            </div>
                                        ) : (
                                            // Default message when no results are available (for 'Run Code' or initial state)
                                            <div className="text-center py-8">
                                                <div className="text-4xl mb-4">✨</div>
                                                <pre className="text-sm font-mono text-gray-600 whitespace-pre-wrap">
                                                    {output || 'Click "Run" to test your code with custom input or against the first example. Click "Submit" to run against all test cases.'}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // --- Main App Render Logic ---
    // This is the core routing logic for the entire single-page application.
    if (!isLoggedIn) {
        // If user is not logged in, show the LoginPage
        return <LoginPage />;
    }

    // If logged in, render components based on currentView state
    if (currentView === 'problems') {
        return <ProblemsPage />;
    }

    if (currentView === 'editor') {
        return <CodeEditor />;
    }

    if (currentView === 'profile') {
        return <ProfilePage />;
    }

    // Fallback: if currentView is unknown or initial login is complete, redirect to problems page
    return <ProblemsPage />;
}

export default App;
