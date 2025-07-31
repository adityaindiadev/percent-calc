import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="hidden md:block mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200">
      <div className="text-center">
        <div className="mb-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
            Simple Percentage Calculator
          </h3>
          <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto px-4">
            Four essential calculations for all your percentage needs. 
            Clean, fast, and accurate.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6 text-xs md:text-sm text-gray-600 px-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Calculate Percentages</h4>
            <ul className="space-y-1">
              <li>• What is X% of Y?</li>
              <li>• Find percentage of numbers</li>
              <li>• Simple multiplication</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Find Percentages</h4>
            <ul className="space-y-1">
              <li>• X is what % of Y?</li>
              <li>• Part to whole ratios</li>
              <li>• Division calculations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Percentage Changes</h4>
            <ul className="space-y-1">
              <li>• Increase/decrease calculations</li>
              <li>• Visual representations</li>
              <li>• Growth analysis</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Increase/Decrease</h4>
            <ul className="space-y-1">
              <li>• Calculate new values</li>
              <li>• Percentage adjustments</li>
              <li>• Dropdown selection</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 px-4">
            Built with React, TypeScript, and Tailwind CSS • 
            Designed for simplicity and accuracy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 