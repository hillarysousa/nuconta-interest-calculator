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


function calculateReturns(amount, interest, period) {
  if (amount < 0) {
    output.violations.push('invalid-initial-amount');
  }
  if (interest < 0) {
    output.violations.push('invalid-interest');
  }
  if (period < 0) {
    output.violations.push('invalid-period');
  }
  return amount * (interest / 100) * period;
}

function calculateGrossValue(amount, period, returnAmt) {
  const taxRate = tax.find(t => period >= t.period);
  let grossTotal = amount + parseFloat(returnAmt);
  output.gross = grossTotal;
  output.tax = taxRate.rate;
  return;
}

export function calculate(data) {
  output.violations = [];
  const { interest, period } = data;
  const amount = data['initial-amount'];
  const returnAmt = calculateReturns(amount, interest, period);

  calculateGrossValue(amount, period, returnAmt);

  if (output.violations.length > 0) {
    output.gross = 0;
    output.tax = 0;
  }
  return output;
}
