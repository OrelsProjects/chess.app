import React, { useEffect, useState } from 'react';
import { Text, View,ActivityIndicator } from 'react-native';
import NavigationService from 'app/navigation/NavigationService';
import styles from './styles';
import ButtonCTA from 'app/components/ButtonCTA';
import CustomHeader from 'app/components/CustomHeader';
import { leftArrowIcon, mailIcon } from 'app/assets/SVGs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';
import { setHeader, Signup } from 'app/redux/actions/action';
import { store } from 'app/redux/store/store';
import { useStore } from 'app/store';

interface OtpProps {
  username: String;
}

const EnterOTP: React.FC<OtpProps> = ({ route }) => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const signupUserInfo = useSelector((state: any) => state.auth.signupInfo);
  const userId = useSelector((state: any) => state.auth.user);
  const userName = route.params.username;
  const userEmail = route.params.email;
  const israel_rt = route.params.israel_rt;

  const insets = useSafeAreaInsets();
  const goBack = () => NavigationService.goBack();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  

  const navigateToResetPass = async () => {
    if (route.params.username && route.params.password) {
      try {
        await Auth.confirmSignUp(route.params.username, value);
        console.log('Sign-up confirmed successfully.');
        // NavigationService.navigate('Login');
        const user = await Auth.signIn(
          route.params.username,
          route.params.password,
        );
        //sign up here and navigate to home.
        dispatch(setHeader(user.attributes.sub));
        setLoading(true)
        setTimeout(() => {
       
          verifyOTP();
        }, 3000);
        // Continue with the confirmed user flow
      } catch (error) {
        console.error('Error confirming sign-up:', error);
        // Display an appropriate error message to the user
      }
    } else {
      NavigationService.navigate('ResetPassword');
    }
  };

  const verifyOTP = async () => {

    try {
      let objParam={
        first_name: userName,
        last_name: 'testing',
        gender: 'male',
        email: userEmail,
        phone_number: '0543442286',
        player_number: Number(israel_rt),
        date_of_birth: '12-12-2020',
      }
      dispatch(Signup(objParam));
      setLoading(false)
     
    } catch (error) {
      console.error('Signup error:', error);
     
    }
  };

  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <CustomHeader leftIcon={leftArrowIcon} onBackButtonPress={goBack} />
      <View style={styles.childContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Enter OTP</Text>
          <Text style={styles.subHeading}>
            A 4 digits code has been sent to your email{' '}
            <Text style={{ color: '#383838' }}>{userEmail}</Text>
          </Text>
        </View>

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={value => {
            setValue(value);
            // setFieldValue('code', value);
          }}
          // onBlur={handleBlur('code')}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
  {loading && (
              <View style={styles.buttonLoader}>
                <ActivityIndicator size="large" color="silver" />
              </View>
            )}
        <ButtonCTA
          customStyle={{ width: wp(90) }}
          buttonText={'Verify'}
          onPress={() => {
            navigateToResetPass();
            // verifyOTP();
          }}
        />
      </View>
    </View>
  );
};

export default EnterOTP;
