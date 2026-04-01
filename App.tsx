import { StatusBar } from 'expo-status-bar';

import './global.css';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 justify-center items-center'>
        <Text className='text-[90px] text-red-500'>Hello App</Text>
      </SafeAreaView>
      <StatusBar style='auto'></StatusBar>
    </SafeAreaProvider >
  );
}
