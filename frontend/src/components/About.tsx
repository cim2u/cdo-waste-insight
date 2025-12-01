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
          The Waste Collection Prediction System is a machine-learning–powered
          platform designed to assist in understanding and forecasting waste
          generation levels across barangays in Cagayan de Oro City.
          This system uses an ML model trained on waste generation data to provide
          insights, predicted waste levels, and recommended collection schedules.
          By combining a React-based frontend with a Python Flask backend, the
          system delivers accurate predictions in a user-friendly interface.
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
            <span>Predict daily and weekly waste generation using machine learning</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Provide barangay-level recommendations for waste collection schedules</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Visualize predictions through a clean and user-friendly interface</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Support city waste-management planning through data-driven insights</span>
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
            <span><strong>React:</strong> Core frontend framework for UI</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>Tailwind CSS:</strong> Modern utility-based styling</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>Flask (Python):</strong> Backend API handling ML predictions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>Scikit-Learn:</strong> Machine learning model training</span>
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
            as part of an academic project under the Computer Engineering Department.
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
            The model was trained using sample waste generation datasets and publicly available references.
            These datasets were used solely for academic demonstration and to simulate real-world prediction behavior.
          </p>
        </div>
      </div>

      {/* Importance Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
        <h3 className="text-blue-900 mb-2 text-lg font-semibold">Why Waste Management Matters</h3>
        <p className="text-blue-800">
          Effective waste management is vital for public health, environmental sustainability,
          and responsible urban planning. Through simple prediction methods and data analysis,
          this system highlights how technology can support smarter waste collection strategies
          for growing communities.
        </p>
      </div>
    </div>
  );
}
