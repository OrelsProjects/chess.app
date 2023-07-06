import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from 'app/components/CustomHeader';
import styles from './style';
import CustomInput from 'app/components/CustomInput';
import {
  googleIcon,
  handWave,
  leftArrowIcon,
  lockIcon,
  mailIcon,
  starIcon,
  calenderIcon,
} from 'app/assets/SVGs/index';
import ButtonCTA from 'app/components/ButtonCTA';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavigationService from 'app/navigation/NavigationService';

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [israel, setIsrael] = useState('');

  const navigateToLogin = () => NavigationService.navigate('Login');
  const insets = useSafeAreaInsets();
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
              onChangeText={e => setIsrael(e)}
            />
            <Text style={styles.noAccount}>
              By signing up, you're agree to our
              <TouchableOpacity>
                <Text style={styles.signUp}> Term & Conditions </Text>
              </TouchableOpacity>
              and
              <TouchableOpacity>
                <Text style={styles.signUp}> Privacy Policy</Text>
              </TouchableOpacity>
            </Text>

            <ButtonCTA
              customStyle={{ width: wp(90) }}
              buttonText={'Sign Up'}
              onPress={navigateToLogin}
            />
          </View>
          <Text style={styles.haveAccount}>
            Already have an account?
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.signUp}>Log In</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
