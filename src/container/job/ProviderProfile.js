import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { Header } from '../../components/molecules/Header'
import { colors, fonts, images, screenName } from '../../utils'
import { starMapping } from '../../utils/staticData'

export const ProviderProfile = ({ navigation, route }) => {

    // ************** Hooks Functions ************* //

    const { provider, tripStatus, dummyName } = route?.params;
    console.log('Provider Data', provider)

    return (
        <View style={styles.mainView}>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <Header
                    borderRound
                    back
                    headerHeight={100}
                />

                <View style={{
                    top: -55,
                }}>
                    <Image
                        style={styles.profileImage}
                        source={provider?.driverRefId?.profileImage !== null
                            ? { uri: provider?.driverRefId?.profileImage }
                            : images.dummyCustom}
                    />

                    {tripStatus == 'completed' ? <Text style={styles.name}>
                        {provider?.driverRefId?.accountType == 'company'
                            ? `${provider?.driverRefId?.companyName}`
                            : `${provider?.driverRefId?.firstName} ${provider?.driverRefId?.lastName}`}
                    </Text> : <Text style={styles.name}>
                        {dummyName}
                    </Text>}

                    <View style={styles.contactWrapper}>
                        <Image
                            style={styles.contactIcon}
                            source={images.icLike}
                        />
                        <Text style={styles.contactText}>
                            5x recommender
                        </Text>
                    </View>
                    {tripStatus == 'completed' &&
                        <>
                            <View style={styles.contactWrapper}>
                                <Image
                                    style={styles.contactIcon}
                                    source={images.icRingCall}
                                />
                                <Text style={styles.contactText}>
                                    {provider?.driverRefId?.countryCode}  {provider?.driverRefId?.mobileNumber}
                                </Text>
                            </View>
                            <View style={styles.contactWrapper}>
                                <Image
                                    style={styles.contactIcon}
                                    source={images.icEnvelope}
                                />
                                <Text style={styles.contactText}>
                                    {provider?.driverRefId?.email}
                                </Text>
                            </View>
                        </>}
                    <View style={styles.contactWrapper}>
                        <Image
                            style={[styles.contactIcon, {
                                tintColor: colors.textGrey,
                                height: 20
                            }]}
                            source={images.icThemePin}
                        />
                        <Text style={styles.contactText}>
                            {provider?.driverRefId?.address}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(screenName.reviews, { reviewData: provider?.driverRefId?.driverReviews })}
                        style={styles.contactWrapper}>
                        <View style={{ flexDirection: 'row' }}>
                            {starMapping.map(item =>
                                <Image
                                    style={[styles.starIcon, {
                                        tintColor: provider?.driverRefId?.avgRating >= item ? colors.lightYellow : colors.border,
                                    }]}
                                    source={images.icStar}
                                />
                            )}
                        </View>
                        <Text style={styles.contactText}>
                            {provider?.driverRefId?.reviewCount} Reviews
                        </Text>
                    </TouchableOpacity>

                    {/* <Text style={styles.activity}>
                        Active within 1 km of Amesfoort
                    </Text> */}

                    <View style={styles.jobInfoWrapper}>

                        <View style={[styles.jobInfoItem, {
                            borderRightWidth: .5
                        }]}>
                            <Text style={styles.jobInfoTitle}>
                                $10
                            </Text>
                            <Text style={styles.jobInfoDesc}>
                                / hour
                            </Text>
                        </View>

                        <View style={styles.jobInfoItem}>
                            <Text style={styles.jobInfoTitle}>
                                {provider?.driverRefId?.jobsMatched ?? 0}
                            </Text>
                            <Text style={styles.jobInfoDesc}>
                                Jobs Matched
                            </Text>
                        </View>

                    </View>

                    <Text style={styles.fieldHeading}>
                        Good to know
                    </Text>

                    {provider?.driverRefId?.accountType == "individual"
                        ? <><Text style={styles.fieldDesc}>
                            {`Total experience: ${provider?.driverRefId?.experience} year(s)`}
                        </Text>
                            <Text style={styles.fieldDesc}>
                                {`Known languages: ${provider?.driverRefId?.languages.toString()}`}
                            </Text></>
                        : <><Text style={styles.fieldDesc}>
                            {`Total experience: ${provider?.driverRefId?.experience} year(s)`}
                        </Text></>}

                    <Text style={styles.fieldHeading}>
                        Professions
                    </Text>

                    <Text style={styles.fieldDesc}>
                        {provider?.driverRefId?.tradeArea.toString()}
                    </Text>

                    <Text style={styles.fieldHeading}>
                        About
                    </Text>

                    {provider?.driverRefId?.portFolioDescription ? <Text style={styles.fieldDesc}>
                        {provider?.driverRefId?.portFolioDescription}
                    </Text> : null}

                    {provider?.driverRefId?.portFolioImages.map(item => <Image
                        style={styles.bottomImage}
                        source={{ uri: item }}
                    />)}

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
        backgroundColor: colors.white
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 5,
        alignSelf: 'center',
    },
    name: {
        fontFamily: fonts.secondaryMedium,
        fontSize: 22,
        color: colors.textDarkBlack,
        alignSelf: 'center',
        marginVertical: '2%'
    },
    contactWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 3
    },
    contactIcon: {
        height: 15,
        width: 15,
        marginRight: 8
    },
    contactText: {
        fontFamily: fonts.secondaryLight,
        fontSize: 13,
        color: colors.textGrey,
    },
    starIcon: {
        height: 12,
        width: 12,
        marginRight: 5
    },
    activity: {
        fontFamily: fonts.primaryBold,
        fontSize: 13,
        color: colors.textGrey,
        alignSelf: 'center',
        marginTop: 3
    },
    jobInfoWrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingVertical: '3%',
        borderBottomWidth: .5,
        borderTopWidth: .5,
        borderColor: colors.border,
        marginTop: '8%'
    },
    jobInfoItem: {
        width: '50%',
        alignItems: 'center',
        borderColor: colors.border
    },
    jobInfoTitle: {
        fontFamily: fonts.secondaryMedium,
        fontSize: 22,
        color: colors.textDarkBlack,
    },
    jobInfoDesc: {
        fontFamily: fonts.secondaryLight,
        fontSize: 13,
        color: colors.textGrey,
    },
    fieldHeading: {
        fontFamily: fonts.secondaryMedium,
        fontSize: 22,
        color: colors.textDarkBlack,
        marginTop: '5%',
        paddingHorizontal: '8%'
    },
    fieldDesc: {
        fontFamily: fonts.secondaryLight,
        fontSize: 13,
        color: colors.textGrey,
        marginTop: '1%',
        paddingHorizontal: '8%'
    },
    bottomImage: {
        width: '85%',
        height: 130,
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: '4%',
    }
});