import React from 'react';
import { View, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface CustomInputProps {
  placeholder: string;
  value: string;
  iconName: string;
  secureTextEntry?: boolean | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  onChangeText: (text: string) => void;
  rightIcon: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  iconName,
  rightIcon,
}) => {
  return (
    <View style={styles.container}>
      <SvgXml xml={iconName} height={'20'} width={'20'} />
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        style={styles.input}
        value={value}
      />
      {rightIcon ? <SvgXml xml={rightIcon} height={'24'} width={'24'} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: hp(7),
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
    fontSize: 20,
    color: '#333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: wp(2),
    color: '#333',
  },
});

export default CustomInput;
