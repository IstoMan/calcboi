import { Text } from 'react-native';

export default function Display({ content = '' }: { content: string }) {
  return (
    <Text className="mr-4 text-nowrap font-inter-semibold text-9xl text-calculator-text">
      {content}
    </Text>
  );
}
