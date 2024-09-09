"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';


const Home: React.FC = () => {
  const [projectName, setProjectName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const router = useRouter();

  // Handle project creation
  const handleCreateProject = async () => {
    if (projectName) {
      setLoading(true);
      try {
        const response = await axios.post('http://127.0.0.1:3001/api/project', { name: projectName , script : " "} , {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        } );
          
        const { id } = response.data;
        setProjectName('');
        router.push(`/project/${id}`); // Redirect to the project page
      } catch (error) {
        console.error('Failed to create project:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Marketing SaaS Application</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleCreateProject}
          disabled={loading}
          className={`w-full py-2 text-white font-bold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </div>
    </div>
  );
};

export default Home;
