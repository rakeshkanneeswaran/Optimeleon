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
        // const response = await axios.post('http://localhost:3000/projects', { name: projectName });
        // const { id } = response.data;
        const id = 555
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
    <div>
      <h1>Marketing SaaS Application</h1>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Enter project name"
      />
      <button onClick={handleCreateProject} disabled={loading}>
        {loading ? 'Creating...' : 'Create Project'}
      </button>
    </div>
  );
};

export default Home;
