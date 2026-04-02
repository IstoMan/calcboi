import { evaluateExpression } from './expression';

/** Keys emitted by the numpad (display symbols). */
export type KeySymbol =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '.'
  | '+'
  | '-'
  | '×'
  | '÷'
  | '='
  | 'AC'
  | '±'
  | '%';

export type CalculatorState = {
  display: string;
  /** After `=` (or start), the next digit starts a new value. */
  freshEntry: boolean;
};

export const initialCalculatorState: CalculatorState = {
  display: '',
  freshEntry: true,
};

const OPERATORS = new Set(['+', '-', '×', '÷']);

function endsWithOperator(s: string): boolean {
  if (s.length === 0) {
    return false;
  }
  const last = s[s.length - 1];
  return OPERATORS.has(last);
}

/** `3+-`, `3×-`, `3÷-` — unary minus after a binary operator. */
function endsWithUnaryMinusAfterBinary(display: string): boolean {
  if (display.length < 2) {
    return false;
  }
  const last = display[display.length - 1]!;
  const prev = display[display.length - 2]!;
  return last === '-' && (prev === '+' || prev === '×' || prev === '÷');
}

function lastBinaryOperatorIndex(s: string): number {
  let best = -1;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '+' || c === '×' || c === '÷') {
      best = i;
    } else if (c === '-' && i > 0 && /[\d)]/.test(s[i - 1]!)) {
      best = i;
    }
  }
  return best;
}

function currentSegmentHasDot(display: string): boolean {
  const start = lastBinaryOperatorIndex(display) + 1;
  const segment = display.slice(start);
  return segment.includes('.');
}

function stripLeadingZerosForAppend(display: string, digit: string): string {
  if (digit === '0') {
    return display;
  }
  const start = lastBinaryOperatorIndex(display) + 1;
  const segment = display.slice(start);
  if (segment === '0') {
    return display.slice(0, start) + digit;
  }
  return display + digit;
}

function replaceTrailingOperator(display: string, op: string): string {
  if (display.length === 0) {
    return op === '-' ? '-' : display;
  }
  const last = display[display.length - 1]!;
  // Unary minus after +, ×, ÷ (e.g. 3 + (-4))
  if ((last === '+' || last === '×' || last === '÷') && op === '-') {
    return display + '-';
  }
  // Replace trailing "+-", "×-", "÷-" when picking a different operator
  if (endsWithUnaryMinusAfterBinary(display) && op !== '-') {
    return display.slice(0, -2) + op;
  }
  if (endsWithOperator(display)) {
    if (op === '-' && display.length === 1 && display === '-') {
      return display;
    }
    return display.slice(0, -1) + op;
  }
  return display + op;
}

function negateLastSegment(display: string): string {
  if (display === '' || display === 'Error') {
    return display;
  }
  const opIdx = lastBinaryOperatorIndex(display);
  const segmentStart = opIdx + 1;
  const segment = display.slice(segmentStart);
  const num = Number(segment.replace('×', '*').replace('÷', '/'));
  if (!Number.isFinite(num)) {
    return display;
  }
  const neg = -num;
  const formatted = formatNumberForDisplay(neg);
  return display.slice(0, segmentStart) + formatted;
}

function percentLastSegment(display: string): string {
  if (display === '' || display === 'Error') {
    return display;
  }
  const opIdx = lastBinaryOperatorIndex(display);
  const segmentStart = opIdx + 1;
  const segment = display.slice(segmentStart);
  const num = Number(segment.replace('×', '*').replace('÷', '/'));
  if (!Number.isFinite(num)) {
    return display;
  }
  const scaled = num / 100;
  const formatted = formatNumberForDisplay(scaled);
  return display.slice(0, segmentStart) + formatted;
}

function formatNumberForDisplay(n: number): string {
  if (!Number.isFinite(n)) {
    return 'Error';
  }
  return parseFloat(n.toPrecision(12)).toString();
}

/**
 * Pure reducer: apply one key to calculator state.
 */
export function applyKey(state: CalculatorState, symbol: KeySymbol): CalculatorState {
  if (symbol === 'AC') {
    return initialCalculatorState;
  }

  if (state.display === 'Error') {
    return state;
  }

  if (symbol === '±') {
    return { ...state, display: negateLastSegment(state.display), freshEntry: false };
  }

  if (symbol === '%') {
    return { ...state, display: percentLastSegment(state.display), freshEntry: false };
  }

  if (symbol === '=') {
    const result = evaluateExpression(state.display);
    if (!result.ok) {
      return { display: 'Error', freshEntry: true };
    }
    return { display: result.value, freshEntry: true };
  }

  if (OPERATORS.has(symbol)) {
    let next = state.display;
    if (state.freshEntry && next !== '') {
      // allow chaining after result
    } else if (next === '' && symbol !== '-') {
      return state;
    }
    if (symbol === '-' && next === '') {
      return { display: '-', freshEntry: false };
    }
    next = replaceTrailingOperator(next, symbol);
    return { display: next, freshEntry: false };
  }

  if (symbol === '.') {
    if (state.freshEntry) {
      return { display: '0.', freshEntry: false };
    }
    if (currentSegmentHasDot(state.display)) {
      return state;
    }
    const d = state.display;
    if (d === '' || endsWithOperator(d)) {
      return { display: d + '0.', freshEntry: false };
    }
    return { display: d + '.', freshEntry: false };
  }

  // digit (`.` handled above)
  const digit = symbol;
  if (state.freshEntry) {
    return { display: digit, freshEntry: false };
  }
  let next = state.display;
  if (digit !== '0') {
    next = stripLeadingZerosForAppend(next, digit);
  } else {
    const start = lastBinaryOperatorIndex(next) + 1;
    const seg = next.slice(start);
    if (seg === '0') {
      return state;
    }
    next = next + digit;
  }
  return { display: next, freshEntry: false };
}
