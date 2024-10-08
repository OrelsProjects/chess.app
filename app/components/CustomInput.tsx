import React from "react";
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

interface CustomInputProps {
  placeholder: string;
  value: string;
  iconName: string;
  secureTextEntry?: boolean | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  rightIcon: string;
  onRightIconPress?: any;
  onLeftIconPress?: any;
  maxLength: any;
  containerStyle: object;
  editable: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  secureTextEntry,
  keyboardType,
  iconName,
  rightIcon,
  onRightIconPress,
  onLeftIconPress,
  maxLength = 500,
  containerStyle,
  editable,
}) => {
  const lang = useSelector((state: any) => state.auth.language);

  return (
    <View style={[styles.container, containerStyle]}>
      {lang === "en" ? (
        iconName ? (
          <TouchableOpacity onPress={onRightIconPress}>
            <SvgXml xml={iconName} height={"20"} width={"20"} />
          </TouchableOpacity>
        ) : null
      ) : rightIcon ? (
        <TouchableOpacity onPress={onRightIconPress}>
          <SvgXml xml={rightIcon} height={"24"} width={"24"} />
        </TouchableOpacity>
      ) : null}

      <TextInput
        editable={editable}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={"#8A8A8F"}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        style={[styles.input, { textAlign: lang === "en" ? "left" : "right" }]}
        value={value}
        maxLength={maxLength}
      />
      {lang === "hr" ? (
        iconName ? (
          <TouchableOpacity onPress={onRightIconPress}>
            <SvgXml xml={iconName} height={"20"} width={"20"} />
          </TouchableOpacity>
        ) : null
      ) : rightIcon ? (
        <TouchableOpacity onPress={onRightIconPress}>
          <SvgXml xml={rightIcon} height={"24"} width={"24"} />
        </TouchableOpacity>
      ) : null}
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
