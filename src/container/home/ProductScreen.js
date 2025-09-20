import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { colors, fonts, images, screenName } from '../../utils'

export const ProductScreen = ({ navigation, route }) => {

    // ****** Hooks Functions ****** //

    const [activeTab, setactiveTab] = useState('INSTANT')

    return (
        <View style={styles.mainView}>
            {/* Render Header */}

            <View style={styles.headerView}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.HeaderLeft}>
                    <Image
                        style={styles.backIcon}
                        source={images.icBack}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate(screenName.tabCart)}
                >
                    <Image
                        style={styles.backIcon}
                        source={images.icCartCount}
                    />
                </TouchableOpacity>

            </View>

            {/* Remder Content View */}

            <ScrollView>

                {/* Product Info */}

                <View style={styles.productInfo}>
                    <View style={{ width: '75%' }}>
                        <Text style={styles.productName}>
                            JACK DANIELS
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image
                                style={styles.starIcon}
                                source={images.icDarkStar}
                            />
                            <Text style={styles.rate}>
                                4.9
                            </Text>
                            <Text style={styles.review}>
                                (2540 Reviews)
                            </Text>
                        </View>

                        {/* Qty data */}
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: '5%'
                        }}>
                            {
                                ['1.75 L', '1.00 L',
                                    '750ml', '375ml',
                                    '200ml', '150ml'].map((item, index) =>
                                        <TouchableOpacity
                                            style={[styles.qtyItem, {
                                                borderColor: index === 0 ? colors.primary : colors.border,
                                                borderWidth: 1,
                                                borderBottomWidth: index === 0 ? 1 : 0,
                                                borderTopWidth: index > 2 || index === 0 ? 1 : 0,
                                                borderRightWidth: (index + 1) % 3 === 0 ? 0 : 1,
                                                borderLeftWidth: index === 0 ? 1 : (index + 1) % 3 === 1 ? 0 : 1
                                            }]}
                                        >
                                            <Text style={[styles.qtyText, {
                                                fontFamily: index === 0 ? fonts.primaryBold : fonts.primaryRegular,
                                            }]}>
                                                {`${item} Bottle`}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                            }
                        </View>

                    </View>

                    <Image
                        style={styles.productImage}
                        source={images.dummyProduct}
                    />

                </View>

                {/* Tabs Content */}

                <View style={styles.tabWrapper}>
                    {['INSTANT', 'SCHEDULE', 'SHIPPING'].map(item =>
                        <TouchableOpacity
                            onPress={() => setactiveTab(item)}
                            style={[styles.tabItem, {
                                borderBottomWidth: activeTab === item ? 1 : 0
                            }]}
                        >
                            <Text style={styles.tabText}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                {[{}, {}, {}].map((item, index) =>
                    <TouchableOpacity style={[styles.itemWrapper, {
                        borderWidth: index === 0 ? 1 : 0,
                        borderBottomWidth: 1,
                        borderColor: index === 0 ? colors.primary : colors.border
                    }]}>
                        <View style={[styles.radioOut, {
                            borderWidth: index === 0 ? 2 : 1
                        }]}>
                            {index === 0 && <View
                                style={styles.radioIn}
                            />}
                        </View>

                        <View style={styles.itemContent}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Text style={styles.itemPrice}>
                                    $ 15.25
                                </Text>
                                <Text style={styles.itemStore}>
                                    Sold By Goody Goody Store29 - Irving
                                </Text>
                            </View>

                            <Text style={styles.itemStoreType}>
                                Liquor Store | Convenience Store
                            </Text>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 5,
                                justifyContent: 'space-between'
                            }}>
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>

                                        <View style={styles.ratingWrapper}>
                                            <Image
                                                style={[styles.starIcon, {
                                                    tintColor: colors.white,
                                                    marginRight: 5
                                                }]}
                                                source={images.icDarkStar}
                                            />
                                            <Text style={styles.itemRating}>
                                                4.5
                                            </Text>
                                        </View>

                                        <Image
                                            style={styles.clockIcon}
                                            source={images.icClock}
                                        />
                                        <Text style={styles.time}>
                                            Today, 11am - 1pm
                                        </Text>
                                    </View>

                                    <Text style={styles.deliveryCharge}>
                                        $25.50 Minimum | $4.25 Delivery
                                    </Text>

                                </View>

                                <View style={[styles.itemQtyWrapper, {
                                    backgroundColor: index === 0 ? colors.primary : colors.border
                                }]}>
                                    <TouchableOpacity style={styles.itemQtyBtn}>
                                        <Text style={styles.itemQtyText}>
                                            -
                                        </Text>
                                    </TouchableOpacity>

                                    <View style={styles.itemQtyBtn}>
                                        <Text style={styles.itemQtyText}>
                                            1
                                        </Text>
                                    </View>

                                    <TouchableOpacity style={styles.itemQtyBtn}>
                                        <Text style={styles.itemQtyText}>
                                            +
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {activeTab === 'INSTANT' &&
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 5
                                }}>
                                    <Image
                                        style={styles.timerIcon}
                                        source={images.icTimer}
                                    />
                                    <Text style={styles.deliveryCharge}>
                                        ETA 30 Min
                                    </Text>
                                </View>
                            }

                            {
                                activeTab === 'SCHEDULE' &&
                                <View style={styles.lineBar} />
                            }

                            {activeTab === 'SCHEDULE' && <View>
                                <Text style={styles.scheduleTitle}>
                                    Schedule Order
                                </Text>


                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 5
                                        }}
                                    >
                                        <Image
                                            style={styles.scheduleItemImage}
                                            source={images.icDate}
                                        />
                                        <Text
                                            style={styles.scheduleItemTitle}
                                        >
                                            Date
                                        </Text>
                                        <Text
                                            style={styles.scheduleItemValue}
                                        >
                                            01/09/2021
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 5
                                        }}
                                    >
                                        <Image
                                            style={styles.scheduleItemImage}
                                            source={images.icTime}
                                        />
                                        <Text
                                            style={styles.scheduleItemTitle}
                                        >
                                            Time
                                        </Text>
                                        <Text
                                            style={styles.scheduleItemValue}
                                        >
                                            05:25PM
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            }
                        </View>
                    </TouchableOpacity>
                )}

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    headerView: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        backgroundColor: colors.primary
    },
    backIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    productInfo: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        width: '100%'
    },
    productName: {
        fontSize: 18,
        fontFamily: fonts.primaryBold,
        color: colors.textBlack
    },
    starIcon: {
        height: 12,
        width: 12,
        resizeMode: 'contain',
        marginRight: '3%'
    },
    rate: {
        fontSize: 16,
        fontFamily: fonts.primaryRegular,
        color: colors.textBlack,
        textDecorationLine: 'underline',
        marginHorizontal: 2
    },
    review: {
        fontSize: 14,
        fontFamily: fonts.primaryRegular,
        color: colors.textLightBlack,
    },
    productImage: {
        height: 180,
        width: '25%',
        resizeMode: 'contain',
    },
    qtyItem: {
        width: 70,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    qtyText: {
        fontSize: 14,
        color: colors.textBlack,
    },
    tabWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.itemBackground,
        height: 50,
        justifyContent: 'space-evenly'
    },
    tabItem: {
        paddingVertical: 4,
        paddingHorizontal: '3%',
        borderColor: colors.primary
    },
    tabText: {
        fontSize: 15,
        color: colors.textBlack,
        fontFamily: fonts.primaryBold
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        marginTop: 2
    },
    radioOut: {
        height: 20,
        width: 20,
        borderColor: colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    radioIn: {
        height: 12,
        width: 12,
        backgroundColor: colors.primary,
        borderRadius: 6,
    },
    itemContent: {
        flex: 1,
    },
    itemPrice: {
        fontFamily: fonts.primaryBold,
        fontSize: 15,
        color: colors.textBlack,
        marginRight: 5
    },
    itemStore: {
        fontFamily: fonts.primaryLight,
        fontSize: 12,
        color: colors.textGrey,
    },
    itemStoreType: {
        fontFamily: fonts.primaryLight,
        fontSize: 14,
        color: colors.primary,
    },
    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 5,
        backgroundColor: colors.textBlack
    },
    itemRating: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: colors.white,
    },
    clockIcon: {
        height: 20,
        width: 20,
        marginHorizontal: '4%'
    },
    time: {
        fontSize: 12,
        fontFamily: fonts.primaryRegular,
        color: colors.textGrey
    },
    deliveryCharge: {
        fontFamily: fonts.primaryRegular,
        fontSize: 13,
        color: colors.textGrey,
        marginTop: 5,
    },
    itemQtyWrapper: {
        height: 30,
        width: 70,
        borderRadius: 15,
        flexDirection: 'row'
    },
    itemQtyBtn: {
        height: '100%',
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemQtyText: {
        fontFamily: fonts.primaryBold,
        fontSize: 15,
        color: colors.white,
    },
    lineBar: {
        width: '80%',
        height: 1,
        backgroundColor: colors.border,
        marginTop: 8
    },
    timerIcon: {
        height: 23,
        width: 23,
        resizeMode: 'contain',
        marginRight: 5
    },
    scheduleTitle: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: fonts.primaryRegular,
        color: colors.textLightBlack
    },
    scheduleItemTitle: {
        fontFamily: fonts.primaryBold,
        fontSize: 15,
        color: colors.textLightBlack,
        marginHorizontal: 4
    },
    scheduleItemValue: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: colors.textGrey,
        textDecorationLine: 'underline'
    },
    scheduleItemImage: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    }
})