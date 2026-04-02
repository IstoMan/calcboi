import { Pressable, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';

type ActionVariant = 'number' | 'function' | 'operator';

interface ActionProps {
  symbol: string;
  variant: ActionVariant;
  isWide?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Action({ symbol, variant = 'number', isWide = false }: ActionProps) {
  const pressed = useSharedValue(0);

  const handlePress = () => {
    console.log(`Hello you have pressed ${symbol}`);
  };

  const handlePressIn = () => {
    pressed.value = withTiming(1, { duration: 100 });
  };

  const handlePressOut = () => {
    pressed.value = withTiming(0, { duration: 100 });
  };

  const variantColors = {
    number: {  base: '#333333', pressed: '#505050' },
    function: { base: '#a5a5a5', pressed: '#d4d4d2' },
    operator: { base: '#ff9500', pressed: '#ff9f0a' },
  };

  const textColorStyles = {
    number: 'text-calculator-text',
    function: 'text-calculator-text',
    operator: 'text-calculator-text',
  };

  const containerClasses = isWide
    ? `aspect-[2.2/1] w-full flex-row items-center rounded-full px-7`
    : `aspect-square flex items-center justify-center rounded-full`;

  const textClasses = `text-4xl font-geist-sans ${textColorStyles[variant]}`;

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pressed.value, [0, 1], [1, 1.05]);
    const backgroundColor = interpolateColor(
      pressed.value,
      [0, 1],
      [variantColors[variant].base, variantColors[variant].pressed]
    );

    return {
      transform: [{ scale }],
      backgroundColor,
    };
  });

  return (
    <AnimatedPressable
      className={containerClasses}
      style={animatedStyle}
      onPress={handlePress} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text className={textClasses}>{symbol}</Text>
    </AnimatedPressable>
  );
}

export default Action;
