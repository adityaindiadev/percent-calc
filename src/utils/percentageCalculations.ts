export interface PercentageResult {
  result: number;
  formula: string;
  explanation: string;
}

export interface PercentageChangeResult {
  originalValue: number;
  newValue: number;
  percentageChange: number;
  isIncrease: boolean;
  formula: string;
  explanation: string;
}

export interface DiscountResult {
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  savings: number;
  formula: string;
  explanation: string;
}

export interface TipResult {
  billAmount: number;
  tipPercentage: number;
  tipAmount: number;
  totalAmount: number;
  formula: string;
  explanation: string;
}

export interface MarkupResult {
  costPrice: number;
  markupPercentage: number;
  markupAmount: number;
  sellingPrice: number;
  profit: number;
  formula: string;
  explanation: string;
}

// Basic percentage calculation
export const calculatePercentage = (value: number, percentage: number): PercentageResult => {
  const result = (value * percentage) / 100;
  return {
    result,
    formula: `${value} × ${percentage}% = ${value} × ${percentage/100} = ${result}`,
    explanation: `${percentage}% of ${value} is ${result}`
  };
};

// Calculate what percentage one number is of another
export const calculatePercentageOf = (part: number, whole: number): PercentageResult => {
  const result = (part / whole) * 100;
  return {
    result,
    formula: `(${part} ÷ ${whole}) × 100 = ${(part/whole).toFixed(4)} × 100 = ${result.toFixed(2)}%`,
    explanation: `${part} is ${result.toFixed(2)}% of ${whole}`
  };
};

// Percentage change calculation
export const calculatePercentageChange = (originalValue: number, newValue: number): PercentageChangeResult => {
  const change = newValue - originalValue;
  const percentageChange = (change / originalValue) * 100;
  const isIncrease = change > 0;
  
  return {
    originalValue,
    newValue,
    percentageChange: Math.abs(percentageChange),
    isIncrease,
    formula: `((${newValue} - ${originalValue}) ÷ ${originalValue}) × 100 = ${(change/originalValue).toFixed(4)} × 100 = ${Math.abs(percentageChange).toFixed(2)}%`,
    explanation: `The value ${isIncrease ? 'increased' : 'decreased'} by ${Math.abs(percentageChange).toFixed(2)}% from ${originalValue} to ${newValue}`
  };
};

// Discount calculation
export const calculateDiscount = (originalPrice: number, discountPercentage: number): DiscountResult => {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;
  const savings = discountAmount;
  
  return {
    originalPrice,
    discountPercentage,
    discountAmount,
    finalPrice,
    savings,
    formula: `Discount = ${originalPrice} × ${discountPercentage}% = ${discountAmount}\nFinal Price = ${originalPrice} - ${discountAmount} = ${finalPrice}`,
    explanation: `A ${discountPercentage}% discount on ${originalPrice} saves you ${discountAmount.toFixed(2)}. Final price: ${finalPrice.toFixed(2)}`
  };
};

// Tip calculation
export const calculateTip = (billAmount: number, tipPercentage: number): TipResult => {
  const tipAmount = (billAmount * tipPercentage) / 100;
  const totalAmount = billAmount + tipAmount;
  
  return {
    billAmount,
    tipPercentage,
    tipAmount,
    totalAmount,
    formula: `Tip = ${billAmount} × ${tipPercentage}% = ${tipAmount}\nTotal = ${billAmount} + ${tipAmount} = ${totalAmount}`,
    explanation: `A ${tipPercentage}% tip on ${billAmount} is ${tipAmount.toFixed(2)}. Total bill: ${totalAmount.toFixed(2)}`
  };
};

// Markup calculation
export const calculateMarkup = (costPrice: number, markupPercentage: number): MarkupResult => {
  const markupAmount = (costPrice * markupPercentage) / 100;
  const sellingPrice = costPrice + markupAmount;
  const profit = markupAmount;
  
  return {
    costPrice,
    markupPercentage,
    markupAmount,
    sellingPrice,
    profit,
    formula: `Markup = ${costPrice} × ${markupPercentage}% = ${markupAmount}\nSelling Price = ${costPrice} + ${markupAmount} = ${sellingPrice}`,
    explanation: `A ${markupPercentage}% markup on cost price ${costPrice} adds ${markupAmount.toFixed(2)}. Selling price: ${sellingPrice.toFixed(2)}`
  };
};

// Compound interest calculation
export const calculateCompoundInterest = (
  principal: number, 
  rate: number, 
  time: number, 
  compoundFrequency: number = 1
): { 
  principal: number;
  rate: number;
  time: number;
  compoundFrequency: number;
  amount: number;
  interest: number;
  formula: string;
  explanation: string;
} => {
  const rateDecimal = rate / 100;
  const amount = principal * Math.pow(1 + rateDecimal / compoundFrequency, compoundFrequency * time);
  const interest = amount - principal;
  
  return {
    principal,
    rate,
    time,
    compoundFrequency,
    amount,
    interest,
    formula: `A = P(1 + r/n)^(nt)\nA = ${principal}(1 + ${rateDecimal}/${compoundFrequency})^(${compoundFrequency} × ${time})\nA = ${amount.toFixed(2)}`,
    explanation: `${principal} invested at ${rate}% for ${time} years with ${compoundFrequency === 1 ? 'annual' : compoundFrequency === 12 ? 'monthly' : compoundFrequency === 365 ? 'daily' : `${compoundFrequency} times per year`} compounding grows to ${amount.toFixed(2)}`
  };
};

// Simple interest calculation
export const calculateSimpleInterest = (
  principal: number, 
  rate: number, 
  time: number
): {
  principal: number;
  rate: number;
  time: number;
  interest: number;
  amount: number;
  formula: string;
  explanation: string;
} => {
  const interest = (principal * rate * time) / 100;
  const amount = principal + interest;
  
  return {
    principal,
    rate,
    time,
    interest,
    amount,
    formula: `I = P × r × t\nI = ${principal} × ${rate}% × ${time}\nI = ${interest.toFixed(2)}`,
    explanation: `${principal} invested at ${rate}% simple interest for ${time} years earns ${interest.toFixed(2)} in interest`
  };
};

// Format number with commas and decimals
export const formatNumber = (num: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

// Format currency (without dollar sign)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}; 