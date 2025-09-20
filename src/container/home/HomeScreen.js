import React, {useState, useEffect, Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RetryButton} from '../../components/atoms/RetryButton';
import {SearchBar} from '../../components/atoms/SearchBar';
import {Header} from '../../components/molecules';
import {getStore} from '../../store';
import {
  adminDataStart,
  getCategoryListStart,
} from '../../store/modules/home/actions';
import {
  colors,
  errorToast,
  fonts,
  images,
  screenName,
  socketConfig,
  socketServices,
} from '../../utils';

export const HomeScreen = ({navigation}) => {
  // ***** Hooks Functions ***** //

  const dispatch = useDispatch();

  const {user, categoryList, myCurrentLocation, serviceSupported, isLoading} =
    useSelector(state => ({
      user: state?.loginReducer?.loginData,
      categoryList: state?.homeReducer?.categoryList,
      myCurrentLocation: state.homeReducer.currentLocation,
      serviceSupported: state.homeReducer.serviceSupported,
      isLoading: state.loadingReducer.loading,
    }));

  const [homeData, sethomeData] = useState({
    socketId: '',
  });

  useEffect(() => {
    dispatch(adminDataStart());
    socketServices.initializeSocket(user?.token, user?._id);
    return () => {};
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      console.log(user);
      // Access redux store faster
      const newLocation = getStore().getState().homeReducer.currentLocation;
      console.log('newLocation', newLocation);
      if (newLocation?.name && newLocation?.name != '') {
        const payload = {
          lat: newLocation?.location?.latitude,
          lng: newLocation?.location?.longitude,
          userType: 'customer',
          limit: 30,
        };
        dispatch(getCategoryListStart(payload));
      } else {
        navigation.navigate(screenName.location);
        errorToast('Please enter your location', 'Location');
      }
    });

    return unsubscribe;
  }, [navigation]);

  // ************* Main Functions ************* //

  console.log('Loading', isLoading);

  return (
    <View style={styles.mainView}>
      {/* Rende Header */}
      <Header borderRound menu title="Select Category" headerHeight={100} />

      {/* Render Content */}
      <View style={styles.searchBarWrapper}>
        <SearchBar
          onPress={() => navigation.navigate(screenName.location)}
          value={myCurrentLocation?.name}
        />
      </View>
      {isLoading ? null : categoryList &&
        categoryList.length > 0 &&
        serviceSupported ? (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          {categoryList.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate(
                  item?.type === 'custom'
                    ? screenName.postJob
                    : screenName.subCategory,
                  {
                    typeCustom: item?.type === 'custom' ? true : false,
                    categoryId: item?._id,
                    categoryType: item?.type,
                  },
                )
              }
              style={styles.itemWrapper}>
              <Image style={styles.itemImage} source={{uri: item.catImage}} />
              <View
                style={{
                  width: '65%',
                }}>
                <Text style={styles.itemTitle}>{item?.catName}</Text>
                <Text style={styles.itemDesc}>{item.catDesc}</Text>
              </View>
              <Image style={styles.itemIcon} source={images.icArrowOption} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : categoryList && categoryList.length == 0 && serviceSupported ? (
        <RetryButton hideButton />
      ) : (
        <View style={styles.serviceView}>
          <Text style={styles.serviceText}>
            Our Services are not supported in this Location. Please choose a
            different Location.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchBarWrapper: {
    width: '100%',
    paddingHorizontal: '8%',
    marginTop: -40,
  },
  contentContainerStyle: {
    width: '100%',
    paddingHorizontal: '5%',
    paddingBottom: 30,
  },
  itemWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  itemImage: {
    height: 70,
    width: 85,
    borderRadius: 10,
    marginRight: 8,
  },
  itemTitle: {
    fontFamily: fonts.secondaryMedium,
    fontSize: 18,
    color: colors.textDarkBlack,
  },
  itemDesc: {
    fontFamily: fonts.secondaryLight,
    fontSize: 11,
    color: colors.textGrey,
  },
  itemIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  serviceView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  serviceText: {
    fontFamily: fonts.secondaryMedium,
    fontSize: 17,
    color: colors.black,
    marginTop: Platform.OS === 'android' ? '-10%' : '-20%',
  },
});
