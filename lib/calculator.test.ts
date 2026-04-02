import { describe, expect, it } from '@jest/globals';

import { applyKey, initialCalculatorState, type KeySymbol } from './calculator';

function pressAll(keys: KeySymbol[]) {
  return keys.reduce((s, k) => applyKey(s, k), initialCalculatorState);
}

describe('applyKey', () => {
  it('clears on AC', () => {
    const s = pressAll(['1', '2', 'AC']);
    expect(s).toEqual(initialCalculatorState);
  });

  it('evaluates on equals', () => {
    const s = pressAll(['1', '+', '2', '=']);
    expect(s.display).toBe('3');
    expect(s.freshEntry).toBe(true);
  });

  it('starts fresh digits after result', () => {
    const s = pressAll(['4', '2', '=', '5']);
    expect(s.display).toBe('5');
  });

  it('chains operator after result', () => {
    const s = pressAll(['2', '+', '3', '=', '+', '1', '=']);
    expect(s.display).toBe('6');
  });

  it('supports unary minus after operator', () => {
    const s = pressAll(['3', '+', '-', '2', '=']);
    expect(s.display).toBe('1');
  });

  it('keeps Error until AC', () => {
    const err = pressAll(['1', '÷', '0', '=']);
    expect(err.display).toBe('Error');
    const still = applyKey(err, '5');
    expect(still.display).toBe('Error');
    expect(applyKey(still, 'AC')).toEqual(initialCalculatorState);
  });
});
