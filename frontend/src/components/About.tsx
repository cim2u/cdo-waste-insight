import { Target, Code, Users, Database } from "lucide-react";

export function About() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h1>About This System</h1>
      </div>

      {/* Main Description */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <p className="text-gray-700 leading-relaxed">
          The Waste Collection Prediction System is a data-driven platform designed to help local government units in Cagayan de Oro City efficiently manage waste collection operations. Using machine learning algorithms, the system analyzes historical waste generation patterns to estimate daily waste levels across various barangays. This enables city officials to optimize collection schedules, allocate resources more effectively, and ensure timely waste management services for all communities.
        </p>
      </div>

      {/* Project Goals */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <h2>Project Goals</h2>
        </div>
        <ul className="space-y-2 text-gray-700 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Predict daily waste generation levels for each barangay with high accuracy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Optimize truck deployment and collection routes to reduce operational costs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Improve waste management efficiency and environmental sustainability</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Provide real-time analytics and insights to city administrators</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Support data-driven decision making for urban waste management</span>
          </li>
        </ul>
      </div>

      {/* Technologies Used */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <Code className="w-5 h-5 text-green-600" />
          </div>
          <h2>Technologies Used</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>Machine Learning:</strong> Predictive algorithms for waste forecasting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>React:</strong> Modern frontend framework for user interface</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>Laravel:</strong> Backend API and data management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>Chart.js:</strong> Interactive data visualization</span>
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
            <h3>Development Team</h3>
          </div>
          <p className="text-gray-700">
            This system was developed by a dedicated team of developers, data scientists, and environmental specialists working in collaboration with the Cagayan de Oro City Local Government Unit.
          </p>
        </div>

        {/* Data Sources */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Database className="w-5 h-5 text-orange-600" />
            </div>
            <h3>Data Sources</h3>
          </div>
          <p className="text-gray-700">
            The system utilizes historical waste collection data from city records, population statistics, and seasonal patterns to generate accurate predictions for waste management planning.
          </p>
        </div>
      </div>

      {/* Importance Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
        <h3 className="text-blue-900 mb-2">Why Waste Management Matters</h3>
        <p className="text-blue-800">
          Effective waste management is crucial for maintaining public health, protecting the environment, and ensuring sustainable urban development. By leveraging technology and data analytics, cities can transform waste management from a reactive service to a proactive, efficient system that benefits all residents.
        </p>
      </div>
    </div>
  );
}
