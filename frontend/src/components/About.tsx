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
          The Waste Collection Prediction System is a data-driven platform designed to help visualize and understand waste generation patterns across barangays in Cagayan de Oro City.
          This system uses simple frontend-based logic to estimate expected waste levels and display helpful insights, schedules, and predictions without requiring a backend server.
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
            <span>Allow users to estimate waste levels based on basic inputs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Provide recommended collection schedules depending on waste level</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Visualize results easily through a simple and user-friendly interface</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Demonstrate how prediction systems can assist in waste management planning</span>
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
            <span><strong>React:</strong> Main frontend framework for the UI</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>Tailwind CSS:</strong> For fast and modern UI styling</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>Recharts:</strong> Chart visualizations used to display predictions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span><strong>JavaScript Logic:</strong> Used to simulate prediction behavior</span>
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
            as part of an academic project.
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
            The system uses sample and publicly accessible data as references for illustrating waste prediction behavior, serving purely as an educational demonstration.
          </p>
        </div>
      </div>

      {/* Importance Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
        <h3 className="text-blue-900 mb-2 text-lg font-semibold">Why Waste Management Matters</h3>
        <p className="text-blue-800">
          Effective waste management is essential for public health, environmental protection, and sustainable development.
          By using simple prediction approaches, this system demonstrates how data can guide better decision-making in waste collection planning.
        </p>
      </div>
    </div>
  );
}
