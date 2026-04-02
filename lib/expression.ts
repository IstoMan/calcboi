/**
 * Parses and evaluates arithmetic expressions.
 * Supports + - * / ^, parentheses, unary minus, and decimal numbers.
 * Display symbols × and ÷ are normalized to * and /.
 */

export type EvaluateOk = { ok: true; value: string };
export type EvaluateErr = { ok: false; error: string };
export type EvaluateResult = EvaluateOk | EvaluateErr;

const OP_MUL = '*';
const OP_DIV = '/';
const OP_PLUS = '+';
const OP_MINUS = '-';
const OP_POW = '^';

type Token =
  | { type: 'number'; value: number }
  | { type: 'op'; value: string }
  | { type: 'lparen' }
  | { type: 'rparen' };

/** Replace UI symbols with ASCII operators for parsing. */
export function normalizeExpression(input: string): string {
  return input.replaceAll('×', OP_MUL).replaceAll('÷', OP_DIV).replace(/\s+/g, '');
}

function tokenize(raw: string): Token[] | null {
  const s = normalizeExpression(raw);
  const tokens: Token[] = [];
  let i = 0;

  while (i < s.length) {
    const c = s[i];

    if (c === '(') {
      tokens.push({ type: 'lparen' });
      i++;
      continue;
    }
    if (c === ')') {
      tokens.push({ type: 'rparen' });
      i++;
      continue;
    }

    if (c === OP_PLUS || c === OP_MUL || c === OP_DIV || c === OP_POW) {
      tokens.push({ type: 'op', value: c });
      i++;
      continue;
    }

    // Minus: binary or unary — tokenizer emits single minus; parser handles unary
    if (c === OP_MINUS) {
      tokens.push({ type: 'op', value: OP_MINUS });
      i++;
      continue;
    }

    if ((c >= '0' && c <= '9') || c === '.') {
      let j = i;
      let sawDot = false;
      while (j < s.length) {
        const ch = s[j];
        if (ch >= '0' && ch <= '9') {
          j++;
          continue;
        }
        if (ch === '.' && !sawDot) {
          sawDot = true;
          j++;
          continue;
        }
        break;
      }
      const numStr = s.slice(i, j);
      if (numStr === '.' || numStr.endsWith('.')) {
        return null;
      }
      const value = Number(numStr);
      if (!Number.isFinite(value)) {
        return null;
      }
      tokens.push({ type: 'number', value });
      i = j;
      continue;
    }

    return null;
  }

  return tokens;
}

function parseExpression(tokens: Token[], pos: { i: number }): number | null {
  return parseAddSub(tokens, pos);
}

function parseAddSub(tokens: Token[], pos: { i: number }): number | null {
  let left = parseMulDiv(tokens, pos);
  if (left === null) {
    return null;
  }
  while (pos.i < tokens.length) {
    const t = tokens[pos.i];
    if (t.type !== 'op' || (t.value !== OP_PLUS && t.value !== OP_MINUS)) {
      break;
    }
    pos.i++;
    const right = parseMulDiv(tokens, pos);
    if (right === null) {
      return null;
    }
    if (t.value === OP_PLUS) {
      left = left + right;
    } else {
      left = left - right;
    }
  }
  return left;
}

function parseMulDiv(tokens: Token[], pos: { i: number }): number | null {
  let left = parsePow(tokens, pos);
  if (left === null) {
    return null;
  }
  while (pos.i < tokens.length) {
    const t = tokens[pos.i];
    if (t.type !== 'op' || (t.value !== OP_MUL && t.value !== OP_DIV)) {
      break;
    }
    pos.i++;
    const right = parsePow(tokens, pos);
    if (right === null) {
      return null;
    }
    if (t.value === OP_MUL) {
      left = left * right;
    } else {
      if (right === 0) {
        return null;
      }
      left = left / right;
    }
  }
  return left;
}

function parsePow(tokens: Token[], pos: { i: number }): number | null {
  let left = parseUnary(tokens, pos);
  if (left === null) {
    return null;
  }
  if (pos.i < tokens.length) {
    const t = tokens[pos.i];
    if (t.type === 'op' && t.value === OP_POW) {
      pos.i++;
      const right = parsePow(tokens, pos); // right-associative
      if (right === null) {
        return null;
      }
      left = Math.pow(left, right);
    }
  }
  return left;
}

function parseUnary(tokens: Token[], pos: { i: number }): number | null {
  if (pos.i < tokens.length) {
    const t = tokens[pos.i];
    if (t.type === 'op' && t.value === OP_MINUS) {
      pos.i++;
      const v = parseUnary(tokens, pos);
      return v === null ? null : -v;
    }
  }
  return parsePrimary(tokens, pos);
}

function parsePrimary(tokens: Token[], pos: { i: number }): number | null {
  if (pos.i >= tokens.length) {
    return null;
  }
  const t = tokens[pos.i];
  if (t.type === 'number') {
    pos.i++;
    return t.value;
  }
  if (t.type === 'lparen') {
    pos.i++;
    const inner = parseExpression(tokens, pos);
    if (inner === null) {
      return null;
    }
    if (pos.i >= tokens.length || tokens[pos.i].type !== 'rparen') {
      return null;
    }
    pos.i++;
    return inner;
  }
  return null;
}

/** Format a finite number for display (trim ugly float noise). */
export function formatResult(n: number): string {
  if (!Number.isFinite(n)) {
    return 'Error';
  }
  const s = parseFloat(n.toPrecision(12)).toString();
  return s;
}

/**
 * Evaluate a user-facing expression string (may contain × ÷).
 * Returns formatted result string or an error.
 */
export function evaluateExpression(input: string): EvaluateResult {
  const trimmed = input.trim();
  if (trimmed === '') {
    return { ok: false, error: 'Empty' };
  }

  const tokens = tokenize(trimmed);
  if (tokens === null) {
    return { ok: false, error: 'Invalid expression' };
  }

  const pos = { i: 0 };
  const value = parseExpression(tokens, pos);
  if (value === null || pos.i !== tokens.length) {
    return { ok: false, error: 'Invalid expression' };
  }

  return { ok: true, value: formatResult(value) };
}
