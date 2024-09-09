"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Appbar() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Check if the token exists in local storage
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        } else {
            // Redirect to the sign-in page if not authenticated
            router.push("/signin");
        }
    }, [router]);

    const handleLogout = () => {
        // Remove the token and redirect to sign-in page
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        router.push("/signin");
    };

    const handleSignIn = () => {
        router.push("/signin");
    };

    return (
        <nav className="bg-black border-b border-gray-800">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                {/* Logo and Branding */}
                <div className="flex items-center space-x-3 rtl:space-x-reverse" onClick={() => router.push("/")}>
                    <img 
                        src="https://flowbite.com/docs/images/logo.svg" 
                        className="h-8" 
                        alt="Course Copilot Pro Logo" 
                    />
                    <span className="text-xl font-medium text-gray-100 tracking-wide">
                        Course Copilot Pro
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-6">
                    {isAuthenticated ? (
                        <>
                            <span 
                                onClick={() => router.push("/project")} 
                                className="text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-100 transition-colors duration-200"
                            >
                                Create A/B Test Script
                            </span>
                            <span 
                                onClick={() => router.push("/myprojects")} 
                                className="text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-100 transition-colors duration-200"
                            >
                                My Projects
                            </span>
                            <span 
                                className="text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-100 transition-colors duration-200"
                            >
                                Generate Images
                            </span>
                            <button 
                                onClick={handleLogout}
                                className="text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-100 transition-colors duration-200 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={handleSignIn}
                            className="text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-100 transition-colors duration-200 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
