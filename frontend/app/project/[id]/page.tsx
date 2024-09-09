"use client"

import { useState } from 'react';

const HomePage: React.FC = () => {
  const [projectName, setProjectName] = useState<string>('');
  const [script, setScript] = useState<string>('');

  // Generate a script for the project
  const generateScript = (projectName: string) => {
    return `
      <script>
        (function() {
          const variations = ['a', 'b', 'c', 'd'];
          const now = new Date();
          const variation = variations[Math.floor(now.getHours() / 6) % 4];
          if (window.location.href.includes('?variation=')) return;
          if (!window.location.href.startsWith('https://example.com')) return; // Ensure script only runs on the intended URL
          const scriptElement = document.createElement('script');
          scriptElement.src = 'https://example.com/track?project=${encodeURIComponent(projectName)}&variation=' + variation;
          document.head.appendChild(scriptElement);
        })();
      </script>
    `;
  };

  const handleGenerateScript = () => {
    if (projectName) {
      const newScript = generateScript(projectName);
      setScript(newScript);
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(script)
      .then(() => alert('Script copied to clipboard!'))
      .catch(err => console.error('Failed to copy script: ', err));
  };

  const handleSaveScript = () => {
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}-script.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Generate and Edit Marketing Script</h1>
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleGenerateScript}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mb-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Generate Script
        </button>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">Generated Script</h2>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          rows={10}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
        />

        <div className="flex space-x-4">
          <button
            onClick={handleCopyScript}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Copy Script
          </button>
          <button
            onClick={handleSaveScript}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Save Script
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
