import { View } from 'react-native';
import Action from './Action';

function Numpad({ sendNum }: { sendNum: (buffer: string) => void }) {
  return (
    <View className="w-full gap-3 p-4">
      {/* Row 1: AC, ±, %, ÷ */}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Action symbol="AC" variant="function" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="±" variant="function" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="%" variant="function" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="÷" variant="operator" onPress={sendNum} />
        </View>
      </View>

      {/* Row 2: 7, 8, 9, × */}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Action symbol="7" variant="number" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="8" variant="number" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="9" variant="number" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="×" variant="operator" onPress={sendNum} />
        </View>
      </View>

      {/* Row 3: 4, 5, 6, - */}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Action symbol="4" variant="number" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="5" variant="number" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="6" variant="number" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="-" variant="operator" onPress={sendNum} />
        </View>
      </View>

      {/* Row 4: 1, 2, 3, + */}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Action symbol="1" variant="number" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="2" variant="number" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="3" variant="number" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="+" variant="operator" onPress={sendNum} />
        </View>
      </View>

      {/* Row 5: 0 (wide), ., = */}
      <View className="flex-row gap-3">
        <View className="flex-[2]">
          <Action symbol="0" variant="number" isWide onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="." variant="number" onPress={sendNum} />
        </View>
        <View className="flex-1">
          <Action symbol="=" variant="operator" onPress={sendNum} />
        </View>
      </View>
    </View>
  );
}

export default Numpad;
