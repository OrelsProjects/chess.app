import { fontSizes } from "app/config/metrics";
import AppStyles from "app/config/styles";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  childContainer: {
    flex: 1,
    alignItems: "center",
    width: wp(90),
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: wp(90),
    height: hp(14),
    marginTop: hp(2),
    marginBottom: hp(4),
  },
  heading: {
    width: "100%",
    fontSize: fontSizes.xxlarge,
    fontWeight: "700",
    color: AppStyles.color.RAISIN_BLACK,
  },
  subHeading: {
    width: "100%",
    marginTop: hp(1),
    fontSize: fontSizes.regular,
    color: AppStyles.color.GRANITE_GRAY,
  },
  secondaryButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(5),
  },
  noAccount: {
    fontSize: fontSizes.medium,
    color: "#666666",
    alignSelf: "center",
  },
  login: {
    color: AppStyles.color.COLOR_PRIMARY,
    fontWeight: "500",
    fontSize: fontSizes.medium,
  },
  langButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: hp(7),
    width: wp(90),
    marginBottom: 16,
  },
  langBtnText: {
    flex: 1,
    fontSize: 16,
    marginLeft: wp(2),
    color: "#333",
  },
});

export default styles;
