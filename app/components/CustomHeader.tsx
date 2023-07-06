import { chessLogo } from 'app/assets/SVGs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';

const CustomHeader = (props: any) => {
  return (
    <View style={styles.topView}>
      <View style={{ width: wp(10) }}>
        <TouchableOpacity onPress={props?.onBackButtonPress}>
          {props?.leftIcon && (
            <SvgXml xml={props?.leftIcon} height={20} width={20} />
          )}
        </TouchableOpacity>
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
