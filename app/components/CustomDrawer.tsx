import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppStyles from "../config/styles";
import { SvgXml } from "react-native-svg";
import {
  chessLogo,
  externalLinkIcon,
  defaultPlayer,
  xIcon,
  calculatorIcon,
  homeIcon,
  infoIcon,
  settingsIcon,
  languageIcon,
  logout,
} from "../assets/SVGs";
import { removeUserInfo } from "../redux/actions/action";
import { fontSizes, normalized } from "../config/metrics";
import NavigationService from "../navigation/NavigationService";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useStore } from "../store";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Auth } from "aws-amplify";
import { DdLogs } from "@datadog/mobile-react-native";

const CustomDrawer = (props) => {
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.auth.userInfo);
  const navigateToHome = () => NavigationService.navigate("Home");
  const navigateToCalculator = () => NavigationService.navigate("Home");
  const navigateToSettings = () => NavigationService.navigate("Home");
  const navigateToSupport = () => {
    const url = "https://israchessapp.wixsite.com/israchess/terms";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        DdLogs.warn("Don't know how to open URI: " + url);
      }
    });
  };
  const navigateToLanguages = () => NavigationService.navigate("Languages");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  const lang = useSelector((state: any) => state.auth.language);

  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const onLogOut = () => {
    dispatch(removeUserInfo());
    Auth.signOut();
    setIsLoggedIn(false);
  };

  const drawerItemRoutes = [
    {
      icon: homeIcon,
      name: t("home"),
      route: navigateToHome,
    },
    {
      icon: calculatorIcon,
      name: t("calculator"),
      route: navigateToCalculator,
    },
    {
      icon: settingsIcon,
      name: t("settings"),
      route: navigateToSettings,
    },
    {
      icon: languageIcon,
      name: t("languages"),
      route: navigateToLanguages,
    },
    {
      icon: infoIcon,
      name: t("support"),
      route: navigateToSupport,
    },
    {
      icon: externalLinkIcon,
      name: t("visitOurWebsite"),
      route: navigateToSupport,
    },
    {
      icon: logout,
      name: t("logout"),
      route: onLogOut,
    },
  ];

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainer}
      >
        {lang === "he" ? (
          <View style={styles.drawerHeader}>
            <TouchableOpacity style={styles.xIcon} onPress={closeDrawer}>
              <SvgXml xml={xIcon} width={wp(8)} height={wp(8)} />
            </TouchableOpacity>
            <SvgXml xml={chessLogo} width={wp(10)} height={wp(14)} />
          </View>
        ) : (
          <View style={styles.drawerHeader}>
            <SvgXml xml={chessLogo} width={wp(10)} height={wp(14)} />
            <TouchableOpacity style={styles.xIcon} onPress={closeDrawer}>
              <SvgXml xml={xIcon} width={wp(8)} height={wp(8)} />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.userInfo}>
          <SvgXml
            xml={defaultPlayer}
            width={normalized.wp(12)}
            height={normalized.hp(12)}
            style={styles.userImg}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userFullName}>{user?.name}</Text>
            <Text
              style={[styles.userEmail, { width: "82%" }]}
              numberOfLines={2}
            >
              {user?.email}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/* <DrawerItemList {...props} /> */}
        {drawerItemRoutes.map((route, i) => (
          <TouchableOpacity
            key={i}
            style={styles.drawerItemLink}
            onPress={route.route}
          >
            {lang === "he" ? (
              <>
                <Text style={[styles.linkText]}>{route.name}</Text>
                <SvgXml
                  xml={route.icon}
                  width={normalized.wp(6)}
                  height={normalized.hp(6)}
                />
              </>
            ) : (
              <>
                <SvgXml
                  xml={route.icon}
                  width={normalized.wp(6)}
                  height={normalized.hp(6)}
                />
                <Text style={[styles.linkText]}>{route.name}</Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>
      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>V1.1</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.COLOR_WHITE,
  },
  contentContainer: {
    marginHorizontal: wp(4),
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  xIcon: {
    backgroundColor: AppStyles.color.COLOR_WHITE,
    width: normalized.wp(11.2),
    height: normalized.wp(11.2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalized.hp(10),
    elevation: 2.5,
    shadowColor: AppStyles.color.COLOR_BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 22,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: wp(6),
  },
  userDetails: {
    marginLeft: wp(2),
  },
  userImg: {
    elevation: 2.5,
    shadowColor: AppStyles.color.COLOR_BLACK,
    shadowOffset: { width: 0, height: 11 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  userFullName: {
    fontSize: fontSizes.regular,
    fontWeight: "700",
    color: AppStyles.color.RAISIN_BLACK,
  },
  userEmail: {
    fontSize: fontSizes.regular,
    fontWeight: "500",
    color: AppStyles.color.SPANISH_GRAY,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: AppStyles.color.COLOR_DARK_SEPERATOR,
    marginBottom: wp(4),
  },
  drawerFooter: {
    alignSelf: "center",
    marginBottom: normalized.hp(6),
  },
  drawerItemLink: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
    marginLeft: 8,
  },
  linkText: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: "80%",
    marginHorizontal: 12,
    color: "#222222",
  },
  footerText: {
    color: AppStyles.color.SONIC_SILVER,
    fontSize: fontSizes.regular,
  },
});
