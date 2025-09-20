import React, { useState, useEffect, Fragment } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    FlatList
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../../components/molecules'
import { getAllServicesListStart } from '../../store/modules/home/actions'
import { colors, fonts, images, screenName } from '../../utils'


export const SubCategory = ({ navigation, route }) => {

    // ************* Hooks Functions **************** //

    const { params } = route;

    const dispatch = useDispatch()

    const allServicesList = useSelector(state => state?.homeReducer?.allServicesList)

    const [subCategoryData, setSubCategoryData] = useState({
        showSearchBar: false,
        inputValue: ''
    })

    useEffect(() => {
        dispatch(getAllServicesListStart(params, navigation))
        return () => {

        }
    }, [])

    // ************* Main Functions *************** //

    const handleSearchBarVisibility = showSearchBar => {
        setSubCategoryData(data => ({
            ...data,
            showSearchBar
        }))
    }

    return (
        <View style={styles.mainView}>
            {/* Render Header */}
            <Header
                borderRound
                back
                title='Sub Category'
                right
                handleRightPress={() => handleSearchBarVisibility(true)}
            />

            {subCategoryData?.showSearchBar && <View style={styles.searchBarWrapper}>
                <TextInput
                    style={styles.searchBarStyle}
                    placeholder='Search here...'
                    value={subCategoryData?.inputValue}
                    onChangeText={inputValue => setSubCategoryData(data => ({
                        ...data,
                        inputValue
                    }))}
                />
            </View>}

            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={subCategoryData?.inputValue == ''
                    ? allServicesList
                    : allServicesList.filter(item => item?.subcatName.toLowerCase().search(subCategoryData?.inputValue.toLowerCase()) !== -1)}
                keyExtractor={(item, index) => `${index}_subCategoryList`}
                renderItem={({ item, index }) =>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(screenName.postJob, {
                            ...params,
                            subCategoryRef: item?._id,
                            service: item?.subcatName
                        })}
                        style={styles.itemWrapper}>
                        <Text style={styles.itemText}>
                            {item?.subcatName}
                        </Text>
                    </TouchableOpacity>
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
    searchBarWrapper: {
        width: '90%',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        borderRadius: 30,
        backgroundColor: colors.border,
        marginTop: '5%',
        alignSelf: 'center'
    },
    searchBarStyle: {
        fontFamily: fonts.secondaryRegular,
        fontSize: 15,
        color: colors.textLightBlack
    },
    contentContainerStyle: {
        paddingVertical: 15,
        paddingHorizontal: '8%'
    },
    itemWrapper: {
        paddingVertical: '7%',
        paddingHorizontal: '5%',
        borderBottomWidth: .8,
        borderColor: colors.border
    },
    itemText: {
        fontFamily: fonts.secondaryRegular,
        fontSize: 15,
        color: colors.textLightBlack
    }
})