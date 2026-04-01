import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Action() {
  return (
    <SafeAreaView>
      <Pressable className="">
        <Text className="text-center font-sans text-9xl text-calculator-text">Hello</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Action;
