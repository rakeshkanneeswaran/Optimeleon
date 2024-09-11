"use client";
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const [editScript, setEditScript] = useState<string>("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/api/project', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setProjects(response.data.projects);
        console.log(response.data.projects);
      } catch (error) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setEditName(project.name);
    setEditScript(project.script);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleSaveChanges = async () => {
    if (!selectedProject) return;

    try {
      const response  = await axios.post(
        `http://127.0.0.1:3001/api/project/update`,
        {
          name: editName,
          script: editScript,
          id: selectedProject.id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status == 202) {
        alert(response.data.message);
      }
      // Update local state to reflect changes
      setProjects(projects.map(project =>
        project.id === selectedProject.id
          ? { ...project, name: editName, script: editScript }
          : project
      ));
      closeModal();
    } catch (error) {
      setError("Failed to update project");
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:3001/api/project/delete/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      // Remove the project from the local state
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      setError("Failed to delete project");
    }
  };

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
        ) : projects.length == 0 ? (
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
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => openModal(project)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1" htmlFor="name">Project Name:</label>
                <input
                  id="name"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1" htmlFor="script">Script:</label>
                <textarea
                  id="script"
                  value={editScript}
                  onChange={(e) => setEditScript(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full h-32 resize-none"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
