import moment from 'moment'
import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Linking
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { BottomButton } from '../../components/atoms'
import { Header } from '../../components/molecules/Header'
import { jobDetailsStart } from '../../store/modules/job/actions'
import { colors, fonts, images, myDeviceWidth, screenName } from '../../utils'

export const Tracking = ({ navigation, route }) => {

    // ************* Hooks Functions **************** //

    const { tripId } = route?.params;

    const dispatch = useDispatch()

    const {
        jobDetails,
    } = useSelector(state => ({
        jobDetails: state.jobReducer.jobDetails,
    }))

    console.log('Track console', jobDetails)

    useEffect(() => {
        dispatch(jobDetailsStart(tripId, false))
    }, [])


    return (
        <View style={styles.mainView}>
            <Header
                back
                title='Tracking'
            />
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>

                <View style={styles.titleWrapper}>
                    <Text style={styles.titleHeading}>
                        {jobDetails?.title}
                    </Text>
                    <Text style={styles.bookingText}>
                        BOOKING ID #{jobDetails?.customTripId}
                    </Text>
                </View>

                <View style={styles.locationWrapper}>
                    <Image
                        style={styles.locImage}
                        source={images.icThemePin}
                    />
                    <Text style={styles.locationText}>
                        {jobDetails?.tripAddress}
                    </Text>
                </View>

                {jobDetails?.completedAt && <View style={styles.contactWrapper}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(`tel:${jobDetails?.driverRefId?.countryCode}${jobDetails?.driverRefId?.mobileNumber}`)}
                    >
                        <Image
                            style={styles.contactImage}
                            source={images.icCall}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(screenName.chat, {
                            driverId: jobDetails?.driverId,
                            tripId: tripId
                        })}
                    >
                        <Image
                            style={styles.contactImage}
                            source={images.icChat}
                        />
                    </TouchableOpacity>
                </View>}

                {/* Render Profile View */}

                {jobDetails?.completedAt && <TouchableOpacity
                    activeOpacity={.7}
                    onPress={() => navigation.navigate(screenName.providerProfile, {
                        tripStatus: jobDetails?.tripStatus,
                        provider: jobDetails,
                        dummyName: ''
                    })}
                    style={styles.profileWrapper}>
                    <Image
                        style={styles.profileImage}
                        source={jobDetails?.driverRefId?.profileImage
                            ? { uri: jobDetails?.driverRefId?.profileImage }
                            : images.dummyCustom}
                    />
                    <View>
                        <View style={styles.profileTop}>
                            <Text
                                numberOfLines={2}
                                style={styles.name}>
                                {jobDetails?.driverRefId?.accountType === "company"
                                    ? `${jobDetails?.driverRefId?.companyName}`
                                    : `${jobDetails?.driverRefId?.firstName} ${jobDetails?.driverRefId?.lastName} `}
                            </Text>
                            <Text
                                numberOfLines={2}
                                style={styles.work}>
                                {jobDetails?.driverRefId?.tradeArea.toString()}
                            </Text>
                        </View>
                        <View style={styles.profileBottom}>
                            <Text style={styles.xp}>
                                {jobDetails?.driverRefId?.experience} year Exp.
                            </Text>

                            <View style={styles.ratingWrapper}>
                                <Image
                                    style={styles.ratingIcon}
                                    source={images.icStar}
                                />
                                <Text style={styles.ratingText}>
                                    {jobDetails?.driverRefId?.avgRating}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>}

                {/* Render Tracking View */}

                <View style={styles.statusWrapper}>
                    <View style={styles.progressWrapper}>
                        <View style={[styles.progressCircle, {
                            backgroundColor: jobDetails?.tripApprovedAt ? colors.primary : colors.circleBorder,
                        }]} />
                        <View style={styles.progressLine} />
                    </View>
                    <View style={styles.reportWrapper}>
                        <Text style={styles.reportHeading}>
                            Confirm
                        </Text>
                        {jobDetails?.tripApprovedAt && <Text style={styles.reportDate}>
                            {moment(jobDetails?.tripApprovedAt).format('HH:mm DD/MM/YYYY')}
                        </Text>}
                    </View>
                </View>
                <View style={styles.statusWrapper}>
                    <View style={styles.progressWrapper}>
                        <View style={[styles.progressCircle, {
                            backgroundColor: jobDetails?.bidAcceptedByCustomerAt ? colors.primary : colors.circleBorder
                        }]} />
                        <View style={styles.progressLine} />
                    </View>
                    <View style={styles.reportWrapper}>
                        <Text style={styles.reportHeading}>
                            Bid Accepted
                        </Text>
                        {jobDetails?.bidAcceptedByCustomerAt && <Text style={styles.reportDate}>
                            {moment(jobDetails?.bidAcceptedByCustomerAt).format('HH:mm DD/MM/YYYY')}
                        </Text>}
                    </View>
                </View>
                <View style={styles.statusWrapper}>
                    <View style={styles.progressWrapper}>
                        <View style={[styles.progressCircle, {
                            backgroundColor: jobDetails?.completedAt ? colors.primary : colors.circleBorder
                        }]} />
                    </View>
                    <View style={styles.reportWrapper}>
                        <Text style={styles.reportHeading}>
                            Matched
                        </Text>
                        {jobDetails?.completedAt && <Text style={styles.reportDate}>
                            {moment(jobDetails?.completedAt).format('HH:mm DD/MM/YYYY')}
                        </Text>}
                    </View>
                </View>

                {(jobDetails?.tripStatus == 'completed' && jobDetails?.review?.driverRating === 0) && <BottomButton
                    onPress={() => navigation.navigate(screenName.rateService, {
                        tripId: jobDetails?._id
                    })}
                    name='Rate & Review'
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
    contentContainerStyle: {
        paddingHorizontal: '5%',
        paddingVertical: '5%'
    },
    titleWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleHeading: {
        fontFamily: fonts.secondarySemibold,
        fontSize: 21,
        color: colors.black
    },
    bookingText: {
        fontFamily: fonts.secondaryRegular,
        fontSize: 12,
        color: colors.primary
    },
    locationWrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingBottom: 10
    },
    locImage: {
        height: 17,
        width: 17,
        resizeMode: 'contain',
        marginRight: 5
    },
    locationText: {
        fontFamily: fonts.secondaryRegular,
        fontSize: 15,
        color: colors.textGrey
    },
    contactWrapper: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignContent: 'center',
        marginTop: '3%'
    },
    contactImage: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
        marginLeft: 10
    },
    profileWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: '3%',
        marginBottom: '10%'
    },
    profileImage: {
        height: 80,
        width: 100,
        borderRadius: 15,
        marginRight: 10
    },
    profileTop: {
        flexDirection: 'row',
        width: myDeviceWidth(65),
    },
    name: {
        fontFamily: fonts.secondaryBold,
        fontSize: 14,
        color: colors.black,
        maxWidth: '50%'
    },
    work: {
        fontFamily: fonts.secondaryRegular,
        fontSize: 14,
        color: colors.black,
        maxWidth: '50%'
    },
    profileBottom: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'flex-end'
    },
    xp: {
        fontFamily: fonts.secondaryMedium,
        fontSize: 15,
        color: colors.textBlack
    },
    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8
    },
    ratingIcon: {
        width: 13,
        height: 13,
        marginRight: 5,
        tintColor: colors.yellow
    },
    ratingText: {
        fontFamily: fonts.secondaryMedium,
        fontSize: 15,
        color: colors.yellow
    },
    statusWrapper: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: '3%',
        height: 100
    },
    progressWrapper: {
        alignItems: 'center',
    },
    progressCircle: {
        height: 25,
        width: 25,
        borderRadius: 12.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    progressLine: {
        flex: 1,
        width: 1,
        backgroundColor: colors.circleBorder
    },
    reportWrapper: {
        marginLeft: '6%'
    },
    reportHeading: {
        fontFamily: fonts.secondarySemibold,
        fontSize: 16,
        color: colors.black
    },
    reportDate: {
        fontFamily: fonts.secondaryRegular,
        fontSize: 14,
        color: colors.textGrey
    }
})