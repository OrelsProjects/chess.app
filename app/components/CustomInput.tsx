import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { eyeClosed, eyeOpen } from "../assets/SVGs/index";
import { filterConfig } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon";

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void | null;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  iconName?: string;
  rightIcon?: string;
  leftIcon?: string;
  onRightIconPress?: (() => void) | null;
  onLeftIconPress?: (() => void) | null;
  rightIconDisabled?: boolean;
  leftIconDisabled?: boolean;
  maxLength?: number;
  containerStyle?: object;
  editable?: boolean;
  isError?: boolean;
  rightIconSize?: number;
  leftIconSize?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  isLoading?: boolean;
}

type IconProps = {
  xml: string;
  onPress: (() => void) | null;
  disabled?: boolean;
  size?: number;
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
  containerStyle,
  rightIconSize = 24,
  leftIconSize = 24,
  onRightIconPress = null,
  onLeftIconPress = null,
  leftIconDisabled = false,
  rightIconDisabled = false,
  autoCapitalize = "none",
  maxLength = 500,
  editable = true,
  isError = false,
  isLoading = false,
}) => {
  const lang = useSelector((state: any) => state.auth.language);

  const [isFocused, setIsFocused] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handlePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const isRTL = lang === "he";
  const borderColor = isError ? "red" : isFocused ? "#007AFF" : "#ccc";

  const Icon: React.FC<IconProps> = ({
    xml,
    onPress,
    disabled = false,
    size = 24,
  }) =>
    disabled ? (
      ""
    ) : onPress ? (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <SvgXml xml={xml} height={size} width={size} />
      </TouchableOpacity>
    ) : (
      <SvgXml xml={xml} height={size} width={size} />
    );

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { borderColor, flexDirection: isRTL ? "row-reverse" : "row" },
      ]}
    >
      {leftIcon && (
        <Icon
          xml={leftIcon}
          onPress={() => {
            onLeftIconPress && onLeftIconPress();
          }}
          disabled={leftIconDisabled}
          size={leftIconSize}
        />
      )}

      {iconName && (
        <Icon
          xml={iconName}
          onPress={() => {
            onRightIconPress && onRightIconPress();
          }}
        />
      )}

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
        autoCapitalize={autoCapitalize}
      />

      {secureTextEntry && (
        <Icon
          xml={isPasswordVisible ? eyeOpen : eyeClosed}
          onPress={handlePasswordVisibility}
        />
      )}

      {isLoading ? (
        <ActivityIndicator size="small" color="#007AFF" />
      ) : (
        rightIcon && (
          <Icon
            xml={rightIcon}
            onPress={onRightIconPress}
            disabled={rightIconDisabled}
            size={rightIconSize}
          />
        )
      )}
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

export default CustomInput;
