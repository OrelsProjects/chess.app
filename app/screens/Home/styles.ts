import { StyleSheet } from 'react-native';
import { fontSizes, normalized, radius } from '../../config/metrics';
import AppStyles from '../../config/styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 4,
  },
  allPlayerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: normalized.wp(90),
    marginVertical: normalized.hp(1),
  },
  content: { flexDirection: 'row', justifyContent: 'space-between' },
  ratingDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: normalized.wp(95),
    marginVertical: normalized.hp(1)
  },
  ratingView: {
    width: normalized.wp(45),
    backgroundColor: AppStyles.color.COLOR_WHITE,
    alignItems: 'center', justifyContent: 'center'
  },
  ratingText: {
    fontSize: fontSizes.regular,
    padding: 3,
    color: '#222222',
  },

  scrollViewContent: {
    flexGrow: 1,
    width: normalized.wp('100'),
    backgroundColor: '#e5e5e5',
  },
  middleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: normalized.hp(10),
    marginLeft: normalized.hp(-3),
    width: normalized.wp(20),
    height: normalized.hp(3),
    borderWidth: 1,
    borderRadius: radius.regularRadius,
    backgroundColor: AppStyles.color.COLOR_GREY_WHITE,
    borderColor: 'gold',
    paddingHorizontal: normalized.wp(3),
  },
  starImage: {
    width: normalized.wp(7),
    height: normalized.hp(3),
  },
  starText: {
    color: '#222222',
    fontSize: fontSizes.small,
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
    marginTop: normalized.wp(-22),
  },
  wgmContainer: {
    backgroundColor: AppStyles.color.NORTH_TEXAS_GREEN,
    borderRadius: 24,
    padding: normalized.wp(2.5),
  },
  wgmText: {
    fontSize: fontSizes.large,
    color: AppStyles.color.COLOR_WHITE,
  },
  firstView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: normalized.wp(95),
    marginTop: normalized.hp(5),
  },
  secondView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: normalized.hp(10),
    borderRadius: radius.regularRadius,
    backgroundColor: '#F3F7FF',
  },
  thirdView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: normalized.wp(60),
  },
  neil: {
    alignSelf: 'center',
    width: normalized.wp(12),
    height: normalized.hp(6),
  },
  fourthView: {
    width: normalized.wp(30),
  },
  neilText: {
    color: '#222222',
    alignSelf: 'flex-start',
    marginHorizontal: normalized.wp(3),
    fontSize: fontSizes.large,
  },

  starImageTwo: {
    width: normalized.wp(5),
    height: normalized.hp(2),
  },

  multiImagesStyle: {
    width: normalized.wp(9),
    height: normalized.hp(3),
  },
  players: {
    alignSelf: 'flex-start',
    width: normalized.wp(25),
    height: normalized.hp(6),
  },
  wgm: {
    width: normalized.wp(15),
    height: normalized.hp(5),
  },
  view2: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: normalized.wp(90),
    alignSelf: 'center',
    position: 'absolute',
    bottom: normalized.hp(20),
  },
  button: {
    width: hp(8),
    height: hp(8),
    borderRadius: 90,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: hp(3.5),
    fontWeight: '700',
    color: '#ffffff'
  },
  sixView: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: normalized.hp(5),
    width: normalized.wp(45),
    height: normalized.hp(8),
    borderRadius: radius.xxlargeRadius,
    backgroundColor: AppStyles.color.COLOR_GREY_WHITE,
    alignSelf: 'center',
    elevation: 4
  },
  seperator: {
    borderWidth: 0.5,
    height: normalized.hp(5),
    borderColor: AppStyles.color.SONIC_SILVER,
  },
  middleLine: {
    height: normalized.hp(6),
  },
  sevenView: {
    justifyContent: 'space-around',
  },
  undo: {
    width: normalized.wp(8),
    height: normalized.hp(4),
  },
  undoText: {
    fontSize: fontSizes.small,
    color: '#222222',
  },
  eightView: {
    justifyContent: 'space-around',
  },
  reset: {
    width: normalized.wp(8),
    height: normalized.hp(4),
  },
  resetText: {
    fontSize: fontSizes.small,
    color: '#222222',
  },
  nineView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nineText: {
    fontSize: fontSizes.medium,
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    bottom: normalized.hp(1),
    width: normalized.wp(70),
    color: '#222222',
  },
  lastView: {
    position: 'absolute',
    width: normalized.wp(60),
    bottom: normalized.hp(8),
  },
  buttonView: {
    bottom: normalized.hp(5),
    position: 'absolute'
  },
  userImagesView: {
    width: normalized.wp(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonLoader: {
    flex: 1,
    zIndex: 1,
    position: 'absolute',
    alignSelf: 'center',
    top: hp(38),
  },
  userImagesWidth: {
    width: normalized.wp(4.5),
    marginVertical: normalized.hp(1)
  },
  plusUserView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: normalized.wp(7),
    height: normalized.hp(3.3),
    borderRadius: 90,
    position: 'absolute',
    bottom: normalized.hp(-1.65),
    right: normalized.wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusUserText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomXIcon: {
    alignSelf: 'flex-end',
    marginHorizontal: normalized.wp(3),
  },
  allPlayerText: {
    color: '#212121',
  },

  bottomButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: normalized.hp(3),
    width: normalized.wp(80),
  },
});

export default styles;