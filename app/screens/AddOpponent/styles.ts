import { fontSizes, normalized, radius } from 'app/config/metrics';
import AppStyles from 'app/config/styles';
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
    alignItems: 'center',
    width: wp(90),
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(90),
    height: hp(14),
  },
  heading: {
    fontSize: fontSizes.large,
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
    alignItems: 'center',
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
  userParentContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    width: normalized.wp(95),
    //backgroundColor: AppStyles.color.COLOR_PRIMARY,
    marginVertical: normalized.hp(1),
  },
  userChildContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: normalized.hp(10),
    borderRadius: radius.regularRadius,
    backgroundColor: '#F3F7FF',
    paddingHorizontal: normalized.wp(5),
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(68),
    // gap: 4,
  },
  userImg: {
    elevation: 2.5,
    shadowColor: AppStyles.color.COLOR_BLACK,
    shadowOffset: { width: 0, height: 11 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  userDetailsView: {
    marginLeft: 8,
  },
  userName: {
    fontSize: fontSizes.regular,
    color: AppStyles.color.COLOR_BLACK,
    fontWeight: '700',
  },
  ratingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: normalized.wp(18),
    height: normalized.hp(3),
    borderWidth: 1,
    borderRadius: radius.regularRadius,
    backgroundColor: AppStyles.color.COLOR_GREY_WHITE,
    borderColor: 'gold',
    marginTop: normalized.wp(0.5),
    paddingHorizontal: normalized.wp(2),
  },
  starText: {
    fontSize: fontSizes.small,
    marginLeft: wp(1),
  },
  wgmContainer: {
    // backgroundColor: AppStyles.color.NORTH_TEXAS_GREEN,
    borderRadius: 24,
    alignItems: 'center',
    width: normalized.wp(16),
    paddingVertical: normalized.wp(2.5),
  },
  wgmText: {
    fontSize: fontSizes.large,
    color: AppStyles.color.COLOR_WHITE,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: AppStyles.color.COLOR_DARK_SEPERATOR,
    marginVertical: wp(4),
    backgroundColor: 'red',
    // height: 20,
    width: wp(90),
  },
  optionText: {
    fontSize: fontSizes.regular,
    color: AppStyles.color.COLOR_BLACK,
    fontWeight: '600',
  },
  xIcon: {
    backgroundColor: AppStyles.color.COLOR_WHITE,
    width: normalized.wp(6),
    height: normalized.wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalized.hp(10),
    elevation: 2.5,
    shadowColor: AppStyles.color.COLOR_BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 22,
    // position: 'absolute',
    marginTop: wp(-22),
    // marginLeft: wp(10),
  },
  gameStatsBtnView: {
    flexDirection: 'row',
    width: normalized.wp(90),
    justifyContent: 'space-between',
    marginBottom: normalized.hp(2),
  },
  statsBtnContainer: {
    padding: normalized.wp(5),
    backgroundColor: '#F3F7FF',
    width: normalized.wp(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: AppStyles.color.COLOR_PRIMARY,
    borderWidth: 0.8,
    borderRadius: radius.smallRadius,
  },
  statsBtnText: {
    color: AppStyles.color.COLOR_PRIMARY,
    fontSize: fontSizes.regular,
    fontWeight: '600',
  },
});

export default styles;
