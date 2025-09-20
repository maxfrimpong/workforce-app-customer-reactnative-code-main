import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import { HomeScreen } from './HomeScreen';
import { SubCategory } from './SubCategory';
import { PaymentMethod } from '../payment/PaymentMethod';
import { AddCard } from '../payment/AddCard';
import { ThankYou } from './ThankYou';
import { Location } from './Location';
import { PostJob } from './PostJob';
import { PlatformCharge } from './PlatformCharge';
import { WebViewScreen } from '../settings/WebViewScreen';


const Stack = createNativeStackNavigator();

export const HomeStack = () => {
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

                <Stack.Screen name={screenName.homeScreen} component={HomeScreen} />
                <Stack.Screen name={screenName.location} component={Location} />
                <Stack.Screen name={screenName.subCategory} component={SubCategory} />
                <Stack.Screen name={screenName.postJob} component={PostJob} />
                <Stack.Screen name={screenName.platformCharge} component={PlatformCharge} />
                <Stack.Screen name={screenName.thankYou} component={ThankYou} />


                {/* Payment */}
                <Stack.Screen name={screenName.paymentMethod} component={PaymentMethod} />
                <Stack.Screen name={screenName.addCard} component={AddCard} />

                <Stack.Screen name={screenName.webViewScreen} component={WebViewScreen} />


            </Stack.Navigator>
        </>
    )
}