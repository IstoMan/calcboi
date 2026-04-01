import { View } from 'react-native';
import Action from './Action';

function Numpad() {
  return (
    <View className="w-full gap-3 p-4">
      {/* Row 1: AC, ±, %, ÷ */}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Action symbol="AC" variant="function" />
        </View>
        <View className="flex-1">
          <Action symbol="±" variant="function" />
        </View>
        <View className="flex-1">
          <Action symbol="%" variant="function" />
        </View>
        <View className="flex-1">
          <Action symbol="÷" variant="operator" />
        </View>
      </View>

      {/* Row 2: 7, 8, 9, × */}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Action symbol="7" variant="number" />
        </View>
        <View className="flex-1">
          <Action symbol="8" variant="number" />
        </View>
        <View className="flex-1">
          <Action symbol="9" variant="number" />
        </View>
        <View className="flex-1">
          <Action symbol="×" variant="operator" />
        </View>
      </View>

      {/* Row 3: 4, 5, 6, - */}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Action symbol="4" variant="number" />
        </View>
        <View className="flex-1">
          <Action symbol="5" variant="number" />
        </View>
        <View className="flex-1">
          <Action symbol="6" variant="number" />
        </View>
        <View className="flex-1">
          <Action symbol="-" variant="operator" />
        </View>
      </View>

      {/* Row 4: 1, 2, 3, + */}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Action symbol="1" variant="number" />
        </View>
        <View className="flex-1">
          <Action symbol="2" variant="number" />
        </View>
        <View className="flex-1">
          <Action symbol="3" variant="number" />
        </View>
        <View className="flex-1">
          <Action symbol="+" variant="operator" />
        </View>
      </View>

      {/* Row 5: 0 (wide), ., = */}
      <View className="flex-row gap-3">
        <View className="flex-[2]">
          <Action symbol="0" variant="number" isWide />
        </View>
        <View className="flex-1">
          <Action symbol="." variant="number" />
        </View>
        <View className="flex-1">
          <Action symbol="=" variant="operator" />
        </View>
      </View>
    </View>
  );
}

export default Numpad;
