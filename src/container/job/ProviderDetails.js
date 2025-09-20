import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { BottomButton } from '../../components/atoms/BottomButton'
import { Header } from '../../components/molecules'
import { acceptRequestStart } from '../../store/modules/job/actions'
import { colors, fonts, images, screenName } from '../../utils'

export const ProviderDetails = ({ navigation, route }) => {

    // ************** Hooks Functions ************* //

    const { item, tripId, tripStatus, dummyName } = route?.params;

    const dispatch = useDispatch()

    // ************** Main Functions ************** //

    const handleAcceptRequest = () => {
        dispatch(acceptRequestStart({
            tripId,
            "bidId": item?._id,
            "driverId": item?.driverId
        }))
    }

    return (
        <View style={styles.mainView}>
            <Header
                back
                borderRound
                title='Service Provider'
            />
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.topWrapper}>
                    <Image
                        style={styles.topImage}
                        source={item?.driverRefId?.profileImage !== null
                            ? { uri: item?.driverRefId?.profileImage }
                            : images.dummyCustom}
                    />
                    <Text style={styles.artist}>
                        {dummyName}
                        {/* {item?.driverRefId?.accountType == 'company'
                            ? `${item?.driverRefId?.companyName}`
                            : `${item?.driverRefId?.firstName} ${item?.driverRefId?.lastName}`} */}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(screenName.providerProfile, {
                            provider: item,
                            tripStatus,
                            dummyName
                        })}
                        style={styles.viewButton}>
                        <Text style={styles.viewText}>
                            View Profile
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.priceView}>
                    <Text style={styles.priceTitle}>
                        Estimated Cost Of Labour
                    </Text>

                    <Text style={styles.priceText}>
                        ${item?.estimatedCost}
                    </Text>
                </View>

                <View style={styles.priceView}>
                    <View style={styles.timeItem}>
                        <Text style={styles.timeTitle}>
                            From
                        </Text>
                        <View style={styles.timeWrapper}>
                            <Image
                                style={styles.timeIcon}
                                source={images.icCalender}
                            />
                            <Text style={styles.timeText}>
                                {item?.fromDate}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.timeItem}>
                        <Text style={styles.timeTitle}>
                            To
                        </Text>
                        <View style={styles.timeWrapper}>
                            <Image
                                style={styles.timeIcon}
                                source={images.icCalender}
                            />
                            <Text style={styles.timeText}>
                                {item?.toDate}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* <Text style={styles.infoTitle}>
                    Additional Information
                </Text>

                <Text style={styles.desc}>
                    {item?.additionalInfo}
                </Text> */}

            </ScrollView>

            {tripStatus !== "bidAcceptedByCustomer" && <View style={styles.floatingWrapper}>
                <BottomButton
                    onPress={handleAcceptRequest}
                    name='Accept Request'
                />
            </View>}

        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentContainerStyle: {

    },
    topWrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        borderBottomWidth: 2,
        borderColor: colors.border
    },
    topImage: {
        height: 40,
        width: 50,
        borderRadius: 10,
        marginRight: 12
    },
    artist: {
        fontFamily: fonts.secondarySemibold,
        fontSize: 17,
        color: colors.black,
        width: '50%'
    },
    viewButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: colors.primary,
        borderRadius: 20
    },
    viewText: {
        fontFamily: fonts.primaryMedium,
        fontSize: 14,
        color: colors.white,
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5%',
        paddingHorizontal: '8%',
        width: '100%',
        justifyContent: 'space-between'
    },
    priceTitle: {
        fontFamily: fonts.secondarySemibold,
        fontSize: 16,
        color: colors.textDarkBlack,
    },
    priceText: {
        fontFamily: fonts.secondaryBold,
        fontSize: 16,
        color: colors.textDarkBlack,
    },
    timeItem: {
        width: '47%'
    },
    timeTitle: {
        fontFamily: fonts.primaryBold,
        fontSize: 12,
        color: colors.textBlack,
    },
    timeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5%'
    },
    timeIcon: {
        height: 20,
        width: 20,
        marginRight: 5
    },
    timeText: {
        fontFamily: fonts.trenaryMedium,
        fontSize: 13,
        color: colors.textGrey,
    },
    infoTitle: {
        fontFamily: fonts.secondarySemibold,
        fontSize: 18,
        color: colors.textDarkBlack,
        paddingHorizontal: '8%',
        marginTop: '5%'
    },
    desc: {
        fontFamily: fonts.secondaryLight,
        fontSize: 13,
        color: colors.textGrey,
        paddingHorizontal: '8%',
        marginTop: '3%'
    },
    floatingWrapper: {
        paddingHorizontal: '5%',
        marginBottom: '15%'
    }
})