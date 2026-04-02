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
import { useEffect } from 'react';

import './global.css';
import { useCalculator } from 'lib/useCalculator';
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

  const { display, onKey } = useCalculator();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1 items-end justify-end bg-calculator-bg"
        edges={['top', 'right', 'bottom', 'left']}>
        <Display content={display} />
        <Numpad onKeyPress={onKey} />
      </SafeAreaView>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
