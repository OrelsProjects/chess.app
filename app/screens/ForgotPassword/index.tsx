import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

import NavigationService from "../../navigation/NavigationService";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import styles from "./styles";
import ButtonCTA from "../../components/ButtonCTA";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import { leftArrowIcon, mailIcon } from "../../assets/SVGs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Auth } from "aws-amplify";
import Snackbar from "react-native-snackbar";
import { DdLogs } from "@datadog/mobile-react-native";

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const goBack = () => NavigationService.goBack();
  const [loading, setLoading] = useState(false);
  const navigateToResetPass = () =>
    NavigationService.navigate("ResetPassword", { email: email });
  const insets = useSafeAreaInsets();

  async function forgotPassword(email: string) {
    setLoading(true);
    try {
      await Auth.forgotPassword(email);
      navigateToResetPass();
    } catch (error) {
      DdLogs.error(`Forgot password error: ${error}`);
      Snackbar.show({
        text: t("somethingWentWrong"),
        duration: Snackbar.LENGTH_SHORT,
        textColor: "#fcfcfd",
        backgroundColor: "#ff1a51",
      });
    } finally {
      setLoading(false);
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text)); // Update the isEmailValid state based on email validation
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <CustomHeader leftIcon={leftArrowIcon} onBackButtonPress={goBack} />
      <View style={styles.childContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>{t("forgotPassword")}</Text>
          <Text style={styles.subHeading}>{t("forgotPasswordText")}</Text>
        </View>

        <CustomInput
          placeholder={t("email")}
          value={email}
          iconName={mailIcon}
          onChangeText={handleEmailChange}
          keyboardType={"email-address"}
          rightIcon={""}
          isEmailValid={isEmailValid}
        />

        <ButtonCTA
          customStyle={{ width: wp(90) }}
          buttonText={t("submit")}
          onPress={() => forgotPassword(email)}
          disabled={loading}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
