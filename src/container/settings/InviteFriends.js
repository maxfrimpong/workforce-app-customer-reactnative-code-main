import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
  Platform,
} from 'react-native';
import {colors, fonts, images} from '../../utils';
import {Header} from '../../components/molecules';
import {useSelector} from 'react-redux';

export const InviteFriends = ({navigation}) => {
  // ************ Main Functions *************** //

  const adminSettings = useSelector(state => state.homeReducer.adminSettings);

  // ************ Main Functions *************** //

  const handleShare = () => {
    console.log(adminSettings);
    const appLink =
      Platform.OS === 'android'
        ? adminSettings?.[0].Android_App_URL?.Android_Client_App_URL
        : adminSettings?.[0].IOS_App_URL?.IOS_Client_App_URL;
    Share.share({
      message: `Hey, I'm inviting you to use WorkForce.\n${appLink}`,
    });
  };

  return (
    <View style={styles.mainView}>
      <Header back title="Invite Friends" />
      <View style={styles.content}>
        <View style={styles.upperView}>
          <Image style={styles.ballonIcon} source={images.icInvite} />
          <Text style={styles.inviteText}>INVITE YOUR FRIENDS</Text>
          <Text style={styles.referralText}>
            {'You can invite friends by sharing app URL'.toUpperCase()}
          </Text>
        </View>

        <View style={styles.bottomView}>
          <TouchableOpacity onPress={handleShare} style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>Invite Friend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  upperView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballonIcon: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    marginTop: '5%',
  },
  inviteText: {
    fontFamily: fonts.primaryBold,
    fontSize: 23,
    color: colors.black,
    marginTop: '10%',
  },
  referralText: {
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    color: colors.black,
    marginTop: '2%',
    paddingHorizontal: '10%',
    textAlign: 'center',
  },
  codeText: {
    fontFamily: fonts.primarySemibold,
    fontSize: 30,
    color: colors.primary,
    marginTop: '2%',
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: '10%',
    paddingHorizontal: '8%',
  },
  buttonWrapper: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    color: colors.white,
  },
});
