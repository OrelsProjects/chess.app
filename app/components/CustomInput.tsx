import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TouchableOpacity,
} from "react-native";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { eyeClosed, eyeOpen } from "../assets/SVGs/index";

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  iconName?: string;
  rightIcon?: string;
  leftIcon?: string;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
  maxLength?: number;
  containerStyle?: object;
  editable?: boolean;
  isEmailValid?: boolean;
}

type IconProps = {
  xml: string;
  onPress: () => void;
};

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  secureTextEntry,
  keyboardType,
  iconName,
  rightIcon,
  leftIcon,
  onRightIconPress,
  onLeftIconPress,
  maxLength = 500,
  containerStyle,
  editable = true,
  isEmailValid = true,
}) => {
  const lang = useSelector((state: any) => state.auth.language);

  const [isFocused, setIsFocused] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handlePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const isRTL = lang === "he"; // Assuming hr indicates RTL language
  const borderColor = !isFocused ? "#ccc" : isEmailValid ? "#007AFF" : "red";

  const Icon: React.FC<IconProps> = ({ xml, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <SvgXml xml={xml} height={"24"} width={"24"} />
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { borderColor, flexDirection: isRTL ? "row-reverse" : "row" },
      ]}
    >
      {leftIcon && <Icon xml={leftIcon} onPress={onLeftIconPress} />}
      
      {iconName && <Icon xml={iconName} onPress={onRightIconPress} />}
      
      <TextInput
        editable={editable}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={"#8A8A8F"}
        secureTextEntry={!isPasswordVisible}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.input,
          { textAlign: isRTL ? "right" : "left", marginHorizontal: wp(2) },
        ]}
        value={value}
        maxLength={maxLength}
      />
  
      {secureTextEntry && (
        <Icon xml={isPasswordVisible ? eyeOpen : eyeClosed} onPress={handlePasswordVisibility} />
      )}
      
      {rightIcon && <Icon xml={rightIcon} onPress={onRightIconPress} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: hp(7),
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
    fontSize: 20,
    color: "#333",
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: wp(2),
    color: "#333",
  },
});

CustomInput.defaultProps = {
  secureTextEntry: false,
  keyboardType: "default",
  iconName: "",
  rightIcon: "",
  leftIcon: "",
  onRightIconPress: () => {},
  onLeftIconPress: () => {},
  // onSubmitEditing: () => {},
  maxLength: 500,
  containerStyle: {},
  editable: true,
  isEmailValid: true,
};

CustomInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func,
  rightIcon: PropTypes.string.isRequired,
  rightIconName: PropTypes.string,
  onRightIconPress: PropTypes.func,
  maxLength: PropTypes.number,
  containerStyle: PropTypes.object,
  editable: PropTypes.bool.isRequired,
  isEmailValid: PropTypes.bool.isRequired,
};

export default CustomInput;
