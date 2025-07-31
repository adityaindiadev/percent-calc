import React, { useState, useRef } from 'react';
import { calculatePercentage, calculatePercentageOf, calculatePercentageChange, formatNumber } from '../utils/percentageCalculations';

type CalculationType = 'percentage' | 'percentageOf' | 'percentageChange' | 'increaseDecrease';

const SimpleCalculator: React.FC = () => {
  const [activeCalculation, setActiveCalculation] = useState<CalculationType>('percentage');
  const [values, setValues] = useState({
    value1: '',
    value2: '',
    value3: '',
    value4: ''
  });
  const [increaseDecreaseType, setIncreaseDecreaseType] = useState<'increase' | 'decrease'>('increase');
  const [result, setResult] = useState<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculations = [
    {
      id: 'percentage' as CalculationType,
      title: 'What is __ % of __ ?',
      shortTitle: 'X% of Y',
      desktopTitle: 'X% of Y?',
      icon: '🔢',
      description: 'Calculate what percentage of a number equals',
      fields: [
        { label: 'Percentage (%)', key: 'value1', placeholder: 'Enter percentage' },
        { label: 'Number', key: 'value2', placeholder: 'Enter the number' }
      ],
      formula: 'Result = Number × (Percentage ÷ 100)',
      example: 'What is 15% of 200? = 200 × (15 ÷ 100) = 30'
    },
    {
      id: 'percentageOf' as CalculationType,
      title: '__ is what % of __ ?',
      shortTitle: 'X% of Y',
      desktopTitle: 'X% of Y?',
      icon: '📊',
      description: 'Find what percentage one number is of another',
      fields: [
        { label: 'First Number', key: 'value1', placeholder: 'Enter first number' },
        { label: 'Second Number', key: 'value2', placeholder: 'Enter second number' }
      ],
      formula: 'Percentage = (First Number ÷ Second Number) × 100',
      example: '25 is what % of 100? = (25 ÷ 100) × 100 = 25%'
    },
    {
      id: 'percentageChange' as CalculationType,
      title: 'What is the percentage increase/decrease from __ to __ ?',
      shortTitle: 'Change',
      desktopTitle: 'Change %?',
      icon: '📈',
      description: 'Calculate percentage change between two values',
      fields: [
        { label: 'Original Value', key: 'value1', placeholder: 'Enter original value' },
        { label: 'New Value', key: 'value2', placeholder: 'Enter new value' }
      ],
      formula: 'Percentage Change = ((New Value - Original Value) ÷ Original Value) × 100',
      example: 'Change from 100 to 120? = ((120 - 100) ÷ 100) × 100 = 20% increase'
    },
    {
      id: 'increaseDecrease' as CalculationType,
      title: '__ Increase/decrease __?',
      shortTitle: '±%',
      desktopTitle: '±%?',
      icon: '➕',
      description: 'Calculate new value after percentage increase or decrease',
      fields: [
        { label: 'Original Value', key: 'value1', placeholder: 'Enter original value' },
        { label: 'Percentage (%)', key: 'value2', placeholder: 'Enter percentage' }
      ],
      formula: 'New Value = Original Value × (1 ± Percentage ÷ 100)',
      example: '100 + 20% = 100 × (1 + 20 ÷ 100) = 120'
    }
  ];

  const handleInputChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const scrollToResult = () => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const handleCalculate = () => {
    const val1 = parseFloat(values.value1);
    const val2 = parseFloat(values.value2);

    if (isNaN(val1) || isNaN(val2)) return;

    let calculationResult;
    switch (activeCalculation) {
      case 'percentage':
        calculationResult = calculatePercentage(val2, val1);
        break;
      case 'percentageOf':
        calculationResult = calculatePercentageOf(val1, val2);
        break;
      case 'percentageChange':
        calculationResult = calculatePercentageChange(val1, val2);
        break;
      case 'increaseDecrease':
        const multiplier = increaseDecreaseType === 'increase' ? 1 + (val2 / 100) : 1 - (val2 / 100);
        const newValue = val1 * multiplier;
        calculationResult = {
          result: newValue,
          originalValue: val1,
          percentage: val2,
          type: increaseDecreaseType,
          formula: `New Value = ${val1} × (1 ${increaseDecreaseType === 'increase' ? '+' : '-'} ${val2} ÷ 100) = ${val1} × ${multiplier.toFixed(4)} = ${newValue.toFixed(2)}`,
          explanation: `${val1} ${increaseDecreaseType === 'increase' ? 'increased' : 'decreased'} by ${val2}% = ${newValue.toFixed(2)}`
        };
        break;
      default:
        return;
    }

    setResult(calculationResult);
    
    // Scroll to result after a short delay to ensure the result is rendered
    setTimeout(() => {
      scrollToResult();
    }, 100);
  };

  const handleClear = () => {
    setValues({ value1: '', value2: '', value3: '', value4: '' });
    setResult(null);
  };

  const currentCalculation = calculations.find(calc => calc.id === activeCalculation);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20 md:pb-0">
      {/* Desktop Calculation Type Selector */}
      <div className="hidden md:block calculator-card mb-6 md:mb-8">
        <div className="text-center mb-4 md:mb-6">
          <p className="text-sm md:text-base text-gray-600">Simple and powerful percentage calculations</p>
        </div>

        <div className="flex justify-center gap-4">
          {calculations.map((calc) => (
            <button
              key={calc.id}
              onClick={() => {
                setActiveCalculation(calc.id);
                setResult(null);
                setValues({ value1: '', value2: '', value3: '', value4: '' });
              }}
              className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 ${
                activeCalculation === calc.id
                  ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                  : 'bg-white/60 text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <div className="text-2xl mb-2">{calc.icon}</div>
              <div className="font-semibold text-sm">{calc.desktopTitle}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          {calculations.map((calc) => (
            <button
              key={calc.id}
              onClick={() => {
                setActiveCalculation(calc.id);
                setResult(null);
                setValues({ value1: '', value2: '', value3: '', value4: '' });
              }}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                activeCalculation === calc.id
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <div className="text-xl mb-1">{calc.icon}</div>
              <div className="text-xs font-medium">{calc.shortTitle}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Interface */}
      <div className="calculator-card">
        <div className="text-center mb-4 md:mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{currentCalculation?.title}</h3>
          <p className="text-sm md:text-base text-gray-600">{currentCalculation?.description}</p>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          {currentCalculation?.fields.map((field, index) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <input
                type="number"
                value={values[field.key as keyof typeof values]}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="input-field"
                step="any"
              />
            </div>
          ))}
          
          {/* Dropdown for Increase/Decrease */}
          {activeCalculation === 'increaseDecrease' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={increaseDecreaseType}
                onChange={(e) => setIncreaseDecreaseType(e.target.value as 'increase' | 'decrease')}
                className="input-field"
              >
                <option value="increase">Increase</option>
                <option value="decrease">Decrease</option>
              </select>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
          <button
            onClick={handleCalculate}
            disabled={!values.value1 || !values.value2}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            Calculate
          </button>
          <button
            onClick={handleClear}
            className="btn-secondary w-full sm:w-auto"
          >
            Clear
          </button>
        </div>

        {/* Formula Display */}
        <div className="bg-blue-50/50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
          <h4 className="font-medium text-gray-800 mb-2">📐 Formula</h4>
          <div className="bg-white/60 rounded-lg p-3">
            <div className="font-mono text-xs md:text-sm text-gray-700">{currentCalculation?.formula}</div>
            <div className="text-xs text-gray-500 mt-2">{currentCalculation?.example}</div>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div ref={resultRef} className="result-card animate-fade-in">
            <div className="text-center mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Result</h3>
              <div className="text-3xl md:text-4xl font-bold text-primary-600">
                {activeCalculation === 'percentage' 
                  ? formatNumber(result.result)
                  : activeCalculation === 'percentageOf'
                  ? `${formatNumber(result.result)}%`
                  : activeCalculation === 'percentageChange'
                  ? `${result.isIncrease ? '+' : '-'}${formatNumber(result.percentageChange)}%`
                  : formatNumber(result.result)
                }
              </div>
              <p className="text-xs md:text-sm text-gray-600 mt-2">
                {activeCalculation === 'percentage' && `${values.value1}% of ${values.value2}`}
                {activeCalculation === 'percentageOf' && `${values.value1} is ${formatNumber(result.result)}% of ${values.value2}`}
                {activeCalculation === 'percentageChange' && `${result.isIncrease ? 'Increase' : 'Decrease'} from ${values.value1} to ${values.value2}`}
                {activeCalculation === 'increaseDecrease' && `${values.value1} ${result.type === 'increase' ? 'increased' : 'decreased'} by ${values.value2}%`}
              </p>
            </div>
            
            {/* Detailed Breakdown */}
            <div className="bg-white/60 rounded-lg p-3 md:p-4 mb-4">
              <h4 className="font-medium text-gray-800 mb-2">📊 Calculation Details</h4>
              <div className="space-y-2 text-xs md:text-sm text-gray-700">
                {activeCalculation === 'percentage' && (
                  <>
                    <div>• Percentage: {values.value1}%</div>
                    <div>• Number: {values.value2}</div>
                    <div>• Calculation: {values.value2} × ({values.value1} ÷ 100) = {formatNumber(result.result)}</div>
                  </>
                )}
                {activeCalculation === 'percentageOf' && (
                  <>
                    <div>• First Number: {values.value1}</div>
                    <div>• Second Number: {values.value2}</div>
                    <div>• Calculation: ({values.value1} ÷ {values.value2}) × 100 = {formatNumber(result.result)}%</div>
                  </>
                )}
                {activeCalculation === 'percentageChange' && (
                  <>
                    <div>• Original Value: {values.value1}</div>
                    <div>• New Value: {values.value2}</div>
                    <div>• Change: {values.value2} - {values.value1} = {formatNumber(parseFloat(values.value2) - parseFloat(values.value1))}</div>
                    <div>• Percentage: ({formatNumber(parseFloat(values.value2) - parseFloat(values.value1))} ÷ {values.value1}) × 100 = {formatNumber(result.percentageChange)}%</div>
                  </>
                )}
                {activeCalculation === 'increaseDecrease' && (
                  <>
                    <div>• Original Value: {values.value1}</div>
                    <div>• {result.type === 'increase' ? 'Increase' : 'Decrease'}: {values.value2}%</div>
                    <div>• Multiplier: 1 {result.type === 'increase' ? '+' : '-'} ({values.value2} ÷ 100) = {result.type === 'increase' ? (1 + parseFloat(values.value2) / 100).toFixed(4) : (1 - parseFloat(values.value2) / 100).toFixed(4)}</div>
                    <div>• New Value: {values.value1} × {result.type === 'increase' ? (1 + parseFloat(values.value2) / 100).toFixed(4) : (1 - parseFloat(values.value2) / 100).toFixed(4)} = {formatNumber(result.result)}</div>
                  </>
                )}
              </div>
            </div>

            {/* Visual Chart for Percentage Change */}
            {activeCalculation === 'percentageChange' && (
              <div className="bg-white/60 rounded-lg p-3 md:p-4 mb-4">
                <h4 className="font-medium text-gray-800 mb-3">📈 Visual Representation</h4>
                <div className="flex items-center justify-center space-x-2 md:space-x-4">
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                      {values.value1}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Original</div>
                  </div>
                  <div className="flex-1 h-1 bg-gray-300 rounded-full relative">
                    <div 
                      className={`h-1 rounded-full transition-all duration-500 ${
                        result.isIncrease ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ 
                        width: `${Math.min(Math.abs(result.percentageChange), 100)}%`,
                        marginLeft: result.isIncrease ? '0' : 'auto'
                      }}
                    ></div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-200 rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                      {values.value2}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">New</div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className={`text-xs md:text-sm font-medium ${result.isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                    {result.isIncrease ? '↗' : '↘'} {formatNumber(result.percentageChange)}% {result.isIncrease ? 'Increase' : 'Decrease'}
                  </span>
                </div>
              </div>
            )}

            {/* Visual Chart for Increase/Decrease */}
            {activeCalculation === 'increaseDecrease' && (
              <div className="bg-white/60 rounded-lg p-3 md:p-4 mb-4">
                <h4 className="font-medium text-gray-800 mb-3">📈 Visual Representation</h4>
                <div className="flex items-center justify-center space-x-2 md:space-x-4">
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                      {values.value1}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Original</div>
                  </div>
                  <div className="flex-1 h-1 bg-gray-300 rounded-full relative">
                    <div 
                      className={`h-1 rounded-full transition-all duration-500 ${
                        result.type === 'increase' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ 
                        width: `${Math.min(parseFloat(values.value2), 100)}%`,
                        marginLeft: result.type === 'increase' ? '0' : 'auto'
                      }}
                    ></div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-200 rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                      {formatNumber(result.result)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">New</div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className={`text-xs md:text-sm font-medium ${result.type === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {result.type === 'increase' ? '↗' : '↘'} {values.value2}% {result.type === 'increase' ? 'Increase' : 'Decrease'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleCalculator; 