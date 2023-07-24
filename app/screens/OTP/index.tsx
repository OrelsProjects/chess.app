import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import NavigationService from "app/navigation/NavigationService";
import styles from "./styles";
import ButtonCTA from "app/components/ButtonCTA";
import CustomHeader from "app/components/CustomHeader";
import { leftArrowIcon, mailIcon } from "app/assets/SVGs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Auth } from "aws-amplify";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useDispatch, useSelector } from "react-redux";
import { setHeader, Signup } from "app/redux/actions/action";
import { store } from "app/redux/store/store";
import { useTranslation } from "react-i18next";
import { useStore } from "app/store/index";

interface OtpProps {
  username: String;
}

const EnterOTP: React.FC<OtpProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispath = useDispatch();
  const { name, email } = useSelector((state: any) => state);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const signupUserInfo = useSelector((state: any) => state.auth.signupInfo);
  const userId = useSelector((state: any) => state.auth.user);
  const userName = route.params.username || "test";
  const userEmail = route.params.email || "test@gmail.com";
  // const israel_rt = route.params.israel_rt;

  const insets = useSafeAreaInsets();
  const goBack = () => NavigationService.goBack();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const navigateToResetPass = async () => {
    if (userName) {
      setLoading(true);
      try {
        await Auth.confirmSignUp(userName, value);
        console.log("Sign-up confirmed successfully.");
        setLoading(false);
        // NavigationService.resetStack('Home','hello')
        useStore.getState().setIsLoggedIn(true);
        // Continue with the confirmed user flow
      } catch (error) {
        console.error("Error confirming sign-up:", error);
        setLoading(false);
        // Display an appropriate error message to the user
      }
    } else {
      NavigationService.navigate("ResetPassword");
    }
  };

  const CELL_COUNT = 6;
  const [value, setValue] = useState("");
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
          <Text style={styles.heading}>{t("enterOTP")}</Text>
          <Text style={styles.subHeading}>
            {t("a4DigitsCodeHasBeenSentToYourEmail")}{" "}
            <Text style={{ color: "#383838" }}>{userEmail}</Text>
          </Text>
        </View>

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={(value) => {
            setValue(value);
            // setFieldValue('code', value);
          }}
          // onBlur={handleBlur('code')}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />

        <ButtonCTA
          customStyle={{ width: wp(90) }}
          buttonText={t("verify")}
          onPress={() => {
            navigateToResetPass();
            // verifyOTP();
          }}
          disabled={loading}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default EnterOTP;
