import { Text } from "react-native";

export default function Display({ content = "" }: { content: string }) {
  return (
    <Text className="text-calculator-text text-9xl font-inter-semibold mr-4">{content}</Text>
  )
}
