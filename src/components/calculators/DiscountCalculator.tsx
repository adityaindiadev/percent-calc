import React, { useState } from 'react';
import { calculateDiscount, formatCurrency } from '../../utils/percentageCalculations';

const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [discountPercentage, setDiscountPercentage] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);

    if (isNaN(price) || isNaN(discount) || discount < 0 || discount > 100) return;

    const calculationResult = calculateDiscount(price, discount);
    setResult(calculationResult);
  };

  const handleClear = () => {
    setOriginalPrice('');
    setDiscountPercentage('');
    setResult(null);
  };

  return (
    <div className="calculator-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Discount Calculator</h2>
        <p className="text-gray-600">Calculate discounts, savings, and final prices</p>
      </div>

      {/* Input Fields */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Price ($)
          </label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter the original price"
            className="input-field"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Discount Percentage (%)
          </label>
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            placeholder="Enter discount percentage"
            className="input-field"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button
          onClick={handleCalculate}
          disabled={!originalPrice || !discountPercentage}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Discount
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Discount Summary</h3>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(result.finalPrice)}
            </div>
            <p className="text-sm text-gray-600">Final Price</p>
          </div>
          
          {/* Breakdown */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(result.discountAmount)}
              </div>
              <p className="text-sm text-gray-600">You Save</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">
                {result.discountPercentage}%
              </div>
              <p className="text-sm text-gray-600">Discount</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatCurrency(result.originalPrice)}
              </div>
              <p className="text-sm text-gray-600">Original Price</p>
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
        <h4 className="font-medium text-gray-800 mb-3">💡 Quick Tips</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="bg-white/40 rounded-lg p-3">
            <strong>Common Discounts:</strong>
            <ul className="mt-1 space-y-1">
              <li>• 10% off = 0.9 × original price</li>
              <li>• 20% off = 0.8 × original price</li>
              <li>• 25% off = 0.75 × original price</li>
            </ul>
          </div>
          <div className="bg-white/40 rounded-lg p-3">
            <strong>Savings Tips:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Compare final prices, not just percentages</li>
              <li>• Stack discounts carefully</li>
              <li>• Check for additional fees</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCalculator; 