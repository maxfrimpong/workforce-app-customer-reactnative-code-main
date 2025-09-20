import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { colors, fonts, images } from '../../utils';


export const Header = ({
    title,
    back,
    menu,
    right,
    rightDouble,
    headerColor,
    fontSize,
    handleRightDoublePress,
    handleRightPress,
    borderRound,
    headerHeight,
    screen,
}) => {

    const navigation = useNavigation();


    return (
        <View style={[styles.superView, {
            backgroundColor: headerColor
                ? headerColor
                : borderRound
                    ? colors.primary
                    : colors.white,
            borderBottomLeftRadius: borderRound ? 15 : 0,
            borderBottomRightRadius: borderRound ? 15 : 0,
            height: headerHeight ?? 60,
        }]}>
            <View style={styles.mainView}>

                {/* left side management */}

                {back && <TouchableOpacity
                    onPress={() => screen
                        ? navigation.reset({
                            index: 0,
                            routes: [{ name: screen }],
                        })
                        : navigation.goBack()}
                    style={styles.HeaderLeft}>
                    <Image
                        style={styles.backIcon}
                        source={images.icBack}
                    />
                </TouchableOpacity>}

                {
                    menu && <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={styles.HeaderLeft}>
                        <Image
                            style={styles.menuIcon}
                            source={images.icMenuNav}
                        />
                    </TouchableOpacity>
                }

                {/* center Management */}
                <Text style={[styles.heading, {
                    fontSize: fontSize ? fontSize : 18,
                    color: borderRound ? colors.white : colors.textBlack,
                }]}>
                    {title}
                </Text>

                {/* Right Side Management */}
                {
                    rightDouble && <TouchableOpacity
                        onPress={handleRightDoublePress}
                        style={[styles.HeaderRight, {
                            right: 60
                        }]}>
                        <Image
                            style={styles.rightIcon}
                            source={images.icSettings}
                        />
                    </TouchableOpacity>
                }
                {
                    (right || rightDouble) && <TouchableOpacity
                        onPress={handleRightPress}
                        style={styles.HeaderRight}>
                        <Image
                            style={styles.rightEditIcon}
                            source={images.icSearch}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    superView: {

    },
    mainView: {
        minHeight: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    HeaderLeft: {
        height: 60,
        width: 60,
        position: 'absolute',
        left: 0,
        justifyContent: 'center',
        zIndex: 100,
        alignItems: 'center'
    },
    backIcon: {
        height: 60,
        width: 60,
        resizeMode: 'contain'
    },
    menuIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    heading: {
        fontFamily: fonts.primaryBold
    },
    HeaderRight: {
        height: 60,
        width: 60,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
        zIndex: 2,
    },
    rightIcon: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    },
    rightEditIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
})