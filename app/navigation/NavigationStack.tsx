import * as React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { navigationRef } from './NavigationService';

import Login from 'app/screens/Login';
import Home from 'app/screens/Home';
import ForgotPassword from 'app/screens/ForgotPassword';

import ThemeController from '../components/ThemeController';
import { StatusBar } from 'react-native';
import { useStore } from '../store';
import EnterOTP from 'app/screens/OTP';
import ResetPassword from 'app/screens/ResetPassword';
import OnBordingScreen from 'app/screens/Onboarding';
import SignUpScreen from 'app/screens/SignUp';
import AddOpponent from 'app/screens/AddOpponent';
import CustomDrawer from 'app/components/CustomDrawer';
import AppStyles from 'app/config/styles';
import ChooseLanguage from 'app/screens/ChooseLanguage';
import { useSelector } from 'react-redux';
import i18n from 'app/i18n';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();

interface IProps {
  theme: Theme;
}

const AuthNavigator = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn);
  const onboarding = useSelector((state:any)=>state.auth.Onboarding)

  return (
    <AuthStack.Navigator initialRouteName="OnBordingScreen">
      {onboarding?
        <Stack.Screen
        name="OnBordingScreen"
        component={OnBordingScreen}
        options={{
          headerShown: false,
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
      :null}
      
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
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
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
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
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
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
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
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
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
    </AuthStack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Languages" component={ChooseLanguage} />
      <Stack.Screen name="AddOpponent" component={AddOpponent} />
    </HomeStack.Navigator>
  );
};

const LoggedInNavigator = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
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
      drawerType: 'front',
      // drawerHideStatusBarOnOpen: true,
      drawerStyle: {
        // backgroundColor: colors.msuGreen,
      },
      sceneContainerStyle: { backgroundColor: AppStyles.color.COLOR_WHITE },
      // drawerHideStatusBarOnOpen: true,
    }}>
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

const App: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const isLoggedIn = useStore(state => state.isLoggedIn);
  const language = useSelector((state:any)=>state.auth.language)
  console.log("Language in stack:",language)
  i18n.changeLanguage(language);
  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.dark ? 'black' : 'white'}/>

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
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
              headerRight: () => <ThemeController />,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
