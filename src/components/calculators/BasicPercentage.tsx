import React, { useState } from 'react';
import { calculatePercentage, calculatePercentageOf, formatNumber } from '../../utils/percentageCalculations';

const BasicPercentage: React.FC = () => {
  const [mode, setMode] = useState<'percentage' | 'percentageOf'>('percentage');
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) return;

    let calculationResult;
    if (mode === 'percentage') {
      calculationResult = calculatePercentage(num1, num2);
    } else {
      calculationResult = calculatePercentageOf(num1, num2);
    }

    setResult(calculationResult);
  };

  const handleClear = () => {
    setValue1('');
    setValue2('');
    setResult(null);
  };

  return (
    <div className="calculator-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Basic Percentage Calculator</h2>
        <p className="text-gray-600">Calculate percentages and find what percentage one number is of another</p>
      </div>

      {/* Mode Selection */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/60 rounded-lg p-1">
          <button
            onClick={() => setMode('percentage')}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              mode === 'percentage'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-white/80'
            }`}
          >
            Calculate X% of Y
          </button>
          <button
            onClick={() => setMode('percentageOf')}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              mode === 'percentageOf'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-white/80'
            }`}
          >
            What % is X of Y
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'percentage' ? 'Value (Y)' : 'Part (X)'}
          </label>
          <input
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder={mode === 'percentage' ? 'Enter the base value' : 'Enter the part'}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'percentage' ? 'Percentage (X%)' : 'Whole (Y)'}
          </label>
          <input
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder={mode === 'percentage' ? 'Enter the percentage' : 'Enter the whole'}
            className="input-field"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button
          onClick={handleCalculate}
          disabled={!value1 || !value2}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate
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
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Result</h3>
            <div className="text-3xl font-bold text-primary-600">
              {mode === 'percentage' 
                ? formatNumber(result.result)
                : `${formatNumber(result.result)}%`
              }
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

      {/* Help Text */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          {mode === 'percentage' 
            ? 'Calculate what X% of a number equals'
            : 'Find what percentage one number is of another'
          }
        </p>
      </div>
    </div>
  );
};

export default BasicPercentage; 