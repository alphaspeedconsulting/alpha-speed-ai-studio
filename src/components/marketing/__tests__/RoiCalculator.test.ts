import { describe, it, expect } from 'vitest';
import { calcAnnualSavings } from '../RoiCalculator';

describe('calcAnnualSavings', () => {
  it('test_roi_formula_correct: 5 employees × 10hr/wk × $50/hr = $52,000', () => {
    expect(calcAnnualSavings(5, 10, 50)).toBe(52000);
  });

  it('returns 0 when any input is 0', () => {
    expect(calcAnnualSavings(0, 10, 50)).toBe(0);
    expect(calcAnnualSavings(5, 0, 50)).toBe(0);
    expect(calcAnnualSavings(5, 10, 0)).toBe(0);
  });

  it('scales linearly with employees', () => {
    expect(calcAnnualSavings(10, 10, 50)).toBe(calcAnnualSavings(5, 10, 50) * 2);
  });

  it('scales linearly with hours', () => {
    expect(calcAnnualSavings(5, 20, 50)).toBe(calcAnnualSavings(5, 10, 50) * 2);
  });

  it('scales linearly with hourly cost', () => {
    expect(calcAnnualSavings(5, 10, 100)).toBe(calcAnnualSavings(5, 10, 50) * 2);
  });
});
