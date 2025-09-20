import moment from 'moment'
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { BottomButton } from '../../components/atoms'
import { CustomMap } from '../../components/molecules'
import { Header } from '../../components/molecules/Header'
import { colors, fonts, images, screenName } from '../../utils'

export const JobDetails = ({ navigation, route }) => {

    const [jobDetails, setJobDetails] = useState({})

    useEffect(() => {
        setJobDetails(route?.params?.item)
    }, [])

    return (
        <View style={styles.mainView}>
            <Header
                back
                title='Job Details'
            />

            <ScrollView contentContainerStyle={styles.contentContainerStyle}>

                <Text style={styles.fieldHeading}>
                    Request title
                </Text>
                <Text style={styles.titleDesc}>
                    {jobDetails?.title}
                </Text>

                <Text style={styles.fieldHeading}>
                    Request description
                </Text>
                <Text style={styles.requestDesc}>
                    {jobDetails?.description}
                </Text>

                <Text style={styles.fieldHeading}>
                    Service required
                </Text>
                <Text style={styles.requestDesc}>
                    {jobDetails?.service}
                </Text>

                <Text style={styles.fieldHeading}>
                    Date and time
                </Text>
                <View style={styles.dateTimeWrapper}>
                    <Image
                        style={styles.dateIcon}
                        source={images.icCalender}
                    />
                    <Text style={styles.dateTime}>
                        {moment(jobDetails?.tripCreatedAt).format('DD MMM YYYY, hh:mm A')}
                    </Text>
                </View>

                <CustomMap
                    location={{
                        name: jobDetails?.tripAddress,
                        location: {
                            latitude: jobDetails?.tripLocation?.coordinates[1] ?? 0.00,
                            longitude: jobDetails?.tripLocation?.coordinates[0] ?? 0.00
                        }
                    }}
                />

                <Text style={styles.fieldHeading}>
                    Location
                </Text>
                <View style={styles.dateTimeWrapper}>
                    <Image
                        style={styles.dateIcon}
                        source={images.icCurrentLocation}
                    />
                    <Text style={styles.dateTime}>
                        {jobDetails?.tripAddress}
                    </Text>
                </View>

                {jobDetails?.designImages && jobDetails?.designImages.length > 0
                    ? <>
                        <Text style={styles.fieldHeading}>
                            Design
                        </Text>

                        <View style={styles.designWrapper}>
                            {jobDetails?.designImages.map(item =>
                                <Image
                                    style={styles.designImage}
                                    source={{ uri: item }}
                                />
                            )}
                        </View></> : null
                }

                <BottomButton
                    onPress={() => navigation.navigate(screenName.tracking, { tripId: jobDetails?._id })}
                    name='View Tracking'
                    mainStyle={{
                        marginTop: '15%',
                        marginBottom: '5%'
                    }}
                />

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
        paddingVertical: '5%'
    },
    fieldHeading: {
        fontSize: 14,
        fontFamily: fonts.primaryBold,
        color: colors.textBlack,
        alignSelf: 'flex-start',
        marginTop: '3%',
    },
    titleDesc: {
        fontSize: 18,
        fontFamily: fonts.trenaryBold,
        color: colors.black,
        alignSelf: 'flex-start',
        marginTop: '3%',
    },
    requestDesc: {
        fontSize: 12,
        fontFamily: fonts.trenaryLight,
        color: colors.textGrey,
        alignSelf: 'flex-start',
        marginTop: '3%',
    },
    dateTimeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '3%'
    },
    dateIcon: {
        height: 23,
        width: 23,
        resizeMode: 'contain',
        marginRight: '3%'
    },
    dateTime: {
        fontSize: 13,
        fontFamily: fonts.trenaryMedium,
        color: colors.textGrey,
    },
    designWrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: '3%',
    },
    designImage: {
        height: 90,
        width: '30%',
        marginRight: 15,
        borderRadius: 8
    }
})