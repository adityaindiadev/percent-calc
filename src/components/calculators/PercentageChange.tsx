import React, { useState } from 'react';
import { calculatePercentageChange, formatNumber } from '../../utils/percentageCalculations';

const PercentageChange: React.FC = () => {
  const [originalValue, setOriginalValue] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const original = parseFloat(originalValue);
    const newVal = parseFloat(newValue);

    if (isNaN(original) || isNaN(newVal)) return;

    const calculationResult = calculatePercentageChange(original, newVal);
    setResult(calculationResult);
  };

  const handleClear = () => {
    setOriginalValue('');
    setNewValue('');
    setResult(null);
  };

  return (
    <div className="calculator-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Percentage Change Calculator</h2>
        <p className="text-gray-600">Calculate percentage increases and decreases</p>
      </div>

      {/* Input Fields */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Value
          </label>
          <input
            type="number"
            value={originalValue}
            onChange={(e) => setOriginalValue(e.target.value)}
            placeholder="Enter the original value"
            className="input-field"
            step="any"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Value
          </label>
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter the new value"
            className="input-field"
            step="any"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button
          onClick={handleCalculate}
          disabled={!originalValue || !newValue}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Change
        </button>
        <button
          onClick={handleClear}
          className="btn-secondary"
        >
          Clear
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="result-card animate-fade-in">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Change Summary</h3>
            <div className={`text-3xl font-bold ${result.isIncrease ? 'text-green-600' : 'text-red-600'}`}>
              {result.isIncrease ? '+' : '-'}{formatNumber(result.percentageChange)}%
            </div>
            <p className="text-sm text-gray-600">
              {result.isIncrease ? 'Increase' : 'Decrease'}
            </p>
          </div>
          
          {/* Breakdown */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatNumber(result.originalValue)}
              </div>
              <p className="text-sm text-gray-600">Original Value</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatNumber(result.newValue)}
              </div>
              <p className="text-sm text-gray-600">New Value</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className={`text-2xl font-bold ${result.isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                {formatNumber(Math.abs(result.newValue - result.originalValue))}
              </div>
              <p className="text-sm text-gray-600">Absolute Change</p>
            </div>
          </div>
          
          <div className="bg-white/60 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-800 mb-2">Explanation</h4>
            <p className="text-gray-700">{result.explanation}</p>
          </div>
          
          <div className="bg-white/60 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Formula</h4>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
              {result.formula}
            </pre>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-800 mb-3">💡 Change Examples</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="bg-white/40 rounded-lg p-3">
            <strong>Common Scenarios:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Price changes (inflation/deflation)</li>
              <li>• Population growth/decline</li>
              <li>• Investment returns</li>
              <li>• Performance metrics</li>
            </ul>
          </div>
          <div className="bg-white/40 rounded-lg p-3">
            <strong>Quick Calculations:</strong>
            <ul className="mt-1 space-y-1">
              <li>• 50% increase = 1.5× original</li>
              <li>• 25% decrease = 0.75× original</li>
              <li>• 100% increase = 2× original</li>
              <li>• 50% decrease = 0.5× original</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageChange; 