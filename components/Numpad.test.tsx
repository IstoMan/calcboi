import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import Numpad from './Numpad';

describe('Numpad', () => {
  it('dispatches key symbols to onKeyPress', () => {
    const onKeyPress = jest.fn();
    render(<Numpad onKeyPress={onKeyPress} />);
    fireEvent.press(screen.getByText('AC'));
    fireEvent.press(screen.getByText('1'));
    expect(onKeyPress).toHaveBeenNthCalledWith(1, 'AC');
    expect(onKeyPress).toHaveBeenNthCalledWith(2, '1');
  });
});
