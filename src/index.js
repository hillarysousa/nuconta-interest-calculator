import './assets/style/style.scss';
import Cleave from 'cleave.js';
import { calculate } from './modules/calculator';
import { subtractFromAmount, addToAmount, formatCurrency } from './modules/utils';

const amountInput = document.getElementById('initial-amount');
const periodRange = document.getElementById('period');
const subtractBtn = document.getElementById('sbt-btn');
const addBtn = document.getElementById('add-btn');

const periodText = document.querySelectorAll('.month-qty');
const totalValueText = document.getElementById('total-value');
const grossValueText = document.getElementById('gross-value');

const maskedInput = new Cleave(amountInput, {numeral: true, delimiter: '.'});

let input = {
  'initial-amount': 1000,
  interest: 0.5,
  period: 60
};

function recalculate(e) {
  const target = e.target;
  const unformattedValue = target.id === 'initial-amount' ? maskedInput.getRawValue() : target.value;
  input[target.id] = isNaN(parseFloat(unformattedValue)) ? 0 : parseFloat(unformattedValue);
  const { gross, tax } = calculate(input);
  refreshUI(input, {gross, tax});
  return;
};

export function refreshUI(input, output) {
  const { period } = input;
  maskedInput.setRawValue(input['initial-amount']);
  amountInput.value = maskedInput.getFormattedValue();
  periodRange.value = input.period;
  periodText.forEach(el => el.textContent = `${period} ${period > 1 ? 'months' : 'month'}`);
  const totalValue = output.gross - (output.gross - input['initial-amount']) * (output.tax / 100);
  totalValueText.textContent = formatCurrency(totalValue, true);
  grossValueText.textContent = formatCurrency(output.gross, true);
  input['initial-amount'] <= 0 ? subtractBtn.disabled = true : subtractBtn.disabled = false;
  return;
};

amountInput.addEventListener('keyup', recalculate);
periodRange.addEventListener('change', recalculate);
subtractBtn.addEventListener('click', () => subtractFromAmount(amountInput, maskedInput));
addBtn.addEventListener('click', () => addToAmount(amountInput, maskedInput));

const { gross, tax } = calculate(input);

refreshUI(input, {gross, tax});