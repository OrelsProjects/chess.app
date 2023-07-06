import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import NavigationService from 'app/navigation/NavigationService';
import styles from './styles';
import ButtonCTA from 'app/components/ButtonCTA';
import CustomHeader from 'app/components/CustomHeader';
import CustomInput from 'app/components/CustomInput';
import { leftArrowIcon, mailIcon } from 'app/assets/SVGs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

const EnterOTP: React.FC = () => {
  const insets = useSafeAreaInsets();
  const goBack = () => NavigationService.goBack();
  const navigateToResetPass = () => NavigationService.navigate("ResetPassword")

  const CELL_COUNT = 4;
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
            <Text style={{ color: '#383838' }}>email@gmail.com</Text>
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

        <ButtonCTA
          customStyle={{ width: wp(90) }}
          buttonText={'Verify'}
          onPress={navigateToResetPass}
        />
      </View>
    </View>
  );
};

export default EnterOTP;
