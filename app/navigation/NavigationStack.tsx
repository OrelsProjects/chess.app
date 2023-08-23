import * as React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { navigationRef } from "./NavigationService";

import Login from "../screens/Login";
import Home from "../screens/Home";
import ForgotPassword from "../screens/ForgotPassword";
import { setLanguage } from "../redux/actions/action";
import ThemeController from "../components/ThemeController";
import { StatusBar, Platform, NativeModules } from "react-native";
import { useStore } from "../store";
import EnterOTP from "../screens/OTP";
import ResetPassword from "../screens/ResetPassword";
import OnBordingScreen from "../screens/Onboarding";
import SignUpScreen from "../screens/SignUp";
import AddOpponent from "../screens/AddOpponent";
import CustomDrawer from "../components/CustomDrawer";
import AppStyles from "../config/styles";
import ChooseLanguage from "../screens/ChooseLanguage";
import { useSelector, useDispatch } from "react-redux";
import i18n from "../i18n";
import datadogConfig from "../../datadog.config";
import mixpanelConfig from "../../mixpanel.config";
import { DdSdkReactNative, DdLogs } from "@datadog/mobile-react-native";
import { DdRumReactNavigationTracking } from "@datadog/mobile-react-navigation";
import { useEffect } from "react";
import { Mixpanel } from "mixpanel-react-native";

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();

let isMixpanelInit = false;
let isDatadogInit = false;

const initializeDatadog = async () => {
  if (isDatadogInit) {
    return;
  }
  await DdSdkReactNative.initialize(datadogConfig);
  isDatadogInit = true;
};

const initializeMixpanel = () => {
  if (isMixpanelInit) {
    return;
  }
  new Mixpanel(mixpanelConfig.key, true).init();
  isMixpanelInit = true;
};

interface IProps {
  theme: Theme;
}

const AuthNavigator = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const onboarding = useSelector((state: any) => state.auth.Onboarding);
  const language = useSelector((state: any) => state.auth.language);
  const isRTL = language === "he";
  const dispatch = useDispatch();
  // Get the user's preferred languages
  if (language == "") {
    // const preferredLanguages = RNLocalize.getLocales();
    // const userLanguage =
    //   preferredLanguages.length > 0 ? preferredLanguages[0].languageCode : "en"; // Default to 'en' if language not available
    // dispatch(setLanguage(userLanguage));
    const appLanguage =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;
    if (appLanguage == "iw_" || appLanguage == "iw_IL") {
      dispatch(setLanguage("he"));
    } else {
      dispatch(setLanguage("en"));
    }
  }

  const appLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return (
    <AuthStack.Navigator initialRouteName="OnBordingScreen">
      {onboarding ? (
        <Stack.Screen
          name="OnBordingScreen"
          component={OnBordingScreen}
          options={{
            headerShown: false,
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation
            animationTypeForReplace: isLoggedIn ? "push" : "pop",
            headerRight: () => <ThemeController />,
          }}
        />
      ) : null}

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? "push" : "pop",
          headerRight: () => <ThemeController />,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? "push" : "pop",
          headerRight: () => <ThemeController />,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? "push" : "pop",
          headerRight: () => <ThemeController />,
        }}
      />
      <Stack.Screen
        name="EnterOTP"
        component={EnterOTP}
        options={{
          headerShown: false,
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? "push" : "pop",
          headerRight: () => <ThemeController />,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? "push" : "pop",
          headerRight: () => <ThemeController />,
        }}
      />
    </AuthStack.Navigator>
  );
};

const MainStackNavigator = () => {
  useEffect(() => {
    initializeDatadog();
    initializeMixpanel();
  }, []);

  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Languages" component={ChooseLanguage} />
      <Stack.Screen name="AddOpponent" component={AddOpponent} />
    </HomeStack.Navigator>
  );
};

const LoggedInNavigator = () => {
  const language = useSelector((state: any) => state.auth.language);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      // screenOptions={{
      //   headerShown: false,
      //   drawerActiveBackgroundColor: 'transparent',
      //   drawerInactiveTintColor: AppStyles.color.RAISIN_BLACK,
      //   drawerActiveTintColor: AppStyles.color.RAISIN_BLACK,
      //   drawerLabelStyle: {
      //     // marginLeft: -15,
      //     fontSize: fontSizes.regular,
      //   },
      //   drawerItemStyle: {
      //     // padding: 0,
      //     backgroundColor: 'red',
      //     borderRadius: 0,
      //   },
      // }}
      screenOptions={{
        swipeEnabled: true,
        drawerType: "front",

        drawerPosition: language == "he" ? "right" : "left",
        // drawerHideStatusBarOnOpen: true,
        drawerStyle: {
          // backgroundColor: colors.msuGreen,
        },
        sceneContainerStyle: { backgroundColor: AppStyles.color.COLOR_WHITE },
        // drawerHideStatusBarOnOpen: true,
      }}
    >
      <Drawer.Screen
        name="MainStackNavigator"
        component={MainStackNavigator}
        // options={{
        //   drawerIcon: ({ color }) => (
        //     <SvgXml
        //       xml={homeIcon}
        //       width={normalized.wp(6)}
        //       height={normalized.hp(6)}
        //     />
        //   ),
        // }}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

const App: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const language = useSelector((state: any) => state.auth.language);
  i18n.changeLanguage(language);
  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar
        barStyle={theme.dark ? "light-content" : "dark-content"}
        backgroundColor={theme.dark ? "black" : "white"}
      />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="HomeStack" component={LoggedInNavigator} />
        ) : (
          <Stack.Screen
            name="LoginStack"
            component={AuthNavigator}
            options={{
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: isLoggedIn ? "push" : "pop",
              headerRight: () => <ThemeController />,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
