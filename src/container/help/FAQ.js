import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    SafeAreaView,
    Linking
} from 'react-native'
import WebView from 'react-native-webview'
import { useSelector } from 'react-redux'
import { Header } from '../../components/molecules'
import config from '../../config'
import { apiConfig, colors, fonts, screenName } from '../../utils'


export const FAQ = ({ navigation }) => {

    /************ Main Functions ************/

    const adminSettings = useSelector(state => state.homeReducer.adminSettings)

    /************ Main Functions ************/

    const handleContactSupport = () => {
        Linking.openURL(`tel:${adminSettings[0]?.App_Settings?.Admin_Phone_Number ?? ''}`)
    }

    return (
        <View style={styles.mainView}>
            <SafeAreaView style={{ backgroundColor: colors.white }} />
            <Header
                back
                title='Help & Support'
            />

            <View style={{
                height: '75%',
            }}>
                <WebView source={{ uri: `${config.API_URL}${apiConfig.faq}` }} />
            </View>

            <View style={styles.bottomView}>
                <Text style={styles.helpText}>
                    Still Stuck? Help is a mail away
                </Text>
                <View style={styles.horizontalView}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(screenName.contactUs)}
                        style={styles.updateDisputeButton}>
                        <Text style={styles.updateText}>
                            Send a Message
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleContactSupport}
                        style={[styles.updateDisputeButton, {
                            backgroundColor: colors.white
                        }]}>
                        <Text style={[styles.updateText, {
                            color: colors.primary
                        }]}>
                            Contact Support
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    bottomView: {
        position: 'absolute',
        bottom: '5%',
        zIndex: 1,
        width: '100%'
    },
    helpText: {
        fontSize: 18,
        fontFamily: fonts.primarySemibold,
        color: colors.black,
        alignSelf: 'center',
        marginBottom: '3%'
    },
    horizontalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%'
    },
    updateDisputeButton: {
        width: '47%',
        backgroundColor: colors.primary,
        paddingVertical: '4%',
        alignItems: 'center',
        borderRadius: 50,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    updateText: {
        fontSize: 18,
        fontFamily: fonts.primarySemibold,
        color: colors.white
    }
})