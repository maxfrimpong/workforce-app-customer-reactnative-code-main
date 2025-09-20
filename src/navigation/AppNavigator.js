import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStack } from '../container/home';
import { screenName } from '../utils';
import { CustomDrawer } from '../components/molecules';
import { SettingsStack } from '../container/settings';
import { PaymentStack } from '../container/payment';
import { AddressStack } from '../container/address';
import { Wallet } from '../container/wallet/Wallet';
import { ProfileStack } from '../container/profile';
import { JobsStack } from '../container/job';
import { HelpStack } from '../container/help';



//Import Stack 
const Drawer = createDrawerNavigator();

// Drawer Navigator
export const AppNavigator = () => {
    return (
        <>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false
                }}
                drawerType="front"
                initialRouteName={screenName.mainHome}
                drawerStyle={{
                    width: '75%'
                }}
                drawerContent={(props) => <CustomDrawer {...props} />}
            >
                <Drawer.Screen
                    name={screenName.mainHome}
                    component={HomeStack} />

                <Drawer.Screen
                    name={screenName.mainJobs}
                    component={JobsStack} />

                <Drawer.Screen
                    name={screenName.mainProfile}
                    component={ProfileStack} />

                <Drawer.Screen
                    name={screenName.mainPayment}
                    component={PaymentStack} />

                <Drawer.Screen
                    name={screenName.mainHelp}
                    component={HelpStack} />

                <Drawer.Screen
                    name={screenName.mainSettings}
                    component={SettingsStack} />


            </Drawer.Navigator>
        </>
    )
}