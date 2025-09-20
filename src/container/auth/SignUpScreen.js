import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { apiConfig, colors, errorToast, fonts, screenName, validation } from '../../utils'
import { images } from '../../utils/images'
import { FieldInput, PhoneFieldInput } from '../../components/formComponents';
import { useForm } from 'react-hook-form'
import { Header } from '../../components/molecules/Header'
import { useDispatch } from 'react-redux'
import { sendOtpRequest } from '../../store/modules/sendOtp/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const SignUpScreen = ({ navigation }) => {

    /************************* Hooks Functions *************************/

    const dispatch = useDispatch()

    const { control,
        handleSubmit,
        errors,
    } = useForm({ mode: 'all' });

    const [countryData, setcountryData] = useState({
        phoneCode: '+233',
        flag: '🇬🇭',
    })

    const [termsAccepted, settermsAccepted] = useState(false)

    /********************** Form Functions *************************/

    const validateForm = () => {
        if (!termsAccepted) {
            errorToast('Please Accept the Terms & conditions.')
            return false
        } else {
            return true
        }
    }

    const onSubmit = async formValues => {
        if (validateForm()) {
            let data = formValues;
            const firebase = await AsyncStorage.getItem('fcmToken');
            data['firebaseToken'] = firebase
            data['countryCode'] = countryData?.phoneCode
            data['flow'] = 'register'
            data['isTermsAndConditionsAgreed'] = termsAccepted
            console.log('on submit press===>', data)
            const sendOtpData = {
                mobileNumber: data?.mobileNumber,
                countryCode: countryData?.phoneCode,
                email: data?.email
            }
            dispatch(sendOtpRequest(sendOtpData, data))
        }
    };

    return (
        <View style={styles.mainView}>

            <SafeAreaView style={{ backgroundColor: colors.primary }} />
            <Header
                title='Sign up'
            />
            <KeyboardAwareScrollView>

                <View style={styles.formWrapper}>

                    <Text style={styles.fieldHeading}>
                        First Name
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.name}
                        name='firstName'
                        msg={errors?.firstName?.message}
                        icon={images.icUser}
                    />

                    <Text style={styles.fieldHeading}>
                        Last Name
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.name}
                        name='lastName'
                        msg={errors?.lastName?.message}
                        icon={images.icUser}
                    />

                    <Text style={styles.fieldHeading}>
                        Email
                    </Text>
                    <FieldInput
                        type='email'
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.email}
                        name='email'
                        msg={errors?.email?.message}
                        icon={images.icMail}
                    />

                    <Text style={styles.fieldHeading}>
                        Password
                    </Text>
                    <FieldInput
                        type='password'
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.password}
                        name='password'
                        msg={errors?.password?.message}
                        icon={images.icLock}
                    />
                    <Text style={styles.fieldHeading}>
                        Mobile Number
                    </Text>
                    <PhoneFieldInput
                        control={control}
                        inputStyle={styles.inputStylePhone}
                        inputViewStyle={styles.inputViewStylePhone}
                        rules={validation.phone}
                        name='mobileNumber'
                        msg={errors?.mobileNumber?.message}
                        flagValue={countryData.flag}
                        countryCode={countryData.phoneCode}
                        onSelectCode={(phoneCode, flag) => setcountryData({ phoneCode, flag })}
                    />

                    <TouchableOpacity
                        onPress={() => settermsAccepted(!termsAccepted)}
                        style={styles.termWrapper}>
                        <Image
                            style={[styles.checkIcon, {
                                tintColor: termsAccepted ? colors.primary : colors.inputBackground
                            }]}
                            source={images.icCheckTerm}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.termText, {
                                color: colors.black
                            }]}>
                                {'I agree to all '}
                            </Text>
                            <Text
                                onPress={() => navigation.navigate(screenName.webViewScreen, {
                                    data: {
                                        name: 'Terms And Conditions',
                                        url: apiConfig.terms
                                    }
                                })}
                                style={styles.termText}>
                                Terms And Conditions
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={styles.buttonWrapper}>
                        <Image
                            style={styles.buttonImage}
                            source={images.icTick}
                        />
                    </TouchableOpacity>

                    <View style={styles.signUpWrapper}>
                        <Text style={styles.signUpText}>
                            Already Have An Account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate(screenName.login)}>
                            <Text style={[styles.signUpText, {
                                fontFamily: fonts.primaryBold,
                                marginLeft: 4,
                                color: colors.textBlack
                            }]}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAwareScrollView>

        </View >
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    bgImage: {
        height: '100%',
        width: '100%',
    },
    logoBanner: {
        height: 150,
        width: '40%',
        resizeMode: 'contain',
        marginTop: '5%',
        alignSelf: 'center'
    },
    formWrapper: {
        flex: 1,
        paddingTop: '10%',
        paddingHorizontal: '8%',
        alignItems: 'center'
    },
    fieldHeading: {
        fontSize: 14,
        fontFamily: fonts.primaryBold,
        color: colors.textBlack,
        alignSelf: 'flex-start',
        marginTop: '3%'
    },
    inputViewStyle: {
        width: '100%',
        borderColor: colors.border,
        borderWidth: .5,
        marginTop: '2%',
        marginBottom: '2%',
        paddingHorizontal: '5%',
        backgroundColor: colors.inputBackground,
        borderRadius: 10
    },
    inputStyle: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: colors.textGrey,
        padding: 0,
        paddingLeft: 10,
        width: '80%',
        height: 45,
    },
    inputViewStylePhone: {
        width: '100%',
        borderColor: colors.inputBorder,
        borderWidth: .5,
        marginTop: '2%',
        marginBottom: '2%',
        paddingHorizontal: '5%',
        backgroundColor: colors.inputBackground,
        borderRadius: 10
    },
    inputStylePhone: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        borderColor: colors.textGrey,
        width: '80%',
        height: 45,
        padding: 0
    },
    termText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: colors.primary,
    },
    buttonWrapper: {
        alignSelf: 'flex-end',
        marginVertical: '5%'
    },
    buttonImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    signUpWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    signUpText: {
        fontSize: 13,
        fontFamily: fonts.primaryRegular,
        color: colors.textLightGrey
    },
    termWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: '3%'
    },
    checkIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginRight: '2%'
    }
})