import React, { useState } from "react";
import { Text, View } from "react-native";
import NavigationService from "../../navigation/NavigationService";
import styles from "./styles";
import ButtonCTA from "../../components/ButtonCTA";
import CustomHeader from "../../components/CustomHeader";
import { leftArrowIcon } from "../../assets/SVGs";
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
import { useTranslation } from "react-i18next";
import { useStore } from "../../store/index";
import { DdLogs } from "@datadog/mobile-react-native";
import Snackbar from "react-native-snackbar";

interface OtpProps {
  route: {
    params: {
      username: string;
      email: string;
    };
  };
}

const EnterOTP: React.FC<OtpProps> = ({ route }) => {
  const { t } = useTranslation();
  const userName = route.params.username;
  const userEmail = route.params.email;
  const CELL_COUNT = 6;
  const [code, setCode] = useState("");
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const insets = useSafeAreaInsets();
  const goBack = () => NavigationService.goBack();
  const [loading, setLoading] = useState(false);

  const verifyOTP = async () => {
    if (code.length < 6) {
      return;
    }
    setLoading(true);
    try {
      await Auth.confirmSignUp(userName, code);
      setLoading(false);
      useStore.getState().setIsLoggedIn(true);
    } catch (error: any) {
      DdLogs.error(`Confirm sign up error: ${error}`);
      console.log(error);
      if (error.code === "CodeMismatchException") {
        Snackbar.show({
          text: t("otpCodeMismatch"),
          duration: Snackbar.LENGTH_LONG,
          textColor: "#fcfcfd",
          backgroundColor: "red",
        });
      } else {
        DdLogs.error(`Forgot password submit error: ${error}`);
        Snackbar.show({
          text: t("somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          textColor: "#fcfcfd",
          backgroundColor: "red",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <CustomHeader leftIcon={leftArrowIcon} onBackButtonPress={goBack} />
      <View style={styles.childContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>{t("enterOTP")}</Text>
          <Text style={styles.subHeading}>
            {t("a6DigitsCodeHasBeenSentToYourEmail")}{" "}
            <Text style={{ color: "#383838" }}>{userEmail}</Text>
          </Text>
        </View>

        <CodeField
          ref={ref}
          {...props}
          value={code}
          rootStyle={{
            marginVertical: hp(4),
          }}
          onChangeText={(value) => {
            setCode(value);
          }}
          cellCount={CELL_COUNT}
          keyboardType="phone-pad"
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
            verifyOTP();
          }}
          disabled={loading}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default EnterOTP;
