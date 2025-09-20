import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components/molecules/Header";
import { serviceProviderStart } from "../../store/modules/job/actions";
import { colors, fonts, images, screenName } from "../../utils";

export const Providers = ({ navigation, route }) => {
  // ************** Hooks Functions ************* //

  const passedItem = route?.params?.item;

  const dispatch = useDispatch();

  const providerData = useSelector((state) => state.jobReducer.providerData);

  useEffect(() => {
    dispatch(
      serviceProviderStart({
        tripId: passedItem?._id,
      })
    );
  }, []);

  return (
    <View style={styles.mainView}>
      <Header back borderRound title="Service Provider" />
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={providerData}
        keyExtractor={(item, index) => `${index}_providersList`}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(screenName.providerDetails, {
                item,
                tripId: passedItem?._id,
                tripStatus: passedItem?.tripStatus,
                dummyName: `Artist ${index + 1}`,
              })
            }
            style={styles.itemWrapper}
          >
            <Image
              style={styles.itemImage}
              source={
                item?.driverRefId?.profileImage !== null
                  ? { uri: item?.driverRefId?.profileImage }
                  : images.dummyCustom
              }
            />
            <View style={styles.midView}>
              <Text style={styles.artist}>
                Artist {index + 1}
                {/* {item?.driverRefId?.accountType == 'company'
                                    ? `${item?.driverRefId?.companyName}`
                                    : `${item?.driverRefId?.firstName} ${item?.driverRefId?.lastName}`} */}
              </Text>
              <Text style={styles.time}>
                {moment(item?.bidPlacedAt).format("dddd, MMM Do")}
              </Text>
              <Text style={styles.location}>{item?.driverRefId?.address}</Text>
            </View>
            <Text style={styles.price}>GH&#x20B5;{item?.estimatedCost}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  itemWrapper: {
    width: "100%",
    paddingVertical: "5%",
    borderBottomWidth: 0.5,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    height: 60,
    width: 70,
    borderRadius: 10,
    marginRight: 8,
  },
  midView: {
    width: "60%",
  },
  artist: {
    fontFamily: fonts.secondarySemibold,
    fontSize: 17,
    color: colors.black,
  },
  time: {
    fontFamily: fonts.secondaryRegular,
    fontSize: 13,
    color: colors.textGrey,
  },
  location: {
    fontFamily: fonts.secondaryMedium,
    fontSize: 14,
    color: colors.textBlack,
  },
  price: {
    fontFamily: fonts.secondaryMedium,
    fontSize: 21,
    color: colors.textDarkBlack,
  },
});
