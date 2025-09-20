import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Switch,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../components/customLoader/action'
import { Header } from '../../components/molecules'
import { Request } from '../../services'
import { loginSuccess } from '../../store/modules/login/actions'
import { apiConfig, apiSuccess, colors, errorToast, fonts, images, screenName, successToast } from '../../utils'

const settingsList = [
    {
        name: 'Invite Friends',
        screen: screenName.inviteFriends,
        data: {
            name: 'Invite Friends',
            url: '',
        },
    },
    {
        name: 'Terms & Conditions',
        screen: screenName.webViewScreen,
        data: {
            name: 'Terms & Conditions',
            url: apiConfig.terms,
        },
    },
    {
        name: 'Privacy Policies',
        screen: screenName.webViewScreen,
        data: {
            name: 'Privacy Policies',
            url: apiConfig.privacyPolicy,
        },
    },
    {
        name: 'About Us',
        screen: screenName.webViewScreen,
        data: {
            name: 'About Us',
            url: apiConfig.aboutUs,
        },
    },
    {
        name: 'Change Password',
        screen: screenName.changePassword,
        data: {
            name: 'Change Password',
            url: '',
        },
    },


]

export const Settings = ({ navigation }) => {

    // *********** Hooks Functions ********** //

    const dispatch = useDispatch()

    const {
        user,
    } = useSelector(state => ({
        user: state.loginReducer.loginData
    }))

    const [notification, setNotification] = useState(user?.appNotifications == 'on' ? true : false)

    const handleNotification = data => async () => {
        const payload = {
            notificationStatus: data === true ? 'on' : 'off'
        }
        setNotification(data)
        try {
            const response = await Request.post(
                apiConfig.notification,
                payload
            );
            console.log('ChangePassword response', response)
            if (response.status == apiSuccess) {
                dispatch(loginSuccess({
                    ...user,
                    appNotifications: response?.data?.appNotifications
                }))
            } else {
                setNotification(!data)
                errorToast(response.message)
            }
        } catch (error) {
            setNotification(!data)
            console.log('API ERROR', error)
        }
    }

    return (
        <View style={styles.mainView}>
            <Header
                borderRound
                menu
                title='Settings'
            />

            <View style={styles.notificationWrapper}>
                <Text style={styles.notificationText}>
                    App Notification
                </Text>
                <Switch
                    onValueChange={handleNotification(!notification)}
                    value={notification}
                    trackColor={{ false: colors.itemBackground, true: colors.itemBackground }}
                    thumbColor={colors.primary}
                    ios_backgroundColor={colors.itemBackground}
                />
            </View>

            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={settingsList}
                keyExtractor={(item, index) => `${index}_settingList`}
                renderItem={({ item, index }) =>
                    <TouchableOpacity
                        onPress={() => item.screen === '' ? null : navigation.navigate(item.screen, { data: item.data })}
                        style={styles.itemWrapper}>
                        <Text style={styles.itemHeading}>
                            {item.name}
                        </Text>
                        <Image
                            style={styles.icArrow}
                            source={images.icArrowOption}
                        />
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentContainerStyle: {
        paddingVertical: '5%',
        paddingHorizontal: '5%'
    },
    notificationWrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        marginTop: '5%'
    },
    notificationText: {
        fontFamily: fonts.primaryMedium,
        fontSize: 13,
        color: colors.textBlack
    },
    itemWrapper: {
        backgroundColor: colors.itemBackground,
        marginBottom: 10,
        borderRadius: 15,
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: .5,
        borderColor: colors.circleBorder
    },
    itemHeading: {
        fontFamily: fonts.primarySemibold,
        fontSize: 14,
        color: colors.textBlack,
    },
    icArrow: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
        tintColor: colors.textBlack
    }
})