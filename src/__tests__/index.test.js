import {refreshUI } from '../index.js';

describe("Unit Tests", () => {
  let container,input,range,months,total, gross;

  beforeAll(() => {
    container = document.body;
    input = document.createElement('input');
    input.setAttribute('id', 'initial-amount');
    input.setAttribute('value', '1000');
    range = document.createElement('input');
    range.setAttribute('type', 'range');
    range.setAttribute('min', '0');
    range.setAttribute('max', '120');
    range.setAttribute('id', 'period');
    months = document.createElement('span');
    months.setAttribute('class', 'month-qty');
    total = document.createElement('span');
    total.setAttribute('id', 'total-value');
    gross = document.createElement('span');
    gross.setAttribute('id', 'gross-value');
    container.appendChild(input);
    container.appendChild(range);
    container.appendChild(months);
    container.appendChild(total);
    container.appendChild(gross);
  });

  describe('render with initial amounts', () => {
    let eventHandler;
    beforeAll(() => {
      let input = {
        'initial-amount': 1000,
        interest: 0.5,
        period: 24
      }

      let output = {
        gross: 1150,
        tax: 15
      }

      eventHandler = jest.fn();

      const inputElement = document.getElementById('initial-amount');
      inputElement.addEventListener('change', eventHandler);

      refreshUI(input, output);
    });

    it('should work', () => {
      expect(eventHandler).toHaveBeenCalled();
    })
  });
});