/*
 * platform/application wide metrics for proper styling
 */
import { Dimensions, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

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
};
