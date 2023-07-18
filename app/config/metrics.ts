/*
 * platform/application wide metrics for proper styling
 */
import { Dimensions, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

export const normalized = {wp, hp};

export const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 54 : 66,
};

export const fontSizes = {
  xsmall: wp(2.8),
  small: wp(3),
  regular: wp(3.7),
  medium: wp(4.3),
  large: wp(5),
  xlarge: wp(5.3),
  xxlarge: wp(10),
};

export const radius = {
  xsmallRadius: wp(2.8),
  smallRadius: wp(3),
  regularRadius: wp(3.7),
  mediumRadius: wp(4.3),
  largeRadius: wp(5),
  xlargeRadius: wp(5.3),
  xxlargeRadius: wp(10),
};