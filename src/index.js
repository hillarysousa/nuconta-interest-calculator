import './assets/style/style.scss';
import * as data from './data.json';

const amount = localStorage.getItem('amount') ? parseFloat(localStorage.getItem('amount')) : data['initial-amount'];
const period = localStorage.getItem('period') ? parseInt(localStorage.getItem('period')) : data.period;
const { interest } = data;
const tax = [
  {period: 19, rate: 15},
  {period: 13, rate: 17.5},
  {period: 7, rate: 20},
  {period: 0, rate: 22.5},
];

const output = {
  gross: 0,
  tax: 0,
  violations: []
};

const amountInput = document.getElementById('amt-input');
const periodRange = document.getElementById('period-range');
const periodText = document.querySelectorAll('.month-qty');
const totalValueText = document.getElementById('total-value');
const grossValueText = document.getElementById('gross-value');

amountInput.value = amount;
periodRange.value = period;
periodText.forEach(el => el.textContent = `${periodRange.value} ${periodRange.value > 1 ? 'months' : 'month'}`);

function updateAmount(e) {
  localStorage.setItem('amount', e.target.value);
  amountInput.value = e.target.value;
  calculate(amountInput.value, interest, period);
  return;
}

function updatePeriod(e) {
  localStorage.setItem('period', e.target.value);
  periodRange.value = e.target.value;
  periodText.forEach(el => el.textContent = `${periodRange.value} ${periodRange.value > 1 ? 'months' : 'month'}`);
  calculate(amount, interest, periodRange.value);
  return;
}

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
  const taxRate = tax.find(rule => period >= rule.period);
  let grossTotal = amount + parseFloat(returnAmt);
  output.gross = grossTotal;
  output.tax = taxRate.rate;
  return;
}

function calculate(amount, interest, period) {
  const returnAmt = calculateReturns(amount, interest, period);
  calculateGrossValue(amount, period, returnAmt);
  if (output.violations.length > 0) {
    output.gross = 0;
    output.tax = 0;
  }
  const totalValue = output.gross - (returnAmt * (output.tax / 100));
  totalValueText.textContent = totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  grossValueText.textContent = output.gross.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return;
}

amountInput.addEventListener('change', updateAmount);
periodRange.addEventListener('change', updatePeriod);

calculate(amount, interest, period);
