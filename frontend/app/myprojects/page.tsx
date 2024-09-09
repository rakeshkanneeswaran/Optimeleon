"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  id: string;
  name: string;
  script: string;
  createdAt: Date;
  userId: string;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/api/project', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setProjects(response.data.project);
      } catch (error) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
          Your Projects
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin border-t-4 border-indigo-600 border-solid w-16 h-16 rounded-full"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-lg font-medium">No projects found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-300"
              >
                <h2 className="text-3xl font-bold mb-4 text-indigo-700">{project.name}</h2>
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-indigo-600">Script:</p>
                  <div className="overflow-auto max-h-60 border border-gray-300 rounded-lg p-3 bg-gray-50">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800">{project.script}</pre>
                  </div>
                </div>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Created At:</span> {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
