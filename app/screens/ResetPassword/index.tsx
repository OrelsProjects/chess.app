import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';

import NavigationService from '../../navigation/NavigationService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { lockIcon } from '../../assets/SVGs/index';

import styles from './styles';
import ButtonCTA from '../../components/ButtonCTA';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Snackbar from 'react-native-snackbar';
import { Auth } from 'aws-amplify';

const ResetPassword: React.FC = ({ route }) => {
  const { t } = useTranslation()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigateToLogin = () => NavigationService.navigate('Login');
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false)
  const [showPassField, setShowPassFields] = useState(false)
  const email = route?.params?.email
  console.log("🚀 ~ file: index.tsx:34 ~ email:", email)

  const CELL_COUNT = 6;
  const [code, setCode] = useState('');
  console.log("🚀 ~ file: index.tsx:36 ~ code:", code)
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  // Collect confirmation code and new password
  async function forgotPasswordSubmit(email: string, code: string, newPassword: string, confirmPassword: string) {
    setLoading(true);
    if (newPassword !== confirmPassword) {
      Snackbar.show({
        text: 'Passwords do not match',
        // duration: Snackbar.LENGTH_INDEFINITE,
        textColor: '#fcfcfd',
        backgroundColor: 'red'
      });
      setLoading(false)
      return;
    }
    try {
      const data = await Auth.forgotPasswordSubmit(email, code, newPassword);
      console.log(data);
      navigateToLogin()
      setLoading(false)
      Snackbar.show({
        text: 'Password has been updated successfully',
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#fcfcfd',
        backgroundColor: '#007AFF'
      });
    } catch (err) {
      console.log(err);
      setLoading(false)
      Snackbar.show({
        text: err.toString(),
        duration: Snackbar.LENGTH_LONG,
        textColor: '#fcfcfd',
        backgroundColor: 'red'
      });
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
            <Text style={styles.heading}>{t('reset')} {t('password')}</Text>
            <Text style={styles.subHeading}>{t('loginToContinue')}</Text>
          </View>

          {!showPassField ?

            <>
              <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={code}
                onChangeText={value => {
                  setCode(value);
                  // setFieldValue('code', value);
                }}
                // onBlur={handleBlur('code')}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
              <ButtonCTA
                customStyle={{ width: wp(90) }}
                buttonText={'Continue'}
                onPress={() => setShowPassFields(true)}
              />
            </>
            : <>
              <CustomInput
                placeholder={`${t('new')} ${t('password')}`}
                value={newPassword}
                iconName={lockIcon}
                onChangeText={e => setNewPassword(e)}
                secureTextEntry={true}
                rightIcon={''}
              />
              <CustomInput
                placeholder={`${t('confirm')} ${t('new')} ${t('password')}`}
                value={confirmPassword}
                iconName={lockIcon}
                onChangeText={e => setConfirmPassword(e)}
                secureTextEntry={true}
                rightIcon={''}
              />

              <ButtonCTA
                customStyle={{ width: wp(90) }}
                buttonText={'Reset'}
                disabled={loading}
                loading={loading}
                onPress={() => forgotPasswordSubmit(email, code, newPassword, confirmPassword)}
              />
            </>
          }
        </View>
      </ScrollView>
      <View style={styles.secondaryButtonContainer}>
        <Text style={styles.noAccount}>{t('dontNeedToReset')} </Text>
        <TouchableOpacity>
          <Text style={styles.login}>{t('login')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;
