import Cleave from 'cleave.js';
import { eventDispatcher, subtractFromAmount, addToAmount, formatCurrency } from '../../modules/utils';

describe('utils testing', () => {
  it('should fire event with eventDispatcher function', () => {
    document.body.innerHTML = `<button id="sbt-btn" type="button" value="-" onclick="this.innerHTML='+'">-</button>`;
    const button = document.getElementById('sbt-btn');
    eventDispatcher('click', button);

    expect(button.innerHTML).toBe('+');
  });

  it('should subtract 100 from amount when subtractFromAmount function is fired', () => {
    document.body.innerHTML = `<input id="initial-amount" value="1100">`;
    const element = document.getElementById('initial-amount');
    const maskedElement = new Cleave(element, {numeral: true, delimiter: '.'});
    subtractFromAmount(element, maskedElement);

    expect(element.value).toBe('1.000');
    expect(maskedElement.getRawValue()).toBe('1000');
    
    subtractFromAmount(element, maskedElement);

    expect(element.value).toBe('900');
    expect(maskedElement.getRawValue()).toBe('900');
  });


  it('should add 100 to amount when addToAmount function is fired', () => {
    document.body.innerHTML = `<input id="initial-amount" value="800">`;
    const element = document.getElementById('initial-amount');
    const maskedElement = new Cleave(element, {numeral: true, delimiter: '.'});
    addToAmount(element, maskedElement);

    expect(element.value).toBe('900');
    expect(maskedElement.getRawValue()).toBe('900');

    addToAmount(element, maskedElement);

    expect(element.value).toBe('1.000');
    expect(maskedElement.getRawValue()).toBe('1000');
  });

  it('should format number to currency with formatCurrency function', () => {
    const value = 1000;
    expect(formatCurrency(value)).toBe('R$\xa01.000,00');
  });
});