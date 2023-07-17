import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from 'app/components/CustomHeader';
import styles from './style';
import CustomInput from 'app/components/CustomInput';
import { useStore } from 'app/store';
import {
  lockIcon,
  mailIcon,
  starIcon,
  calenderIcon,
} from 'app/assets/SVGs/index';
import { Auth } from 'aws-amplify';
import ButtonCTA from 'app/components/ButtonCTA';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavigationService from 'app/navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { Signup, userSignupInfo } from 'app/redux/actions/action';
import { normalized } from 'app/config/metrics';

const SignUpScreen: React.FC = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [israel, setIsrael] = useState('');
  const [loading, setLoading] = useState(false);

  const insets = useSafeAreaInsets();

  const handleLogin = () => NavigationService.navigate('Login');
  const navigateToLogin = () =>
    fetchData(name, password, email, '+123456789',israel);
  //console.log("name, password", name, password);
  //NavigationService.navigate('Login');

  type SignUpParameters = {
    name: string;
    password: string;
    email: string;
    phoneNumber: string;
  };

  const fetchData = async (name, password, email, phoneNumber,israel) => {
    console.log("test",email)
    try {
      setLoading(true);
      const { user } = await Auth.signUp({
        username: name,
        password: password,

        attributes: {
          email: email, // optional
          phone_number: phoneNumber, // optional - E.164 number convention
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: false,
        },
      });

      NavigationService.navigate('EnterOTP', {
        username: name,
        password: password,
        email: email,
        israel_rt:israel
      });
    } catch (error) {
      console.log('error signing up:', error);
    } finally {
      setLoading(false);
    }
  };

  const dispatch = useDispatch();

  const handleUserInfo = async () => {
    try {
      let obj={
        first_name: name,
        gender: 'male',
        email: email,
        password: password,
        date_of_birth: birth,
      }
      dispatch(
        userSignupInfo(obj),
      );
      //console.log('userSignUp dispatched', name, email, password, birth);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  useEffect(() => {
    handleLogin;
  }, []);

  return (
    <View
      style={{ flexGrow: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
      <ScrollView>
        <View style={styles.container}>
          <CustomHeader />

          <View style={styles.childContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.welcome}>Sign Up </Text>
              <Text style={styles.loginToContinue}>
                Sign up for registration
              </Text>
            </View>
            <CustomInput
              placeholder="Name"
              value={name}
              iconName={mailIcon}
              onChangeText={e => setName(e)}
            />
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
            <CustomInput
              placeholder="Date of birth"
              value={birth}
              iconName={calenderIcon}
              onChangeText={e => setBirth(e)}
            />
            <CustomInput
              placeholder="Israel rating"
              value={israel}
              iconName={starIcon}
              maxLength={6}
              onChangeText={e => setIsrael(e)}
            />

            <View style={styles.mainSigningView}>
              <View style={styles.childSigningView}>
                <Text style={styles.noAccount}>
                  By signing up, you're agree to our
                </Text>
                <TouchableOpacity>
                  <Text style={styles.signUp}> Term & Conditions </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.andView}>
                <Text style={styles.noAccount}>and</Text>
                <TouchableOpacity>
                  <Text style={styles.signUpPolicy}> Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ButtonCTA
              customStyle={{ width: wp(90), top: normalized.hp(3) }}
              buttonText={'Sign Up'}
              onPress={() => {
                handleUserInfo();
                navigateToLogin();
              }}
              disabled={loading}
            />
            {loading && (
              <View style={styles.buttonLoader}>
                <ActivityIndicator size="large" color="silver" />
              </View>
            )}
          </View>
          <View style={styles.secondaryButtonContainer}>
            <Text style={styles.noAccountTwo}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.signUp}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
