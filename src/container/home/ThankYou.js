import React, { useState, useEffect } from 'react'
import {
    Dimensions,
    ScrollView,
    Text,
    Image,
    View,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
} from 'react-native'
import { BottomButton } from '../../components/atoms/BottomButton';
import { screenName } from '../../utils';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { images } from '../../utils/images';

const { height, width } = Dimensions.get('window');

export const ThankYou = ({ navigation, route }) => {

    const { params } = route

    return (
        <View style={styles.mainView}>

            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <Image
                    style={styles.imageBanner}
                    source={images.icTY}
                />
                <Text style={styles.thankYou}>
                    Thank You
                </Text>

                <Text style={styles.descText}>
                    {params?.jobFlow
                        ? `Your Request has been successfully placed with us`
                        : `Your Request has been successfully placed with us. Waiting for Admin's Approval.`
                    }
                </Text>

                <BottomButton
                    name={params?.jobFlow ? `Track` : 'Back To Home'}
                    mainStyle={{ marginTop: 20 }}
                    onPress={() => navigation.navigate(params?.jobFlow ? screenName.tracking : screenName.homeScreen,
                        params?.jobFlow ? { tripId: params?.payload?.tripId } : null)}
                />
                {params?.jobFlow && <BottomButton
                    name='Back To Home'
                    mainStyle={{
                        marginTop: 20,
                        backgroundColor: colors.itemBackground
                    }}
                    nameColor={colors.textDarkBlack}
                    onPress={() => navigation.navigate(screenName.mainHome)}
                />}
            </ScrollView>
        </View>
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
    contentContainerStyle: {
        paddingHorizontal: '8%',
        height: height / 1.18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBanner: {
        height: 200,
        width: 200,
        resizeMode: 'contain',
        marginBottom: 10,
        marginLeft: -30
    },
    thankYou: {
        fontFamily: fonts.primaryBold,
        fontSize: 30,
        color: colors.textBlack,
        marginVertical: '5%'
    },
    descText: {
        fontFamily: fonts.trenaryLight,
        fontSize: 15,
        color: colors.textBlack,
        textAlign: 'center',
        paddingHorizontal: '5%'
    }
})