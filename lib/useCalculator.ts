import { useReducer } from 'react';

import { applyKey, initialCalculatorState, type KeySymbol } from './calculator';

export function useCalculator() {
  const [state, dispatch] = useReducer(applyKey, initialCalculatorState);
  return {
    display: state.display,
    onKey: (key: KeySymbol) => {
      dispatch(key);
    },
  };
}
