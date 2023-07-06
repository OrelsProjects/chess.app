import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import NavigationService from 'app/navigation/NavigationService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles';
import ButtonCTA from 'app/components/ButtonCTA';
import CustomHeader from 'app/components/CustomHeader';
import CustomInput from 'app/components/CustomInput';
import { leftArrowIcon, mailIcon } from 'app/assets/SVGs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const goBack = () => NavigationService.goBack();
  const navigateToOTP = () => NavigationService.navigate("EnterOTP")
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop:insets.top}]} >
      <CustomHeader leftIcon={leftArrowIcon} onBackButtonPress={goBack} />
      <View style={styles.childContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Forgot Password</Text>
          <Text style={styles.subHeading}>
            Don't worry it happens. Please enter your the email address with
            associated with your account
          </Text>
        </View>

        <CustomInput
          placeholder="Email"
          value={email}
          iconName={mailIcon}
          onChangeText={e => setEmail(e)}
          keyboardType={'email-address'}
        />

        <ButtonCTA
          customStyle={{ width: wp(90) }}
          buttonText={'Submit'}
          onPress={navigateToOTP}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
