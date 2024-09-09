"use client"
import React from "react";
import { Cover } from "@/components/ui/cover";
import { Typewriter } from "react-simple-typewriter";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-white text-black">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10">
          <Cover className="block w-full text-center">
            Simple A/B Testing Management
          </Cover>
        </h1>

        <p className="text-lg text-center text-black mb-12">
          Easily create and track A/B testing for your web applications. Our platform provides a straightforward way to set up tests, analyze results, and optimize your website's performance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Create A/B Tests</h2>
            <p>
              Set up A/B tests quickly and efficiently to evaluate different versions of your web pages or features.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Track Results</h2>
            <p>
              Monitor the performance of your tests with clear, detailed reports to make data-driven decisions.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Optimize Performance</h2>
            <p>
              Use insights from your A/B tests to refine your web applications and improve user experience.
            </p>
          </div>
        </div>
      </div>

      {/* Typewriter Effect */}
      <h2 className="text-4xl md:text-3xl lg:text-4xl text-center font-semibold text-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 underline">
        <Typewriter
          words={[
            "Create A/B tests effortlessly.",
            "Track and analyze test results.",
            "Optimize your web application's performance.",
            "Simple setup for complex testing.",
            "Make informed decisions with A/B testing.",
            "Enhance user experience with data-driven insights."
          ]}
          loop={false}
          cursor
          cursorStyle="_"
          typeSpeed={40}      // Adjust typing speed for smoother animation
          deleteSpeed={30}    // Adjust deleting speed for smoother backspace effect
          delaySpeed={2000}   // Adjust delay before moving to the next word
        />
      </h2>
    </div>
  );
}
