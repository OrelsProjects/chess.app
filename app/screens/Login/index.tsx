import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

import styles from './styles';
import NavigationService from 'app/navigation/NavigationService';
import { useStore } from 'app/store';
import images from 'app/config/images';
import CustomInput from 'app/components/CustomInput';
import {
  googleIcon,
  handWave,
  leftArrowIcon,
  lockIcon,
  mailIcon,
} from 'app/assets/SVGs/index';
import { SvgXml } from 'react-native-svg';
import CustomHeader from 'app/components/CustomHeader';
import ButtonCTA from 'app/components/ButtonCTA';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Login: React.FC = () => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const insets = useSafeAreaInsets();
  const onLogin = () => {
    setIsLoggedIn(true);
  };

  const onForgot = () => NavigationService.navigate('ForgotPassword');
  const navigateToSignUp = () => NavigationService.navigate('SignUpScreen')

  return (
    <View
      style={{ flexGrow: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <CustomHeader />
        <View style={styles.childContainer}>
          {/* <Image source={images.icons.chessLogo} style={styles.chesslogo} /> */}
          <View style={styles.headerContainer}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcome}>Welcome </Text>
              <SvgXml xml={handWave} width={'28'} height={'28'} />
            </View>
            <Text style={styles.loginToContinue}>Login to continue</Text>
          </View>

          <CustomInput
            placeholder="Email"
            value={email}
            iconName={mailIcon}
            onChangeText={e => setEmail(e)}
            keyboardType={'email-address'}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            iconName={lockIcon}
            onChangeText={e => setPassword(e)}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.forgotPass} onPress={onForgot}>
            <Text style={styles.labelStyle}>Forgot Password</Text>
          </TouchableOpacity>

          <ButtonCTA
            customStyle={{ width: wp(90) }}
            buttonText={'Login'}
            onPress={onLogin}
          />
          <Text style={styles.orText}>Or</Text>

          <TouchableOpacity
            style={styles.googleSignInContainer}
            onPress={() => console.log('Google Sign in pressed')}>
            <SvgXml xml={googleIcon} width={'44'} height={'44'} />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* </View> */}
      </ScrollView>
      <View style={styles.secondaryButtonContainer}>
        <Text style={styles.noAccount}>Don't have an account? </Text>
        <TouchableOpacity onPress={navigateToSignUp}>
          <Text style={styles.signUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Login;
