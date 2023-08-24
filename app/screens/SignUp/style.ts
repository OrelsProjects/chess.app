import { fontSizes, normalized } from "../../config/metrics";
import AppStyles from "../../config/styles";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: AppStyles.color.COLOR_WHITE,
  },
  childContainer: {
    flex: 1,
    alignItems: "center",
    width: wp(92),
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: wp(90),
    height: hp(6),
  },
  signupTitle: {
    width: "100%",
    fontSize: fontSizes.xxlarge,
    fontWeight: "700",
    color: AppStyles.color.RAISIN_BLACK,
  },
  mainSigningView: {
    width: normalized.wp(90),
  },
  childSigningView: {
    width: "100%",
    flexDirection: "row",
  },
  andView: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  noAccount: {
    fontSize: fontSizes.regular,
    color: AppStyles.color.GRANITE_GRAY,
    justifyContent: "flex-end",
  },
  signUp: {
    fontSize: normalized.hp(2),
    color: AppStyles.color.COLOR_PRIMARY,
    fontWeight: "500",
  },
  signUpPolicy: {
    color: AppStyles.color.COLOR_PRIMARY,
    fontWeight: "400",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    fontSize: normalized.hp(2),
  },
  buttonLoader: {
    position: "absolute",
    alignSelf: "center",
    top: normalized.hp(35),
  },
  secondaryButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(10),
  },
  noAccountTwo: {
    fontSize: fontSizes.medium,
    color: "#666666",
    alignSelf: "center",
  },
  label: {
    margin: normalized.hp(1),
    fontWeight: "400",
  },
  labelColored: {
    margin: normalized.hp(8),
    fontWeight: "400",
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: hp(7),
    marginBottom: 16,
    color: "#333",
  },
  datePickerText: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: wp(2),
    color: "#222",
  },

  placeholder: {
    color: "#8A8A8F",
  },
});

export default styles;
