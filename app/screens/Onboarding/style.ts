import { fontSizes } from 'app/config/metrics';
import AppStyles from 'app/config/styles';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.COLOR_WHITE
  },
  imageView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: wp(70),
    height: hp(30),
  },
  textView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    width: wp(90),
    height: hp(40),
    backgroundColor: AppStyles.color.COLOR_WHITE,
    borderRadius: 7,
    elevation: 2.5,
    shadowColor: AppStyles.color.COLOR_BLACK,
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.1,
      shadowRadius: 12,
  },
  heading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: fontSizes.xlarge,
    fontWeight: '700',
    color: '#000000',
  },
  textDetail: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: fontSizes.regular,
    color: AppStyles.color.SONIC_SILVER,
    textAlign: 'center',
    width: wp(80),
  },
  slider: {
    width: wp(10),
    height: hp(1.19),
    marginVertical: 20,
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
  },
  buttonDirection: {
    flexDirection: 'row',
    width: wp(80),
    justifyContent: 'space-between',
  },
  skipText: {
    fontSize: fontSizes.regular,
    color: AppStyles.color.SONIC_SILVER,
    padding: 7,
  },
  nextButtonView: {
    backgroundColor: '#0064FD',
    width: wp(24),
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: fontSizes.large,
  },
});

export default styles;

