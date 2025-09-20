import React, { useState, useEffect } from 'react'
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    View,
} from 'react-native'

export const RoundButton = ({
    icon,
    mainstyles,
    iconStyles,
    ...props
}) => {
    return (
        <TouchableOpacity
            style={{
                alignSelf: 'flex-end',
                marginVertical: 20,
                ...mainstyles
            }}
            {...props}
        >
            <Image
                style={{
                    height: 55,
                    width: 55,
                    resizeMode: 'contain',
                    ...iconStyles
                }}
                source={icon}
            />
        </TouchableOpacity>
    )
}
