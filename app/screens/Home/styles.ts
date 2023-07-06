import { StyleSheet } from 'react-native';
import { fontSizes, normalized, radius } from 'app/config/metrics';
import AppStyles from 'app/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 4,
  },
  content: { flexDirection: 'row', justifyContent: 'space-between' },

  scrollViewContent: {
    flexGrow: 1,
    // backgroundColor: 'red',
    zIndex: -1,
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
    fontSize: fontSizes.small,
  },
  wgmContainer: {
    backgroundColor: AppStyles.color.NORTH_TEXAS_GREEN,
    borderRadius: 24,
    // width: normalized.wp(16),
    padding: normalized.wp(2.5),
  },
  wgmText: {
    fontSize: fontSizes.large,
    color: AppStyles.color.COLOR_WHITE,
  },
  starImage: {
    width: normalized.wp(7),
    height: normalized.hp(3),
  },
  firstView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: normalized.wp(95),
    marginTop: normalized.hp(5),
    //backgroundColor: 'red',
  },
  secondView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: normalized.hp(10),
    borderRadius: radius.regularRadius,
    backgroundColor: '#F3F7FF',
    //marginVertical: normalized.hp(2), // Adjust the margin bottom value as desired
  },
  thirdView: {
    flexDirection: 'row',
    //justifyContent: 'space-evenly',
    alignItems: 'center',
    width: normalized.wp(60),
    //backgroundColor: 'red',
  },
  neil: {
    alignSelf: 'center',
    width: normalized.wp(12),
    height: normalized.hp(6),
  },
  fourthView: {
    width: normalized.wp(30),
    //backgroundColor: 'pink',
  },
  neilText: {
    alignSelf: 'flex-start',
    marginHorizontal: normalized.wp(3),
    fontSize: fontSizes.large,
    marginTop: normalized.hp(2),
  },
  // multiImages: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   backgroundColor: 'pink',
  // },
  // innerMultiView: {
  //   //flex: 1,
  //   backgroundColor: 'red'
  // },
  // innerMultiViewTwo: {
  //   backgroundColor: 'gray',
  // },
  // innerMultiView: {
  //   position: 'absolute',
  //   left: -10,
  //   top: 0,
  //   backgroundColor: 'red',
  // },
  // innerMultiViewTwo: {
  //   position: 'absolute',
  //   left: -5,
  //   top: 0,
  //   backgroundColor: 'gray',
  // },
  // innerMultiViewThree: {
  //   position: 'absolute',
  //   left: 0,
  //   top: 0,
  // },
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
  fifthView: {
    // justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    // left:30,
    right: -70,
    bottom: normalized.hp(15),
    // backgroundColor: 'red',
  },
  addIcon: {
    width: normalized.wp(13),
    height: normalized.hp(6),
    alignSelf: 'flex-end',
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
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
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
    //backgroundColor: 'blue',
    //height: normalized.hp(6)
  },
  undo: {
    width: normalized.wp(8),
    height: normalized.hp(3),
  },
  undoText: {
    fontSize: fontSizes.small,
  },
  eightView: {
    justifyContent: 'space-around',
    // backgroundColor: 'red',
    // height: normalized.hp(6)
  },
  reset: {
    width: normalized.wp(8),
    height: normalized.hp(3),
  },
  resetText: {
    fontSize: fontSizes.small,
  },
  nineView: {
    justifyContent: 'center',
    alignItems: 'center',
    // position:'absolute'
    //backgroundColor: 'pink',
    //marginVertical: normalized.hp(2),
  },
  nineText: {
    fontSize: fontSizes.medium,
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    bottom: normalized.hp(1),
    width: normalized.wp(70),
  },
  lastView: {
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    position: 'absolute',
    width: normalized.wp(60),
    // alignSelf: 'center',
    //marginTop: normalized.hp(77),
    //marginVertical: normalized.hp(-5),
    // top: 0,
    bottom: normalized.hp(1),
  },
});

export default styles;
