import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface ButtonCTAProps {
  buttonText: string;
  customStyle: any;
  onPress: () => void;
  disabled?: boolean | undefined;
  loading?: boolean;
  dismissKeyboardOnClick?: boolean;
}

const ButtonCTA: React.FC<ButtonCTAProps> = ({
  customStyle,
  buttonText,
  onPress,
  disabled = false,
  loading = false,
  dismissKeyboardOnClick = true,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        customStyle,
        disabled && styles.disabledContainer, // Apply disabled style
      ]}
      onPress={() => {
        if (dismissKeyboardOnClick) {
          Keyboard.dismiss();
        }
        onPress();
      }}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator color={"white"} size={hp("4.5")} />
      ) : (
        <Text style={styles.text}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    borderColor: "black",
    height: hp(7),
    width: wp(80),
    alignItems: "center",
    justifyContent: "center",
  },
  text: { textAlign: "center", fontSize: 17, color: "white" },
  disabledContainer: {
    backgroundColor: "#D3D3D3", // Grey background for disabled state
  },
});

export default ButtonCTA;
