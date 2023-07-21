import { fontSizes, normalized } from 'app/config/metrics';
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
    //justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(92),
    //backgroundColor: 'red'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp(90),
    height: hp(12),
    // marginTop: hp(1),
    marginBottom: hp(2),
    //backgroundColor: 'blue'
  },
  welcome: {
    width: '100%',
    fontSize: fontSizes.xxlarge,
    fontWeight: '700',
    color: AppStyles.color.RAISIN_BLACK,
  },
  loginToContinue: {
    width: '100%',
    fontSize: fontSizes.medium,
    color: AppStyles.color.GRANITE_GRAY,
  },
  mainSigningView: {
    width: normalized.wp(90)
  },
  childSigningView: {
    width: '100%',
    flexDirection: 'row',
  },
  andView: {
    flexDirection: 'row',
     alignSelf: 'flex-start',
  },
  noAccount: {
    fontSize: fontSizes.regular,
    color: AppStyles.color.GRANITE_GRAY,
    justifyContent: 'flex-end',
    // marginBottom: hp(4),
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
  signUpPolicy: {
    color: AppStyles.color.COLOR_PRIMARY,
    fontWeight: '400',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    
    // width:normalized.wp(90),
    // alignSelf:'center'
  },
  buttonLoader: {
    position: 'absolute',
    alignSelf: 'center',
    top: normalized.hp(35),
  },
  secondaryButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems : 'center',
    marginTop: hp(10),
  },
  noAccountTwo: {
    fontSize: fontSizes.medium,
    color: '#666666',
    alignSelf: 'center'
  },
  label: {
    margin: normalized.hp(8),
    fontWeight: '400',
    //color: Colors.white,
  },
  labelColored: {
    margin: normalized.hp(8),
    fontWeight: '400',
    //color: Colors.baseColor,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: hp(7),
    marginBottom: 16,
  },
  datePickerText: {
    flex: 1,
    fontSize: 16,
    marginLeft: wp(2),
    color: '#222',
  },
});

export default styles;
