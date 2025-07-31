import React, { useState } from 'react';
import { calculateMarkup, formatCurrency } from '../../utils/percentageCalculations';

const MarkupCalculator: React.FC = () => {
  const [costPrice, setCostPrice] = useState<string>('');
  const [markupPercentage, setMarkupPercentage] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const cost = parseFloat(costPrice);
    const markup = parseFloat(markupPercentage);

    if (isNaN(cost) || isNaN(markup) || markup < 0) return;

    const calculationResult = calculateMarkup(cost, markup);
    setResult(calculationResult);
  };

  const handleClear = () => {
    setCostPrice('');
    setMarkupPercentage('');
    setResult(null);
  };

  return (
    <div className="calculator-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Markup Calculator</h2>
        <p className="text-gray-600">Calculate selling price and profit margins</p>
      </div>

      {/* Input Fields */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cost Price ($)
          </label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            placeholder="Enter the cost price"
            className="input-field"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Markup Percentage (%)
          </label>
          <input
            type="number"
            value={markupPercentage}
            onChange={(e) => setMarkupPercentage(e.target.value)}
            placeholder="Enter markup percentage"
            className="input-field"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button
          onClick={handleCalculate}
          disabled={!costPrice || !markupPercentage}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Markup
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Markup Summary</h3>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(result.sellingPrice)}
            </div>
            <p className="text-sm text-gray-600">Selling Price</p>
          </div>
          
          {/* Breakdown */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">
                {formatCurrency(result.markupAmount)}
              </div>
              <p className="text-sm text-gray-600">Markup Amount</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {result.markupPercentage}%
              </div>
              <p className="text-sm text-gray-600">Markup Percentage</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatCurrency(result.costPrice)}
              </div>
              <p className="text-sm text-gray-600">Cost Price</p>
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
        <h4 className="font-medium text-gray-800 mb-3">💡 Business Tips</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="bg-white/40 rounded-lg p-3">
            <strong>Common Markups:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Retail: 50-100% markup</li>
              <li>• Restaurants: 300-400% markup</li>
              <li>• Electronics: 20-40% markup</li>
              <li>• Services: 100-200% markup</li>
            </ul>
          </div>
          <div className="bg-white/40 rounded-lg p-3">
            <strong>Pricing Strategy:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Consider competition</li>
              <li>• Factor in overhead costs</li>
              <li>• Account for market demand</li>
              <li>• Plan for profit margins</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkupCalculator; 