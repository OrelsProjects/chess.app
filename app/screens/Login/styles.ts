import { fontSizes, normalized } from '../../config/metrics';
import AppStyles from '../../config/styles';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  childContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    width: wp(90),
  },
  chesslogo: {
    width: wp(14),
    height: wp(18),
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp(90),
    height: hp(14),
    marginTop: hp(2),
    marginBottom: hp(4),
  },
  welcomeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcome: {
    width: '100%',
    fontSize: fontSizes.xxlarge,
    fontWeight: '700',
    color: AppStyles.color.RAISIN_BLACK
  },
  loginToContinue: {
    width: '100%',
    fontSize: fontSizes.medium,
    color: AppStyles.color.GRANITE_GRAY,
  },
  labelStyle: {
    color: AppStyles.color.COLOR_PRIMARY,
    fontWeight: '500',
    fontSize: normalized.hp(2),
  },
  forgotPass: {
   // alignSelf: 'flex-end',
    marginBottom: hp(4),
    width:'100%'

  },
  buttonLoader: {
    position: 'absolute',
    alignSelf: 'center',
    top: hp(38),
  },
  orText: {
    alignSelf: 'center',
    marginVertical: hp(2),
  },
  googleSignInContainer: {
    backgroundColor: AppStyles.color.ANTI_FLASH_WHITE,
    borderRadius: 10,
    borderColor: 'black',
    height: hp(7),
    width: wp(90),
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

  },
  googleText: {
    textAlign: 'center',
    fontSize: 17,
    color: AppStyles.color.DIM_GRAY,
    paddingHorizontal: 10
  },
  secondaryButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
  },
  noAccount: {
    fontSize: fontSizes.medium,
    color: '#666666',
    alignSelf: 'center'
  },
  signUp: {
    color: AppStyles.color.COLOR_PRIMARY,
    fontWeight: '500',
    fontSize: fontSizes.medium,
  }
});

export default styles;
