import { Text, View } from 'react-native';

export default function Display({ content = '' }: { content: string }) {
  return (
    <View className="w-full max-w-full self-stretch px-4">
      <Text
        className="text-right font-inter-semibold text-9xl text-calculator-text"
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.12}
        allowFontScaling>
        {content}
      </Text>
    </View>
  );
}
