import { chessLogo } from '../assets/SVGs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';

const CustomHeader = (props: any) => {
  const lang = useSelector((state: any) => state.auth.language);
  return (
    <View style={styles.topView}>
      <View style={{ width: wp(10) }}>
        {lang !== "he" && props?.drawerIcon && (
          <TouchableOpacity onPress={props?.drawerButtonPress}>
            <SvgXml xml={props?.drawerIcon} height={20} width={20} />
          </TouchableOpacity>
        )}

        {props?.leftIcon && (
          <TouchableOpacity onPress={props?.onBackButtonPress}>
            <SvgXml xml={props?.leftIcon} height={20} width={20} />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          alignItems: 'center',
          width: wp(70),
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <SvgXml xml={chessLogo} width={wp(14)} height={wp(18)} />
      </View>
      {lang === "he" && props?.drawerIcon && (
        <TouchableOpacity onPress={props?.drawerButtonPress} style={{transform: [{ scaleX: -1 }]}}>
          <SvgXml xml={props?.drawerIcon} height={20} width={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default CustomHeader;

const styles = StyleSheet.create({
  topView: {
    width: wp(90),
    alignItems: 'center',
    marginTop: hp(2),
    alignSelf: 'center',
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  leftIcon: {
    alignSelf: 'flex-start',
  },
});
