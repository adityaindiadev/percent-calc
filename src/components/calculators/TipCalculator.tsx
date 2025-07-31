import React, { useState } from 'react';
import { calculateTip, formatCurrency } from '../../utils/percentageCalculations';

const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<string>('15');
  const [customTip, setCustomTip] = useState<string>('');
  const [splitCount, setSplitCount] = useState<string>('1');
  const [result, setResult] = useState<any>(null);

  const presetTips = [10, 12, 15, 18, 20, 25];

  const handleCalculate = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(customTip || tipPercentage);
    const split = parseInt(splitCount);

    if (isNaN(bill) || isNaN(tip) || isNaN(split) || split < 1) return;

    const calculationResult = calculateTip(bill, tip);
    setResult({ ...calculationResult, splitCount: split });
  };

  const handleClear = () => {
    setBillAmount('');
    setTipPercentage('15');
    setCustomTip('');
    setSplitCount('1');
    setResult(null);
  };

  const handlePresetTip = (percentage: number) => {
    setTipPercentage(percentage.toString());
    setCustomTip('');
  };

  return (
    <div className="calculator-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tip Calculator</h2>
        <p className="text-gray-600">Calculate tips, totals, and split bills</p>
      </div>

      {/* Bill Amount */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bill Amount ($)
        </label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          placeholder="Enter the bill amount"
          className="input-field"
          min="0"
          step="0.01"
        />
      </div>

      {/* Tip Percentage */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tip Percentage (%)
        </label>
        
        {/* Preset Tips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {presetTips.map((tip) => (
            <button
              key={tip}
              onClick={() => handlePresetTip(tip)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                tipPercentage === tip.toString() && !customTip
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white/60 text-gray-700 hover:bg-white hover:shadow-sm'
              }`}
            >
              {tip}%
            </button>
          ))}
        </div>
        
        {/* Custom Tip */}
        <input
          type="number"
          value={customTip}
          onChange={(e) => setCustomTip(e.target.value)}
          placeholder="Or enter custom percentage"
          className="input-field"
          min="0"
          max="100"
          step="0.01"
        />
      </div>

      {/* Split Bill */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Split Bill (Number of People)
        </label>
        <input
          type="number"
          value={splitCount}
          onChange={(e) => setSplitCount(e.target.value)}
          placeholder="Enter number of people"
          className="input-field"
          min="1"
          step="1"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button
          onClick={handleCalculate}
          disabled={!billAmount}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Tip
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tip Summary</h3>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(result.totalAmount)}
            </div>
            <p className="text-sm text-gray-600">Total Amount</p>
          </div>
          
          {/* Breakdown */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">
                {formatCurrency(result.tipAmount)}
              </div>
              <p className="text-sm text-gray-600">Tip Amount</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {result.tipPercentage}%
              </div>
              <p className="text-sm text-gray-600">Tip Percentage</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatCurrency(result.billAmount)}
              </div>
              <p className="text-sm text-gray-600">Bill Amount</p>
            </div>
          </div>

          {/* Split Information */}
          {result.splitCount > 1 && (
            <div className="bg-white/60 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Split Bill</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-primary-600">
                    {formatCurrency(result.totalAmount / result.splitCount)}
                  </div>
                  <p className="text-sm text-gray-600">Per Person (Total)</p>
                </div>
                <div>
                  <div className="text-lg font-semibold text-primary-600">
                    {formatCurrency(result.tipAmount / result.splitCount)}
                  </div>
                  <p className="text-sm text-gray-600">Per Person (Tip)</p>
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
        <h4 className="font-medium text-gray-800 mb-3">💡 Tip Guidelines</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="bg-white/40 rounded-lg p-3">
            <strong>Standard Tips:</strong>
            <ul className="mt-1 space-y-1">
              <li>• 15% - Standard service</li>
              <li>• 18% - Good service</li>
              <li>• 20% - Excellent service</li>
              <li>• 10% - Below average</li>
            </ul>
          </div>
          <div className="bg-white/40 rounded-lg p-3">
            <strong>When to Tip:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Restaurants & bars</li>
              <li>• Taxi & rideshare</li>
              <li>• Hair salons & spas</li>
              <li>• Food delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator; 