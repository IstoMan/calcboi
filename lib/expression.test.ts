import { describe, expect, it } from '@jest/globals';

import { evaluateExpression, normalizeExpression } from './expression';

describe('normalizeExpression', () => {
  it('maps display operators to ASCII', () => {
    expect(normalizeExpression('2 × 3 ÷ 4')).toBe('2*3/4');
  });
});

describe('evaluateExpression', () => {
  it('evaluates addition and multiplication with precedence', () => {
    expect(evaluateExpression('2+3*4')).toEqual({ ok: true, value: '14' });
  });

  it('accepts × and ÷', () => {
    expect(evaluateExpression('6÷2×3')).toEqual({ ok: true, value: '9' });
  });

  it('handles parentheses and unary minus', () => {
    expect(evaluateExpression('-(2+3)')).toEqual({ ok: true, value: '-5' });
  });

  it('rejects division by zero', () => {
    expect(evaluateExpression('1/0').ok).toBe(false);
  });

  it('rejects empty input', () => {
    expect(evaluateExpression('   ')).toEqual({ ok: false, error: 'Empty' });
  });
});
