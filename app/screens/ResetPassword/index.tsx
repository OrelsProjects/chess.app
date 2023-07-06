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

const ResetPassword: React.FC = () => {
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
            <Text style={styles.heading}>Reset Password</Text>
            <Text style={styles.subHeading}>Login in to continue</Text>
          </View>

          <CustomInput
            placeholder="New Password"
            value={newPassword}
            iconName={lockIcon}
            onChangeText={e => setNewPassword(e)}
            secureTextEntry={true}
          />
          <CustomInput
            placeholder="Confirm New Password"
            value={confirmPassword}
            iconName={lockIcon}
            onChangeText={e => setConfirmPassword(e)}
            secureTextEntry={true}
          />

          <ButtonCTA
            customStyle={{ width: wp(90) }}
            buttonText={'Reset'}
            onPress={navigateToLogin}
          />
        </View>
      </ScrollView>
      <View style={styles.secondaryButtonContainer}>
        <Text style={styles.noAccount}>Don't need to reset? </Text>
        <TouchableOpacity>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;
