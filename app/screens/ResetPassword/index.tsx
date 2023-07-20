import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';

import NavigationService from 'app/navigation/NavigationService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { lockIcon } from 'app/assets/SVGs/index';

import styles from './styles';
import ButtonCTA from 'app/components/ButtonCTA';
import CustomHeader from 'app/components/CustomHeader';
import CustomInput from 'app/components/CustomInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const ResetPassword: React.FC = () => {
  const {t} = useTranslation()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigateToLogin = () => NavigationService.navigate('Login');
  const insets = useSafeAreaInsets();

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
            onPress={navigateToLogin}
          />
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
