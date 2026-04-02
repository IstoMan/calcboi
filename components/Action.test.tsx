import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import Action from './Action';

describe('Action', () => {
  it('invokes onPress with the key symbol', () => {
    const onPress = jest.fn();
    render(<Action symbol="7" variant="number" onPress={onPress} />);
    fireEvent.press(screen.getByText('7'));
    expect(onPress).toHaveBeenCalledWith('7');
  });
});
