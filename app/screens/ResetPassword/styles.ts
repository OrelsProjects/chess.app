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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  childContainer: {
    flex: 1,
    alignItems: 'center',
    width: wp(90),
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp(90),
    height: hp(14),
    marginTop: hp(2),
    marginBottom: hp(4),
  },
  heading: {
    fontSize: fontSizes.xxlarge,
    fontWeight: '700',
    color: AppStyles.color.RAISIN_BLACK,
  },
  subHeading: {
    marginTop: hp(1),
    fontSize: fontSizes.regular,
    color: AppStyles.color.GRANITE_GRAY,
  },
  secondaryButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems : 'center',
    marginBottom: hp(5),
  },
  noAccount: {
    fontSize: fontSizes.medium,
    color: '#666666',
    alignSelf: 'center',
  },
  login: {
    color: AppStyles.color.COLOR_PRIMARY,
    fontWeight: '500',
    fontSize: fontSizes.medium,
  },
});

export default styles;
