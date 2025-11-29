import { Target, Code, Users, Database } from "lucide-react";

export function About() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">About This System</h1>
      </div>

      {/* Main Description */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <p className="text-gray-700 leading-relaxed">
          The Waste Collection Prediction System is a data-driven platform designed to help manage waste collection operations in Cagayan de Oro City more efficiently. Using a <strong>Decision Tree Classifier</strong>, the system analyzes historical waste generation patterns to estimate daily waste levels across barangays. This allows city planners, students, or interested stakeholders to visualize waste trends, optimize collection schedules, and better allocate resources.
        </p>
      </div>

      {/* Project Goals */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Project Goals</h2>
        </div>
        <ul className="space-y-2 text-gray-700 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Predict daily waste generation levels for each barangay with high accuracy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Optimize hypothetical truck deployment and collection routes to minimize operational inefficiencies</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Demonstrate the use of machine learning for smart urban waste management</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Provide data visualization and insights for understanding waste patterns</span>
          </li>
        </ul>
      </div>

      {/* Technologies Used */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <Code className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold">Technologies Used</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>Machine Learning:</strong> Decision Tree Classifier for waste forecasting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>React:</strong> Frontend framework for the user interface</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>Flask:</strong> Backend API and data handling</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>Chart.js:</strong> Interactive charts for data visualization</span>
          </div>
        </div>
      </div>

      {/* Team & Data Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">Development Team</h3>
          </div>
          <p className="text-gray-700">
            This system was developed by:
            <ul className="list-disc ml-6 mt-2">
              <li>Francim B. Elorde</li>
              <li>Yuan Ashlley A. Ladra</li>
              <li>Lerra Mae L. Jayme</li>
            </ul>
            using publicly available data sources.
          </p>
        </div>

        {/* Data Sources */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Database className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold">Data Sources</h3>
          </div>
          <p className="text-gray-700">
            The system uses publicly available datasets from online sources, including historical waste collection data, population statistics, and other verified information, to generate predictions for waste management analysis.
          </p>
        </div>
      </div>

      {/* Importance Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
        <h3 className="text-blue-900 mb-2 text-lg font-semibold">Why Waste Management Matters</h3>
        <p className="text-blue-800">
          Effective waste management is essential for public health, environmental protection, and sustainable urban development. By applying machine learning and data analytics, this project demonstrates how cities like Cagayan de Oro can better understand and plan for waste collection needs, even with publicly sourced data.
        </p>
      </div>
    </div>
  );
}
