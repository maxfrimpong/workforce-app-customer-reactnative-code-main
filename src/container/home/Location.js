import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {RoundButton} from '../../components/atoms';
import {FieldInput, FieldPlaces} from '../../components/formComponents';
import {CustomMap, Header} from '../../components/molecules';
import {currentLocation} from '../../store/modules/home/actions';
import {colors, fonts, images, validation} from '../../utils';

export const Location = ({navigation, route}) => {
  // ****** Hooks Functions ****** //

  const dispatch = useDispatch();

  const {myCurrentLocation} = useSelector(state => ({
    myCurrentLocation: state.homeReducer.currentLocation,
  }));

  const [locationData, setLocationData] = useState(myCurrentLocation);

  const {control, handleSubmit, errors, setValue} = useForm({mode: 'all'});

  useEffect(() => {
    if (myCurrentLocation?.name && myCurrentLocation?.name != '') {
      setValue('address', myCurrentLocation);
    }
  }, []);

  // ********** Main Functions ********* //

  const onSubmit = async formValues => {
    console.log('onSubmit Press', formValues);
    dispatch(currentLocation(formValues?.address));
    navigation.goBack();
  };

  return (
    <View style={styles.mainView}>
      <KeyboardAwareScrollView>
        <Header borderRound title="Location" back />
        <View style={styles.contentWrapper}>
          <Text style={styles.screenTitle}>
            Enter The Location Of Your Job Request
          </Text>

          <FieldPlaces
            control={control}
            initialValue={locationData?.name}
            inputStyle={styles.inputStyle}
            inputViewStyle={styles.inputViewStyle}
            rules={validation.required}
            name="address"
            msg={errors?.address?.message}
            placeholder="Address"
            iconRight={images.icCurrentLocation}
            locationType="nameWithLocation"
            handleLocation={item => {
              console.log('places item', item);
              setValue('address', item, {shouldValidate: true});
              setLocationData(data => ({
                ...data,
                ...item,
              }));
            }}
          />

          <CustomMap location={locationData} />

          <FieldInput
            control={control}
            inputStyle={styles.inputStyle}
            inputViewStyle={styles.inputViewStyle}
            rules={validation.required}
            name="landmark"
            placeholder="Digital Address / Landmark"
            msg={errors?.landmark?.message}
          />

          <RoundButton onPress={handleSubmit(onSubmit)} icon={images.icNext} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  contentWrapper: {
    paddingHorizontal: '8%',
  },
  screenTitle: {
    fontFamily: fonts.secondaryBold,
    fontSize: 14,
    color: colors.white,
    marginTop: '5%',
  },
  inputViewStyle: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
    paddingHorizontal: '5%',
    backgroundColor: colors.white,
    marginTop: '5%',
  },
  inputStyle: {
    padding: 0,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    width: '90%',
    color: colors.textBlack,
  },
});
