import React, { useState } from 'react';
import { calculateSimpleInterest, calculateCompoundInterest, formatCurrency } from '../../utils/percentageCalculations';

const InterestCalculator: React.FC = () => {
  const [mode, setMode] = useState<'simple' | 'compound'>('simple');
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [compoundFrequency, setCompoundFrequency] = useState<string>('1');
  const [result, setResult] = useState<any>(null);

  const frequencyOptions = [
    { value: '1', label: 'Annually' },
    { value: '2', label: 'Semi-annually' },
    { value: '4', label: 'Quarterly' },
    { value: '12', label: 'Monthly' },
    { value: '365', label: 'Daily' },
  ];

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    const freq = parseInt(compoundFrequency);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(freq)) return;

    let calculationResult;
    if (mode === 'simple') {
      calculationResult = calculateSimpleInterest(p, r, t);
    } else {
      calculationResult = calculateCompoundInterest(p, r, t, freq);
    }

    setResult(calculationResult);
  };

  const handleClear = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setCompoundFrequency('1');
    setResult(null);
  };

  return (
    <div className="calculator-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Interest Calculator</h2>
        <p className="text-gray-600">Calculate simple and compound interest</p>
      </div>

      {/* Mode Selection */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/60 rounded-lg p-1">
          <button
            onClick={() => setMode('simple')}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              mode === 'simple'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-white/80'
            }`}
          >
            Simple Interest
          </button>
          <button
            onClick={() => setMode('compound')}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              mode === 'compound'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-white/80'
            }`}
          >
            Compound Interest
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Principal Amount ($)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter principal amount"
            className="input-field"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter annual interest rate"
            className="input-field"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Period (Years)
          </label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time period"
            className="input-field"
            min="0"
            step="0.01"
          />
        </div>
        {mode === 'compound' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compound Frequency
            </label>
            <select
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value)}
              className="input-field"
            >
              {frequencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button
          onClick={handleCalculate}
          disabled={!principal || !rate || !time}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Interest
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Interest Summary</h3>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(result.amount)}
            </div>
            <p className="text-sm text-gray-600">Final Amount</p>
          </div>
          
          {/* Breakdown */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">
                {formatCurrency(result.interest)}
              </div>
              <p className="text-sm text-gray-600">Interest Earned</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatCurrency(result.principal)}
              </div>
              <p className="text-sm text-gray-600">Principal</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {result.rate}%
              </div>
              <p className="text-sm text-gray-600">Annual Rate</p>
            </div>
          </div>

          {mode === 'compound' && (
            <div className="bg-white/60 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Compound Details</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-primary-600">
                    {result.compoundFrequency === 1 ? 'Annually' : 
                     result.compoundFrequency === 12 ? 'Monthly' :
                     result.compoundFrequency === 365 ? 'Daily' :
                     `${result.compoundFrequency} times/year`}
                  </div>
                  <p className="text-sm text-gray-600">Compounding</p>
                </div>
                <div>
                  <div className="text-lg font-semibold text-primary-600">
                    {result.time} years
                  </div>
                  <p className="text-sm text-gray-600">Time Period</p>
                </div>
              </div>
            </div>
          )}
          
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
        <h4 className="font-medium text-gray-800 mb-3">💡 Interest Tips</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="bg-white/40 rounded-lg p-3">
            <strong>Simple vs Compound:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Simple: Interest on principal only</li>
              <li>• Compound: Interest on principal + interest</li>
              <li>• Compound grows faster over time</li>
              <li>• Higher frequency = more growth</li>
            </ul>
          </div>
          <div className="bg-white/40 rounded-lg p-3">
            <strong>Investment Tips:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Start early for compound growth</li>
              <li>• Higher rates = faster growth</li>
              <li>• Longer time = more interest</li>
              <li>• Regular contributions help</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestCalculator; 