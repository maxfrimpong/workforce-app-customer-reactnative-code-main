import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenName} from '../utils';
import {
  ForgotPassword,
  LoginScreen,
  PasswordScreen,
  SignUpScreen,
  VerifyOtp,
  WelcomeScreen,
} from '../container/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAuthModule} from '../container/auth/WelcomeScreen';
import {WebViewScreen} from '../container/settings/WebViewScreen';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  const [skipIntro, setSkipIntro] = useState(null);

  useEffect(() => {
    async function getSkipIntro() {
      const value = await AsyncStorage.getItem('skipIntro');
      setSkipIntro(value);
    }
    getSkipIntro();
  }, [updateAuthModule, skipIntro]);

  console.log('skipIntro', skipIntro);

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      {skipIntro !== 'true' && (
        <Stack.Screen name={screenName.welcome} component={WelcomeScreen} />
      )}
      <Stack.Screen name={screenName.login} component={LoginScreen} />
      <Stack.Screen name={screenName.password} component={PasswordScreen} />
      <Stack.Screen name={screenName.verifyOtp} component={VerifyOtp} />
      <Stack.Screen name={screenName.forgot} component={ForgotPassword} />
      <Stack.Screen name={screenName.signUp} component={SignUpScreen} />
      <Stack.Screen name={screenName.webViewScreen} component={WebViewScreen} />
    </Stack.Navigator>
  );
};
