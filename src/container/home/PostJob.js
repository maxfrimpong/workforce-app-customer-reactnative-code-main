import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {BottomButton} from '../../components/atoms/BottomButton';
import {
  FieldDate,
  FieldInput,
  FieldPlaces,
  FieldSelect,
} from '../../components/formComponents';
import {CustomMap, MyImagePicker} from '../../components/molecules';
import {Header} from '../../components/molecules/Header';
import {getRegionsStart} from '../../store/modules/home/actions';
import {
  apiConfig,
  errorToast,
  fonts,
  images,
  screenName,
  validation,
} from '../../utils';
import {colors} from '../../utils/colors';

export const PostJob = ({navigation, route}) => {
  const {params} = route;
  /************************* Hooks Functions *************************/

  const dispatch = useDispatch();

  const {myCurrentLocation, regionList} = useSelector(state => ({
    myCurrentLocation: state.homeReducer.currentLocation,
    regionList: state.homeReducer.regionList,
  }));

  console.log('object', regionList);

  const {control, handleSubmit, errors, setValue} = useForm({
    mode: 'onBlur' || 'onSubmit',
  });

  const [locationData, setLocationData] = useState(myCurrentLocation);
  const [image, setImage] = useState([{}, {}, {}]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    setValue('address', myCurrentLocation);
    dispatch(getRegionsStart());
    console.log('Render Post Job=>', params);
  }, []);

  /********************** Form Functions *************************/

  const handleUploadImage = (src, passedIndex) => {
    const newArray = image.map((item, index) =>
      passedIndex === index ? src : item,
    );
    setImage(newArray);
  };

  const handleRemoveImage = passedIndex => () => {
    const newArray = image.map((item, index) =>
      passedIndex === index ? {} : item,
    );
    setImage(newArray);
  };

  const onSubmit = formValues => {
    let newImage = {};
    const imageArray = image.filter(item => item?.uri);
    imageArray.map((item, index) => (newImage[`image${index}`] = item));
    const {
      address: {location, name},
    } = formValues;
    console.log('on submit press===>', formValues, newImage);
    if (termsAccepted) {
      let payload = {
        ...formValues,
        isTermsAndConditionsAgreed: true,
        tripAddress: name,
        lat: location?.latitude,
        lng: location?.longitude,
        categoryType: params?.categoryType,
      };
      if (imageArray.length > 0) {
        payload = {
          ...payload,
          ...newImage,
        };
      }
      if (params?.categoryType == 'handy_expert') {
        payload['subCategoryRef'] = params?.subCategoryRef;
        payload['service'] = params?.service;
      }
      delete payload?.address;
      navigation.navigate(screenName.platformCharge, {postJobData: payload});
    } else {
      errorToast('Terms & conditions agreement is required');
    }
  };

  return (
    <View style={styles.mainView}>
      <Header back title="Post Job" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.fieldHeading}>Request title</Text>
        <FieldInput
          control={control}
          inputStyle={styles.inputStyle}
          inputViewStyle={styles.inputViewStyle}
          rules={validation.required}
          name="title"
          msg={errors?.title?.message}
        />

        <Text style={styles.fieldHeading}>Request description</Text>
        <FieldInput
          control={control}
          inputStyle={styles.inputStyle}
          inputViewStyle={styles.inputViewStyle}
          rules={validation.required}
          name="description"
          msg={errors?.description?.message}
        />

        {params?.typeCustom && (
          <>
            <Text style={styles.fieldHeading}>Service required</Text>
            <FieldInput
              control={control}
              inputStyle={styles.inputStyle}
              inputViewStyle={styles.inputViewStyle}
              rules={validation.required}
              name="service"
              msg={errors?.service?.message}
            />
          </>
        )}

        <Text style={styles.fieldHeading}>Select region</Text>
        <FieldSelect
          control={control}
          items={regionList}
          inputViewStyle={styles.inputViewStyle}
          rules={validation.required}
          name="region"
          msg={errors?.region?.message}
          iconRight={images.icDropDown}
        />

        {/* ******* Render Setup Date View ******* */}

        <View style={styles.scheduleWrapper}>
          <View style={styles.scheduleItem}>
            <Text style={styles.fieldHeading}>From</Text>
            <FieldDate
              minimumDate={new Date()}
              control={control}
              inputStyle={styles.inputDateStyle}
              inputViewStyle={styles.inputViewStyle}
              rules={validation.required}
              name="fromDate"
              msg={errors?.fromDate?.message}
              iconRight={images.icCalender}
            />
          </View>

          <View style={styles.scheduleItem}>
            <Text style={styles.fieldHeading}>To</Text>
            <FieldDate
              minimumDate={new Date()}
              control={control}
              inputStyle={styles.inputDateStyle}
              inputViewStyle={styles.inputViewStyle}
              rules={validation.required}
              name="toDate"
              msg={errors?.toDate?.message}
              iconRight={images.icCalender}
            />
          </View>
        </View>

        <CustomMap location={locationData} />

        <Text style={styles.fieldHeading}>Location</Text>
        <FieldPlaces
          initialValue={locationData?.name}
          control={control}
          inputStyle={styles.inputStyle}
          inputViewStyle={styles.inputViewStyle}
          rules={validation.required}
          name="address"
          msg={errors?.address?.message}
          iconRight={images.icCurrentLocation}
          locationType="nameWithLocation"
          handleLocation={item => {
            setValue('address', item, {shouldValidate: true});
            setLocationData(data => ({
              ...data,
              ...item,
            }));
          }}
        />

        {params?.typeCustom && (
          <>
            <View style={styles.optionalWrapper}>
              <Text style={styles.fieldHeading}>Budget</Text>
              <Text style={styles.optionalText}>(OPTIONAL)</Text>
            </View>
            <FieldInput
              control={control}
              inputStyle={styles.inputStyle}
              inputViewStyle={styles.inputViewStyle}
              name="budget"
              msg={errors?.budget?.message}
            />
          </>
        )}

        {/* ******** Render Designs ******** */}

        <View style={styles.optionalWrapper}>
          <Text style={styles.fieldHeading}>
            {params?.typeCustom ? 'Design' : 'Images'}
          </Text>
          <Text style={styles.optionalText}>(OPTIONAL)</Text>
        </View>

        <View style={styles.designWrapper}>
          {image.map((item, index) => (
            <MyImagePicker
              key={index}
              onLongPress={handleRemoveImage(index)}
              onChange={src => handleUploadImage(src, index)}
              style={styles.designItem}>
              {item?.uri ? (
                <Image style={styles.imageStyle} source={{uri: item?.uri}} />
              ) : (
                <View style={styles.labelWrapper}>
                  <Image
                    style={styles.labelImage}
                    source={images.icImageLabel}
                  />
                  <Text style={styles.labelText}>PHOTOS</Text>
                </View>
              )}
            </MyImagePicker>
          ))}
        </View>

        {params?.typeCustom && image.length < 6 ? (
          <TouchableOpacity
            disabled={image.length === 6}
            onPress={() => setImage(data => [...data, {}, {}, {}])}
            style={styles.addMoreWrapper}>
            <Text style={styles.addMore}>ADD MORE</Text>
          </TouchableOpacity>
        ) : null}

        {/* ********************************* */}

        {params?.typeCustom && (
          <>
            <View style={styles.optionalWrapper}>
              <Text style={styles.fieldHeading}>Dimensions</Text>
              <Text style={styles.optionalText}>(OPTIONAL)</Text>
            </View>
            <FieldInput
              control={control}
              inputStyle={styles.inputStyle}
              inputViewStyle={styles.inputViewStyle}
              name="dimensions"
              msg={errors?.dimensions?.message}
            />
          </>
        )}

        <View style={styles.tcWrapper}>
          <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
            <Image
              style={[
                styles.tcIcon,
                {
                  tintColor: termsAccepted ? colors.primary : colors.border,
                },
              ]}
              source={images.icCheckTerm}
            />
          </TouchableOpacity>
          <Text style={styles.tcAgree}>{'I agree to all '}</Text>
          <Text
            onPress={() =>
              navigation.navigate(screenName.webViewScreen, {
                data: {
                  name: 'Terms and Conditions',
                  url: apiConfig.terms,
                },
              })
            }
            style={styles.tcMain}>
            Terms and conditions
          </Text>
        </View>

        <BottomButton onPress={handleSubmit(onSubmit)} name="Submit" />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    paddingHorizontal: '7%',
    paddingVertical: '5%',
  },
  fieldHeading: {
    fontSize: 14,
    fontFamily: fonts.primaryBold,
    color: colors.textBlack,
    alignSelf: 'flex-start',
    marginTop: '3%',
    paddingHorizontal: '3%',
  },
  inputViewStyle: {
    width: '100%',
    borderColor: colors.border,
    borderWidth: 0.5,
    marginTop: '2%',
    marginBottom: '2%',
    paddingHorizontal: '5%',
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
  },
  inputStyle: {
    fontFamily: fonts.trenaryMedium,
    fontSize: 14,
    color: colors.textGrey,
    padding: 0,
    paddingLeft: 10,
    width: '90%',
    height: 45,
  },
  inputDateStyle: {
    fontFamily: fonts.trenaryMedium,
    fontSize: 14,
    color: colors.textGrey,
    padding: 0,
    paddingLeft: 10,
    marginVertical: 13,
    width: '80%',
  },
  scheduleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleItem: {
    width: '47%',
  },
  optionalWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  optionalText: {
    fontFamily: fonts.trenaryMedium,
    fontSize: 12,
    color: colors.textGrey,
  },
  designWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
  designItem: {
    width: 110,
    height: 120,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginTop: '5%',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  labelWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelImage: {
    height: 40,
    width: 40,
    marginBottom: '8%',
  },
  labelText: {
    fontFamily: fonts.trenaryMedium,
    fontSize: 12,
    color: colors.textBlack,
  },
  addMoreWrapper: {
    marginTop: '5%',
    alignSelf: 'flex-start',
    marginBottom: '10%',
  },
  addMore: {
    fontFamily: fonts.trenaryMedium,
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  tcWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: '6%',
    paddingHorizontal: '3%',
  },
  tcIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: '2%',
  },
  tcAgree: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: colors.black,
  },
  tcMain: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: colors.primary,
  },
});
