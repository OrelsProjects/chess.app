import { fontSizes } from 'app/config/metrics';
import AppStyles from 'app/config/styles';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppStyles.color.COLOR_WHITE,
  },
  childContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    width: wp(92),
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp(90),
    height: hp(12),
    // marginTop: hp(1),
    marginBottom: hp(2),
  },
  welcome: {
    fontSize: fontSizes.xxlarge,
    fontWeight: '700',
    color: AppStyles.color.RAISIN_BLACK,
  },
  loginToContinue: {
    fontSize: fontSizes.medium,
    color: AppStyles.color.GRANITE_GRAY,
  },
  noAccount: {
    fontSize: fontSizes.medium,
    color: AppStyles.color.GRANITE_GRAY,
    justifyContent: 'flex-end',
    marginBottom: hp(4),
  },
  haveAccount: {
    fontSize: fontSizes.medium,
    color: AppStyles.color.GRANITE_GRAY,
    justifyContent: 'flex-end',
    marginTop: hp(4),
  },
  signUp: {
    color: AppStyles.color.COLOR_PRIMARY,
    fontWeight: '500',
  },
});

export default styles;
