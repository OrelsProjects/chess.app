import { fontSizes } from 'app/config/metrics';
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
  },
  chesslogo: {
    width: wp(20),
    height: wp(20),
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp(90),
    height: hp(14),
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: fontSizes.xlarge
  },
  loginToContinue: {
    color: '#666666',
  },
  labelStyle: {
    fontSize: 12,
  },
});

export default styles;
