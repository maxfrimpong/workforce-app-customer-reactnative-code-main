import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import { Profile } from './Profile';
import { EditProfile } from './EditProfile';
import { ChangePassword } from './ChangePassword';



const Stack = createNativeStackNavigator();

export const ProfileStack = () => {
    return (
        <>
            <StatusBar
                backgroundColor={colors.primary}
                barStyle='light-content'
            />
            <SafeAreaView style={{ backgroundColor: colors.primary }} />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >

                <Stack.Screen name={screenName.profile} component={Profile} />
                <Stack.Screen name={screenName.editProfile} component={EditProfile} />


            </Stack.Navigator>
        </>
    )
}