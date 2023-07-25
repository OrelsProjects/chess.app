import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import NavigationService from '../../navigation/NavigationService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles';
import ButtonCTA from '../../components/ButtonCTA';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import { leftArrowIcon, mailIcon } from '../../assets/SVGs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Auth } from 'aws-amplify';
import Snackbar from 'react-native-snackbar';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const goBack = () => NavigationService.goBack();
  const [loading, setLoading] = useState(false)
  const navigateToOTP = () => NavigationService.navigate('EnterOTP');
  const navigateToResetPass = () => NavigationService.navigate("ResetPassword", { email: email })
  const insets = useSafeAreaInsets();


  // Send confirmation code to user's email
  async function forgotPassword(email: string) {
    setLoading(true);
    try {
      const data = await Auth.forgotPassword(email);
      console.log(data);
      navigateToResetPass()
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
      Snackbar.show({
        text: err.toString(),
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#fcfcfd',
        backgroundColor: 'red'
      });
    }
  };

  const validateEmail = (email) => {
    // Implement your email validation logic here.
    // For example, you can use a regular expression to validate the email format.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text)); // Update the isEmailValid state based on email validation
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <CustomHeader leftIcon={leftArrowIcon} onBackButtonPress={goBack} />
      <View style={styles.childContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>{t('forgotPassword')}</Text>
          <Text style={styles.subHeading}>
            {t('dontWorryItHappensPleaseEnterYourTheEmailAddressWithAssociatedWithYourAccount')}
          </Text>
        </View>

        <CustomInput
          placeholder={t('email')}
          value={email}
          iconName={mailIcon}
          onChangeText={handleEmailChange}
          keyboardType={'email-address'}
          rightIcon={''}
          isEmailValid={isEmailValid}
        />

        <ButtonCTA
          customStyle={{ width: wp(90) }}
          buttonText={t('submit')}
          onPress={() => forgotPassword(email)}
          disabled={loading}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
