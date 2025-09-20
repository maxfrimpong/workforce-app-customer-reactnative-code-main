import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import { MyJob } from './MyJobs';
import { JobDetails } from './JobDetails';
import { Tracking } from './Tracking';
import { RateService } from './RateService';
import { Providers } from './Providers';
import { ProviderDetails } from './ProviderDetails';
import { ProviderProfile } from './ProviderProfile';
import { ThankYou } from '../home/ThankYou';
import { Reviews } from './Reviews';
import { Chat } from './Chat';



const Stack = createNativeStackNavigator();

export const JobsStack = () => {
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
                <Stack.Screen name={screenName.myJob} component={MyJob} />
                <Stack.Screen name={screenName.jobDetails} component={JobDetails} />
                <Stack.Screen name={screenName.tracking} component={Tracking} />
                <Stack.Screen name={screenName.rateService} component={RateService} />
                <Stack.Screen name={screenName.providers} component={Providers} />
                <Stack.Screen name={screenName.providerDetails} component={ProviderDetails} />
                <Stack.Screen name={screenName.providerProfile} component={ProviderProfile} />
                <Stack.Screen name={screenName.thankYou} component={ThankYou} />
                <Stack.Screen name={screenName.reviews} component={Reviews} />
                <Stack.Screen name={screenName.chat} component={Chat} />

            </Stack.Navigator>
        </>
    )
}