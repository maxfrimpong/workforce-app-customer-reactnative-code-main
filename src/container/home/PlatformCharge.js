import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { BottomButton } from "../../components/atoms/BottomButton";
import { screenName } from "../../utils";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { images } from "../../utils/images";

export const PlatformCharge = ({ navigation, route }) => {
  const adminSettings = useSelector((state) => state.homeReducer.adminSettings);

  return (
    <View style={styles.mainView}>
      <SafeAreaView style={styles.mainView}>
        <Image style={styles.screenImage} source={images.icMoneyBag} />
        <Text style={styles.amount}>
          GH&#x20B5; {adminSettings[0]?.App_Settings?.customerPlatformFee ?? 0}
        </Text>
        <Text style={styles.platformCharge}>
          Platform Charges Will Be Applied
        </Text>

        <BottomButton
          onPress={() =>
            navigation.navigate(screenName.paymentMethod, {
              orderInfo: route?.params?.postJobData,
              back: true,
            })
          }
          name="Continue"
          mainStyle={{
            marginTop: "5%",
          }}
        />

        <BottomButton
          onPress={() => navigation.goBack()}
          name="Cancel"
          mainStyle={{
            marginTop: "3%",
            alignSelf: "center",
            width: "40%",
            backgroundColor: colors.white,
          }}
          nameColor={colors.textBlack}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    paddingHorizontal: "8%",
  },
  screenImage: {
    height: 90,
    width: 90,
    resizeMode: "contain",
    alignSelf: "center",
  },
  amount: {
    fontFamily: fonts.secondaryBold,
    fontSize: 30,
    color: colors.textBlack,
    marginTop: "5%",
    alignSelf: "center",
  },
  platformCharge: {
    fontFamily: fonts.secondaryLight,
    fontSize: 16,
    color: colors.textGrey,
    marginTop: "2%",
    alignSelf: "center",
    textAlign: "center",
  },
});
