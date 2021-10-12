import * as utils from '../modules/utils';

describe('index testing', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="initial-amount">
      <button id="sbt-btn" type="button" value="-">-</button>
      <button id="add-btn" type="button" value="+">+</button>
      <input type="range" min="0" max="120" id="period">
      <span class="month-qty"></span>
      <span id="total-value"></span>
      <span id="gross-value"></span>
    `;

    require('../index');
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should calculate based on default values', () => {
    const input = document.getElementById('initial-amount');
    const period = document.getElementById('period');
    const totalValue = document.getElementById('total-value');
    const grossValue = document.getElementById('gross-value');

    expect(input.value).toBe('1.000');
    expect(period.value).toBe('60');
    expect(totalValue.textContent).toBe('R$\xa01.296,52');
    expect(grossValue.textContent).toBe('R$\xa01.348,85');
  });

  it('should recalculate when amount changes', () => {
    const input = document.getElementById('initial-amount');
    const totalValue = document.getElementById('total-value');
    const grossValue = document.getElementById('gross-value');

    input.value = 100;
    utils.eventDispatcher('keyup', input);

    expect(input.value).toBe('100');
    expect(totalValue.textContent).toBe('R$\xa0129,65');
    expect(grossValue.textContent).toBe('R$\xa0134,89');
  });

  it('should recalculate when period changes', () => {
    const period = document.getElementById('period');
    const monthText = document.querySelector('.month-qty');
    const totalValue = document.getElementById('total-value');
    const grossValue = document.getElementById('gross-value');

    period.value = 1;
    utils.eventDispatcher('change', period);

    expect(period.value).toBe('1');
    expect(monthText.textContent).toBe('1 month');
    expect(totalValue.textContent).toBe('R$\xa01.003,88');
    expect(grossValue.textContent).toBe('R$\xa01.005,00');
  });

  it('should add to the amount when clicking plus button', () => {
    const input = document.getElementById('initial-amount');
    const addBtn = document.getElementById('add-btn');
    const totalValue = document.getElementById('total-value');
    const grossValue = document.getElementById('gross-value');

    addBtn.click();

    expect(input.value).toBe('1.100');
    expect(totalValue.textContent).toBe('R$\xa01.426,17');
    expect(grossValue.textContent).toBe('R$\xa01.483,74');
  });

  it('should subtract from the amount when clicking minus button', () => {
    const input = document.getElementById('initial-amount');
    const sbtBtn = document.getElementById('sbt-btn');
    const totalValue = document.getElementById('total-value');
    const grossValue = document.getElementById('gross-value');

    sbtBtn.click();

    expect(input.value).toBe('900');
    expect(totalValue.textContent).toBe('R$\xa01.166,87');
    expect(grossValue.textContent).toBe('R$\xa01.213,97');
  });

  it('should disable minus button when amount is zero', () => {
    const input = document.getElementById('initial-amount');
    const sbtBtn = document.getElementById('sbt-btn');
    const totalValue = document.getElementById('total-value');
    const grossValue = document.getElementById('gross-value');

    input.value = 0;
    utils.eventDispatcher('keyup', input);

    expect(input.value).toBe('0');
    expect(sbtBtn.disabled).toBe(true);
    expect(totalValue.textContent).toBe('R$\xa00,00');
    expect(grossValue.textContent).toBe('R$\xa00,00');
  });

  it('should check if amount is NaN and change it to zero', () => {
    const input = document.getElementById('initial-amount');
    const totalValue = document.getElementById('total-value');
    const grossValue = document.getElementById('gross-value');

    input.value = NaN;
    utils.eventDispatcher('keyup', input);

    expect(input.value).toBe('0');
    expect(totalValue.textContent).toBe('R$\xa00,00');
    expect(grossValue.textContent).toBe('R$\xa00,00');
  })
})