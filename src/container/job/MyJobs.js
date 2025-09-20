import moment from 'moment'
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { RetryButton } from '../../components/atoms'
import { Header } from '../../components/molecules/Header'
import { jobBidStart, jobDetailsStart, jobMatchedStart, jobPostedStart } from '../../store/modules/job/actions'
import { colors, fonts, images, myDeviceHeight, screenName, socketConfig, socketServices } from '../../utils'
import { jobTabs } from '../../utils/staticData'

export const MyJob = ({ navigation, route }) => {

    // ************** Hooks Functions ************** //

    const dispatch = useDispatch()

    const {
        jobPostData,
        bidsData,
        jobMatchedData,
        loading,
    } = useSelector(state => ({
        jobPostData: state.jobReducer.jobPostData,
        bidsData: state.jobReducer.bidsData,
        jobMatchedData: state.jobReducer.jobMatchedData,
        loading: state.loadingReducer.loading,
    }))

    const [activeTab, setactiveTab] = useState(0) // 0=Job Posted, 1=Bids, 2=JobMatched

    useEffect(() => {
        dispatch(jobPostedStart())
        // Socket Listener
        setTimeout(() => {
            socketServices.on(
                socketConfig.getOrderRequest,
                (data) => {
                    console.log('Request Socket response', data)
                    const fromSocket = true
                    dispatch(jobDetailsStart(data?.tripId, fromSocket))
                }
            )
        }, 3000)

    }, [])

    // ************** Main Functions *************** //

    const handleTabChange = tab => () => {
        setactiveTab(tab)
        tab === 0
            ? dispatch(jobPostedStart())
            : tab === 1
                ? dispatch(jobBidStart())
                : tab === 2
                    ? dispatch(jobMatchedStart())
                    : null
    }

    return (
        <View style={styles.mainView}>
            <Header
                menu
                borderRound
                title='My Jobs'
            />

            {/* Render Tabs View */}

            <View style={styles.tabsWrapper}>
                {jobTabs.map((item, index) =>
                    <TouchableOpacity
                        onPress={handleTabChange(index)}
                        style={[styles.tabWrapper, {
                            borderBottomWidth: activeTab === index ? 2 : 0,
                        }]}>
                        <Text style={[styles.tabTitle, {
                            color: activeTab === index ? colors.textBlack : colors.textGrey
                        }]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {loading ? null : <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={activeTab == 2
                    ? jobMatchedData
                    : activeTab == 1
                        ? bidsData
                        : jobPostData}
                keyExtractor={(item, index) => `${index}_jobsList`}
                renderItem={({ item, index }) =>
                    <View style={styles.itemWrapper}>
                        <Image
                            style={styles.itemImage}
                            source={images.dummyJobs}
                        />
                        <View style={styles.itemContent}>
                            <View style={styles.topView}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(screenName.jobDetails, { item })}
                                    style={styles.jobDetailsWrapper}
                                >
                                    <Text style={styles.jobDetailsText}>
                                        Job Detail
                                    </Text>
                                </TouchableOpacity>

                                <Text style={styles.bookingId}>
                                    BOOKING ID #{item?.customTripId}
                                </Text>
                            </View>

                            <Text style={styles.itemTitle}>
                                {item?.title}
                            </Text>

                            <View style={styles.itemDateWrapper}>
                                <Text style={styles.itemDate}>
                                    {moment(item?.tripCreatedAt).format('dddd, MMM Do')}
                                </Text>

                                {activeTab === 2 && <Text style={styles.jobMatched}>
                                    Job Matched
                                </Text>}
                            </View>

                            {activeTab < 2 && <Text
                                onPress={() => activeTab ? navigation.navigate(screenName.providers, { item }) : null}
                                style={styles.dynamicText}>
                                {activeTab ? `${item?.bidsPlacedCount} Professionals Reponded` : null}
                            </Text>}
                        </View>
                    </View>
                }
                ListEmptyComponent={() => <RetryButton
                    paddingTop={myDeviceHeight(30)}
                    hideButton
                />}
            />}

        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    tabsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        height: 50,
        alignItems: 'center'
    },
    tabWrapper: {
        paddingBottom: 5,
        borderColor: colors.textBlack
    },
    tabTitle: {
        fontFamily: fonts.secondarySemibold,
        fontSize: 16,
    },
    contentContainerStyle: {
        paddingHorizontal: '5%',
        paddingVertical: '5%',
    },
    itemWrapper: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: '5%',
        borderBottomWidth: .5,
        borderColor: colors.border
    },
    itemImage: {
        height: 80,
        width: 100,
        borderRadius: 10,
        marginRight: 5
    },
    itemContent: {
        flex: 1
    },
    topView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3%',
        justifyContent: 'space-between',
    },
    jobDetailsWrapper: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 30,
        backgroundColor: colors.primary
    },
    jobDetailsText: {
        fontFamily: fonts.secondaryBold,
        fontSize: 13,
        color: colors.white
    },
    bookingId: {
        fontFamily: fonts.secondaryRegular,
        fontSize: 13,
        color: colors.primary,
        maxWidth: '55%',
        paddingLeft: '3%',
        textAlign: 'right',
    },
    itemTitle: {
        fontFamily: fonts.secondaryMedium,
        fontSize: 17,
        color: colors.textDarkBlack,
        paddingHorizontal: '3%',
    },
    itemDateWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemDate: {
        fontFamily: fonts.secondaryRegular,
        fontSize: 13,
        color: colors.textGrey,
        paddingHorizontal: '3%'
    },
    jobMatched: {
        fontFamily: fonts.secondarySemibold,
        fontSize: 13,
        color: colors.primary,
        paddingHorizontal: '3%'
    },
    dynamicText: {
        fontFamily: fonts.secondaryMedium,
        fontSize: 14,
        color: colors.textDarkBlack,
        paddingHorizontal: '3%',
    }
})