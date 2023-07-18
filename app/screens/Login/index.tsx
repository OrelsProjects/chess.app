import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { setHeader } from 'app/redux/actions/action';
import { store } from 'app/redux/store/store';

const Login: React.FC = () => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [signUpUserpassword, setSignUpUserpassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const onLogin = () => {
    setIsLoggedIn(true);
  };



  const onForgot = () => NavigationService.navigate('ForgotPassword');
  const navigateToSignUp = () => NavigationService.navigate('SignUpScreen');
  const navigateToHome = () => NavigationService.navigate('Home');
  const dispatch = useDispatch();



  let auth = async () => {
    try {
      setLoading(true);
      const username = email;
      const password = userPassword;
      const user = await Auth.signIn(username, password);
      dispatch(setHeader(user.attributes.sub));
      onLogin();
   
    } catch (error) {
      console.error('Error occurred:', error);
      Alert.alert('Incorrect username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ flexGrow: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <CustomHeader />
        <View style={styles.childContainer}>
       
          <View style={styles.headerContainer}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcome}>Welcome</Text>
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
            rightIcon={''}
          />
          <CustomInput
            placeholder="Password"
            value={userPassword}
            iconName={lockIcon}
            onChangeText={e => setUserPassword(e)}
            secureTextEntry={true}
            rightIcon={''}
          />

          <TouchableOpacity style={styles.forgotPass} onPress={onForgot}>
            <Text style={styles.labelStyle}>Forgot Password</Text>
          </TouchableOpacity>

          <ButtonCTA
            customStyle={{ width: wp(90) }}
            buttonText={'Login'}
            onPress={auth}
            disabled={loading}
          />
          {loading && (
            <View style={styles.buttonLoader}>
              <ActivityIndicator size="large" color="silver" />
            </View>
          )}
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
