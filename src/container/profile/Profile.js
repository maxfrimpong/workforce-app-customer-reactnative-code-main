import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { BottomButton } from '../../components/atoms'
import { Header } from '../../components/molecules'
import { colors, fonts, images, screenName } from '../../utils'

export const Profile = ({
    navigation,
    route,
}) => {

    // ******* Hokks Function ******* //

    const user = useSelector(state => state.loginReducer.loginData)


    // ******* Main Function ****** //

    const renderFormItem = (img, value) => {
        return (
            <View style={styles.itemWrapper}>
                <Image
                    style={styles.itemIcon}
                    source={img}
                />
                <View style={styles.valueWrapper}>
                    <Text
                        numberOfLines={1}
                        style={styles.valueText}>
                        {value}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.mainView}>
            <Header
                menu
                borderRound
                title='Profile'
            />

            <ScrollView contentContainerStyle={styles.contentContainerStyle}>

                {/* Floating button */}

                <TouchableOpacity
                    onPress={() => navigation.navigate(screenName.editProfile)}
                    style={styles.floatingButton}
                >
                    <Image
                        style={styles.floatingIcon}
                        source={images.icEditProfile}
                    />
                </TouchableOpacity>

                {/* Content View */}

                <Image
                    style={styles.profileIcon}
                    source={user?.profileImage && user?.profileImage !== 'none'
                        ? { uri: user?.profileImage }
                        : images.dummyProfile}
                />

                <Text style={styles.profileText}>
                    {user?.firstName} {user?.lastName}
                </Text>

                <View style={styles.formWrapper}>

                    {renderFormItem(images.icPhoneProfile, `${user?.countryCode} ${user?.mobileNumber}`)}
                    {renderFormItem(images.icMailProfile, user?.email)}

                </View>


            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentContainerStyle: {
        paddingHorizontal: '8%',
        alignItems: 'center',
        paddingVertical: 20
    },
    profileIcon: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginTop: '10%'
    },
    profileText: {
        fontFamily: fonts.primaryBold,
        fontSize: 18,
        color: colors.textLightBlack,
        marginTop: '3%'
    },
    floatingButton: {
        position: 'absolute',
        right: '5%',
        top: '8%',
        zIndex: 1
    },
    floatingIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    formWrapper: {
        paddingHorizontal: '8%',
        width: '100%',
        marginTop: '6%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: colors.white,
        elevation: 5,
        paddingVertical: '5%',
        borderRadius: 15
    },
    accountText: {
        fontFamily: fonts.primaryBold,
        fontSize: 18,
        color: colors.textLightBlack,
    },
    itemWrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: '2%',
    },
    itemIcon: {
        height: 30,
        width: 30,
    },
    valueWrapper: {
        flex: 1,
        marginLeft: '5%',
        height: 60,
        justifyContent: 'center',
        borderBottomWidth: .8,
        borderColor: colors.border
    },
    valueText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 16,
        color: colors.textLightBlack,
    }
})