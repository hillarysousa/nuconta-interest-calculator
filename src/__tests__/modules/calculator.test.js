import { calculate } from '../../modules/calculator';

describe('calculator testing', () => {

  it('should calculate gross and tax correctly', () => {
    const data = {
      'initial-amount': 1000,
      interest: 0.5,
      period: 60
    };

    const { gross, tax, violations } = calculate(data);

    expect(gross).toBe(1348.85015);
    expect(tax).toBe(15);
    expect(violations).toHaveLength(0);
  });

  it('should return a serializable object', () => {
    const data = {
      'initial-amount': 1000,
      interest: 0.5,
      period: 60
    };

    const expected = `{\"gross\":1348.85015,\"tax\":15,\"violations\":[]}`;

    expect(JSON.stringify(calculate(data))).toMatch(expected);
  });

  it('should add invalid-initial-amount to violations on negative amount', () => {
    const data = {
      'initial-amount': -100,
      interest: 0.5,
      period: 60
    };

    const { gross, tax, violations } = calculate(data);

    expect(gross).toBe(0);
    expect(tax).toBe(0);
    expect(violations).toHaveLength(1);
    expect(violations).toContain('invalid-initial-amount');
  });

  it('should add invalid-interest to violations on negative interest', () => {
    const data = {
      'initial-amount': 1000,
      interest: -0.5,
      period: 60
    };

    const { gross, tax, violations } = calculate(data);

    expect(gross).toBe(0);
    expect(tax).toBe(0);
    expect(violations).toHaveLength(1);
    expect(violations).toContain('invalid-interest');
  });

  it('should add invalid-period to violations on negative period', () => {
    const data = {
      'initial-amount': 1000,
      interest: 0.5,
      period: -60
    };

    const { gross, tax, violations } = calculate(data);

    expect(gross).toBe(0);
    expect(tax).toBe(0);
    expect(violations).toHaveLength(1);
    expect(violations).toContain('invalid-period');
  });

  it('should include respective violations on negative period, amount and interest', () => {
    const data = {
      'initial-amount': -1000,
      interest: -0.5,
      period: -60
    };

    const { gross, tax, violations } = calculate(data);

    expect(gross).toBe(0);
    expect(tax).toBe(0);
    expect(violations).toHaveLength(3);
    expect(violations).toContain('invalid-initial-amount');
    expect(violations).toContain('invalid-interest');
    expect(violations).toContain('invalid-period');
  })
});