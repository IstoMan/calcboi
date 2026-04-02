import {
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
  Geist_700Bold,
} from '@expo-google-fonts/geist';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { useCallback, useEffect, useState } from 'react';

import './global.css';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Numpad from 'components/Numpad';
import Display from 'components/Display';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_700Bold,
  });

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync('#000000');
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const [buffer, setBuffer] = useState<string>('');
  const addToBuffer = useCallback((symbol: string) => {
    if (symbol === 'AC') {
      setBuffer('')
    } else {
      setBuffer((prev) => prev + symbol);
    }
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1 justify-end items-end bg-calculator-bg"
        edges={['top', 'right', 'bottom', 'left']}>
        <Display content={buffer} />
        <Numpad sendNum={addToBuffer} />
      </SafeAreaView>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
