import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ImageBackground,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import { BottomButton } from '../../components/atoms/BottomButton'
import { FieldInput } from '../../components/formComponents'
import { Header } from '../../components/molecules'
import { rateStart } from '../../store/modules/job/actions'
import { colors, fonts, images, myDeviceHeight, myDeviceWidth, screenName, validation } from '../../utils'
import { starMapping } from '../../utils/staticData'

export const RateService = ({ navigation, route }) => {

    // ****** Hooks Functions ****** //

    const { tripId } = route?.params;

    const dispatch = useDispatch()

    const [driverRating, setDriverRating] = useState(1)

    const { control,
        handleSubmit,
        errors,
    } = useForm({ mode: 'all' });

    /********************** Form Functions *************************/

    const onSubmit = async formValues => {
        console.log('on submit press===>', formValues)
        const payload = {
            ...formValues,
            driverRating,
            tripId,
        }
        dispatch(rateStart(payload))
    };


    return (
        <View style={styles.mainView}>
            <Header
                back
                title='Rating & Review'
            />
            <ImageBackground
                style={styles.screenBg}
                source={images.bgRate}
                resizeMode='contain'

            >

                <KeyboardAwareScrollView
                    contentContainerStyle={styles.contentContainerStyle}
                >
                    <Image
                        style={styles.doneIcon}
                        source={images.icDone}
                    />

                    <Text style={styles.textTy}>
                        Thank You
                    </Text>

                    <View style={styles.ratingWrapper}>
                        {starMapping.map(item =>
                            <TouchableOpacity
                                onPress={() => setDriverRating(item)}
                            >
                                <Image
                                    style={[styles.starIcon, {
                                        marginRight: item === 5 ? 0 : 5,
                                        tintColor: item <= driverRating ? colors.primary : colors.border
                                    }]}
                                    source={images.icStar}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    <FieldInput
                        control={control}
                        mainViewStyle={{ width: '80%', alignSelf: 'center' }}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.required}
                        name='customerComment'
                        msg={errors?.customerComment?.message}
                        placeholder='Write Your Review...'
                    />

                    <View style={styles.buttonWrapper}>
                        <BottomButton
                            onPress={handleSubmit(onSubmit)}
                            name='Submit'
                        />
                        <BottomButton
                            name='Need Help ?'
                            mainStyle={{
                                backgroundColor: colors.bgButton,
                                marginTop: '3%'
                            }}
                            nameColor={colors.textDarkBlack}
                        />
                    </View>

                </KeyboardAwareScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    screenBg: {
        width: myDeviceWidth(100),
        height: myDeviceHeight(80),
    },
    contentContainerStyle: {
        paddingHorizontal: '5%',
        paddingVertical: '5%',
    },
    doneIcon: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        marginTop: '15%'
    },
    textTy: {
        fontFamily: fonts.primaryBold,
        fontSize: 20,
        color: colors.textBlack,
        marginTop: '5%',
        alignSelf: 'center'
    },
    ratingWrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: '5%'
    },
    starIcon: {
        height: 25,
        width: 25,
    },
    inputStyle: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: colors.textGrey,
        padding: 0,
        width: '100%',
    },
    inputViewStyle: {
        width: '100%',
        borderColor: colors.inputBorder,
        borderWidth: .5,
        marginTop: '5%',
        marginBottom: '2%',
        paddingHorizontal: '5%',
        backgroundColor: colors.inputBackground,
        borderRadius: 10,
        paddingVertical: '3%',
        alignSelf: 'center',
        height: 100,
        alignItems: 'flex-start'
    },
    buttonWrapper: {
        width: '70%',
        alignSelf: 'center',
        marginTop: '5%'
    }
})