import moment from 'moment'
import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    StyleSheet,
} from 'react-native'
import { Header } from '../../components/molecules'
import { colors, fonts, images } from '../../utils'
import { starMapping } from '../../utils/staticData'

export const Reviews = ({ navigation, route }) => {

    const {
        reviewData
    } = route?.params;

    return (
        <View style={styles.mainView}>
            <Header
                back
                title='Reviews'
            />

            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={reviewData}
                keyExtractor={(item, index) => `${index}_ReviewList`}
                renderItem={({ item, index }) =>
                    <View style={styles.itemWrapper}>
                        <Text style={styles.name}>
                            {item?.customerFirstName} {item?.customerLastName}
                        </Text>

                        <View style={styles.rateWrapper}>
                            {starMapping.map(it =>
                                <Image
                                    style={[styles.starIcon, {
                                        tintColor: item?.driverRating >= it ? colors.lightYellow : colors.itemBackground
                                    }]}
                                    source={images.icStar}
                                />
                            )}

                            <Image
                                style={styles.likeIcon}
                                source={images.icReviewLike}
                            />

                            <Text style={styles.recommend}>
                                Recommends Professional
                            </Text>
                        </View>

                        <Text style={[styles.recommend, {
                            marginVertical: '3%'
                        }]}>
                            {item?.customerComment}
                        </Text>

                        <View style={styles.bottomView}>
                            <View style={styles.bottomItem}>
                                <Image
                                    style={styles.bottomIcon}
                                    source={images.icReviewCalender}
                                />
                                <Text style={styles.bottomText}>
                                    {moment(item?.CSubAt).format('DD MMM YYYY')}
                                </Text>
                            </View>

                            {/* <View style={styles.bottomItem}>
                                <Image
                                    style={styles.bottomIcon}
                                    source={images.icReviewNav}
                                />
                                <Text style={styles.bottomText}>
                                    Lelystad
                                </Text>
                            </View>

                            <View style={styles.bottomItem}>
                                <Image
                                    style={styles.bottomIcon}
                                    source={images.icReviewUser}
                                />
                                <Text style={styles.bottomText}>
                                    Sandy Bouma
                                </Text>
                            </View> */}
                        </View>

                    </View>
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
        paddingBottom: '8%',
        paddingHorizontal: '5%'
    },
    itemWrapper: {
        width: '100%',
        marginTop: '7%'
    },
    name: {
        fontFamily: fonts.secondarySemibold,
        fontSize: 16,
        color: colors.black
    },
    rateWrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
    starIcon: {
        height: 12,
        width: 12,
        marginRight: 2
    },
    likeIcon: {
        height: 15,
        width: 15,
        marginHorizontal: 4
    },
    recommend: {
        fontFamily: fonts.secondaryRegular,
        fontSize: 13,
        color: colors.textGrey
    },
    bottomView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomItem: {
        flexDirection: 'row',
        width: '33%',
        alignItems: 'center'
    },
    bottomIcon: {
        height: 20,
        width: 20,
        marginRight: 5,
        resizeMode: 'contain'
    },
    bottomText: {
        fontFamily: fonts.secondaryRegular,
        fontSize: 13,
        color: colors.textGrey
    }
})