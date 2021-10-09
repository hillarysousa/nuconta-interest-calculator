import './assets/style/style.scss';
import { calculate } from './modules/calculator';
import { subtractFromAmount, addToAmount } from './modules/utils';

const amountInput = document.getElementById('initial-amount');
const periodRange = document.getElementById('period');
const subtractBtn = document.getElementById('sbt-btn');
const addBtn = document.getElementById('add-btn');

const periodText = document.querySelectorAll('.month-qty');
const totalValueText = document.getElementById('total-value');
const grossValueText = document.getElementById('gross-value');

let input = {
  'initial-amount': parseFloat(amountInput.value),
  interest: 0.5,
  period: parseInt(periodRange.value)
}

function recalculate(e) {
  const target = e.target.id;
  input[target] = parseFloat(e.target.value);
  const { gross, tax } = calculate(input);
  refreshUI(input, {gross, tax});
  return;
}

export function refreshUI(input, output) {
  const { period } = input;
  periodText.forEach(el => el.textContent = `${period} ${period > 1 ? 'months' : 'month'}`);
  const totalValue = output.gross - (output.gross - input['initial-amount']) * (output.tax / 100);
  totalValueText.textContent = totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  grossValueText.textContent = output.gross.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  input['initial-amount'] === 0 ? subtractBtn.disabled = true : subtractBtn.disabled = false;
  return;
}

amountInput.addEventListener('change', recalculate);
periodRange.addEventListener('change', recalculate);
subtractBtn.addEventListener('click', () => subtractFromAmount(amountInput));
addBtn.addEventListener('click', () => addToAmount(amountInput));

const { gross, tax } = calculate(input);

refreshUI(input, {gross, tax});