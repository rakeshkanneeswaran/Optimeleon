"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3001/api/project/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setProject(response.data.project);
      } catch (error) {
        setError("Failed to fetch project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin border-t-4 border-blue-600 border-solid w-12 h-12 rounded-full"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : project ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Project Details</h1>
            <p className="mb-2"><strong>ID:</strong> {project.id}</p>
            <p className="mb-2"><strong>Name:</strong> {project.name}</p>
            <p className="mb-2"><strong>Script:</strong> {project.script}</p>
            <p className="mb-2"><strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
          </div>
        ) : (
          <p className="text-center text-gray-600">No project details found</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
