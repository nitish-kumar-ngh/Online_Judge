// src/pages/Editor.jsx
import React, { useState } from 'react';
import { Play, Code, Star, Clock, CheckCircle, Copy, Settings } from 'lucide-react';

const Editor = () => {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`);
  const [input, setInput] = useState('5 10');
  const [output, setOutput] = useState('');
  const [aiReview, setAiReview] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [theme, setTheme] = useState('light');

  const supportedLanguages = [
    { id: 'cpp', name: 'C++', extension: '.cpp', icon: '⚡' },
    { id: 'python', name: 'Python', extension: '.py', icon: '🐍' },
    { id: 'java', name: 'Java', extension: '.java', icon: '☕' },
    { id: 'javascript', name: 'JavaScript', extension: '.js', icon: '🟨' }
  ];

  const codeTemplates = {
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}`,
    python: `def main():\n    print(\"Hello, World!\")\n\nif __name__ == \"__main__\":\n    main()`,
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}`,
    javascript: `function main() {\n    console.log(\"Hello, World!\");\n}\n\nmain();`
  };

  const executeCode = async () => {
    setIsExecuting(true);
    setOutput('');
    await new Promise(res => setTimeout(res, 1000));
    if (selectedLanguage === 'cpp') {
      setOutput('15\nExecution time: 0.123s');
    } else {
      setOutput('Mock output based on selected language.');
    }
    setIsExecuting(false);
  };

  const generateAiReview = async () => {
    setIsReviewing(true);
    await new Promise(res => setTimeout(res, 1000));
    setAiReview(`✅ Code is well structured\n💡 Use more comments\n🎯 Score: 8.5/10`);
    setIsReviewing(false);
  };

  const handleLanguageChange = (langId) => {
    setSelectedLanguage(langId);
    setCode(codeTemplates[langId]);
    setOutput('');
    setAiReview('');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Code Editor</h1>
            <div className="flex items-center gap-2">
              <button onClick={copyToClipboard} className="px-3 py-2 bg-gray-200 rounded flex items-center gap-1 text-sm"><Copy className="h-4 w-4" />Copy</button>
              <select value={theme} onChange={(e) => setTheme(e.target.value)} className="border p-2 rounded">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {supportedLanguages.map(lang => (
              <button key={lang.id} onClick={() => handleLanguageChange(lang.id)}
                className={`border px-4 py-2 rounded ${selectedLanguage === lang.id ? 'bg-blue-200' : 'bg-white'}`}>{lang.icon} {lang.name}</button>
            ))}
          </div>

          <textarea value={code} onChange={(e) => setCode(e.target.value)}
            className={`w-full h-80 p-4 font-mono text-sm border rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-black'}`} spellCheck="false" />

          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            className="w-full h-20 p-3 border rounded text-sm" placeholder="Input..." />

          <div className="flex gap-4">
            <button onClick={executeCode} disabled={isExecuting} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1">
              {isExecuting ? <Clock className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}Run</button>
            <button onClick={generateAiReview} disabled={isReviewing} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-1">
              {isReviewing ? <Clock className="h-4 w-4 animate-spin" /> : <Star className="h-4 w-4" />}Review</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-blue-500" />Output</h2>
            <pre className="bg-black text-green-400 p-3 rounded text-sm min-h-[100px] whitespace-pre-wrap">{output || 'Run code to see output.'}</pre>
          </div>

          {aiReview && (
            <div className="bg-yellow-50 p-4 border-l-4 border-yellow-400 rounded">
              <h3 className="font-semibold text-yellow-700 mb-2">AI Review</h3>
              <pre className="text-sm whitespace-pre-wrap text-yellow-900">{aiReview}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
