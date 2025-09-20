import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import { Settings } from './Settings';
import { InviteFriends } from './InviteFriends';
import { WebViewScreen } from './WebViewScreen';
import { ChangePassword } from './ChangePassword';


const Stack = createNativeStackNavigator();

export const SettingsStack = () => {
    return (
        <>
            <StatusBar
                backgroundColor={colors.primary}
                barStyle='light-content'
            />
            <SafeAreaView backgroundColor={colors.primary} />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name={screenName.settings} component={Settings} />
                <Stack.Screen name={screenName.webViewScreen} component={WebViewScreen} />
                <Stack.Screen name={screenName.inviteFriends} component={InviteFriends} />
                <Stack.Screen name={screenName.changePassword} component={ChangePassword} />

            </Stack.Navigator>
        </>
    )
}