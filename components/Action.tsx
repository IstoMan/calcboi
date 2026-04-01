import { Pressable, Text } from 'react-native';

type ActionVariant = 'number' | 'function' | 'operator';

interface ActionProps {
  symbol: string;
  variant: ActionVariant;
  isWide?: boolean;
}

function Action({ symbol, variant = 'number', isWide = false }: ActionProps) {
  const handlePress = () => {
    console.log(`Hello you have pressed ${symbol}`);
  };

  const variantStyles = {
    number: 'bg-calculator-key-num',
    function: 'bg-calculator-key-fn',
    operator: 'bg-calculator-operator',
  };

  const textColorStyles = {
    number: 'text-calculator-text',
    function: 'text-calculator-text',
    operator: 'text-calculator-text',
  };

  const containerClasses = isWide
    ? `aspect-[2.2/1] w-full flex-row items-center rounded-full ${variantStyles[variant]} px-7`
    : `aspect-square flex items-center justify-center rounded-full ${variantStyles[variant]}`;

  const textClasses = `text-4xl font-geist-sans ${textColorStyles[variant]}`;

  return (
    <Pressable className={containerClasses} onPress={handlePress}>
      <Text className={textClasses}>{symbol}</Text>
    </Pressable>
  );
}

export default Action;
