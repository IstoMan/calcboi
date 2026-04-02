import { View } from 'react-native';

import type { KeySymbol } from 'lib/calculator';

import Action, { type ActionVariant } from './Action';

type KeyCell = {
  symbol: KeySymbol;
  variant: ActionVariant;
  isWide?: boolean;
  flex?: 1 | 2;
};

const KEY_ROWS: KeyCell[][] = [
  [
    { symbol: 'AC', variant: 'function' },
    { symbol: '±', variant: 'function' },
    { symbol: '%', variant: 'function' },
    { symbol: '÷', variant: 'operator' },
  ],
  [
    { symbol: '7', variant: 'number' },
    { symbol: '8', variant: 'number' },
    { symbol: '9', variant: 'number' },
    { symbol: '×', variant: 'operator' },
  ],
  [
    { symbol: '4', variant: 'number' },
    { symbol: '5', variant: 'number' },
    { symbol: '6', variant: 'number' },
    { symbol: '-', variant: 'operator' },
  ],
  [
    { symbol: '1', variant: 'number' },
    { symbol: '2', variant: 'number' },
    { symbol: '3', variant: 'number' },
    { symbol: '+', variant: 'operator' },
  ],
  [
    { symbol: '0', variant: 'number', isWide: true, flex: 2 },
    { symbol: '.', variant: 'number' },
    { symbol: '=', variant: 'operator' },
  ],
];

function Numpad({ onKeyPress }: { onKeyPress: (symbol: KeySymbol) => void }) {
  return (
    <View className="w-full gap-3 p-4">
      {KEY_ROWS.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} className="flex-row gap-3">
          {row.map((cell) => (
            <View key={cell.symbol} className={cell.flex === 2 ? 'flex-[2]' : 'flex-1'}>
              <Action
                symbol={cell.symbol}
                variant={cell.variant}
                isWide={cell.isWide}
                onPress={onKeyPress}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

export default Numpad;
