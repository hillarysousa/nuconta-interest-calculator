const tax = [
  {period: 19, rate: 15},
  {period: 13, rate: 17.5},
  {period: 7, rate: 20},
  {period: 0, rate: 22.5},
];

let output = {
  gross: 0,
  tax: 0,
  violations: []
};

function checkForViolations(amount, interest, period) {
  const violations = [];
  if (amount < 0) {
    violations.push('invalid-initial-amount');
  }
  if (interest < 0) {
    violations.push('invalid-interest');
  }
  if (period < 0) {
    violations.push('invalid-period');
  }

  return violations;
};

function calculateReturns(amount, interest, period) {
  const interestRate = interest/100;
  return amount * Math.pow((1 + interestRate), period);
};

export function calculate(data) {
  output.gross = 0;
  output.tax = 0;
  output.violations = [];
  const { interest, period } = data;
  const amount = data['initial-amount'];
  const violations = checkForViolations(amount, interest, period);

  if (violations.length > 0) {
    output.violations = violations;
    return output;
  };

  const returnAmt = calculateReturns(amount, interest, period);
  const taxRate = tax.find(t => period >= t.period);

  output.gross = Number(returnAmt.toFixed(5));
  output.tax = taxRate.rate;
  return output;
};
