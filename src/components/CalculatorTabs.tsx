import React, { useState } from 'react';
import BasicPercentage from './calculators/BasicPercentage';
import DiscountCalculator from './calculators/DiscountCalculator';
import TipCalculator from './calculators/TipCalculator';
import InterestCalculator from './calculators/InterestCalculator';
import PercentageChange from './calculators/PercentageChange';
import MarkupCalculator from './calculators/MarkupCalculator';

type TabType = 'basic' | 'discount' | 'tip' | 'interest' | 'change' | 'markup';

const CalculatorTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  const tabs = [
    { id: 'basic', label: 'Basic Percentage', icon: '🔢' },
    { id: 'discount', label: 'Discount', icon: '💰' },
    { id: 'tip', label: 'Tip Calculator', icon: '🍽️' },
    { id: 'interest', label: 'Interest', icon: '📈' },
    { id: 'change', label: 'Percentage Change', icon: '📊' },
    { id: 'markup', label: 'Markup', icon: '🏪' },
  ];

  const renderCalculator = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicPercentage />;
      case 'discount':
        return <DiscountCalculator />;
      case 'tip':
        return <TipCalculator />;
      case 'interest':
        return <InterestCalculator />;
      case 'change':
        return <PercentageChange />;
      case 'markup':
        return <MarkupCalculator />;
      default:
        return <BasicPercentage />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="calculator-card mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white/60 text-gray-700 hover:bg-white hover:shadow-sm'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Content */}
      <div className="animate-slide-up">
        {renderCalculator()}
      </div>
    </div>
  );
};

export default CalculatorTabs; 