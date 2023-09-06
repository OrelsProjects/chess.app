import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import styles from "./styles";
import NavigationService from "../../navigation/NavigationService";
import { useStore } from "../../store";
import CustomInput from "../../components/CustomInput";
import {
  googleIcon,
  handWave,
  lockIcon,
  mailIcon,
} from "../../assets/SVGs/index";
import { SvgXml } from "react-native-svg";
import CustomHeader from "../../components/CustomHeader";
import ButtonCTA from "../../components/ButtonCTA";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import {
  removeUserInfo,
  setOnBoarding,
  setToken,
  setUserInfo,
} from "../../redux/actions/action";
import { useTranslation } from "react-i18next";
import Snackbar from "react-native-snackbar";
import { DdLogs } from "@datadog/mobile-react-native";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const lang = useSelector((state: any) => state.auth.language);
  const isRTL = lang === "he";
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const onForgot = () => NavigationService.navigate("ForgotPassword");
  const navigateToSignUp = () => NavigationService.navigate("SignUpScreen");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOnBoarding(false));
  }, []);

  let auth = async () => {
    try {
      setLoading(true);
      const username = email;
      const password = userPassword;
      const user = await Auth.signIn(username, password);
      if (user) {
        const { username } = user;
        dispatch(setToken(user?.attributes?.sub));
        dispatch(
          setUserInfo({ userInfo: { name: username, email }, isLoggedIn: true })
        );
        setIsLoggedIn(true);
      }
      setLoading(false);
    } catch (error: unknown) {
      const typedError = error as CustomError;
      dispatch(removeUserInfo());
      setIsLoggedIn(false, "isLoggedIn");
      if (typedError.code === "NotAuthorizedException") {
        Snackbar.show({
          text: t("incorrectUsernameOrPassword"),
          duration: Snackbar.LENGTH_SHORT,
          textColor: "#fcfcfd",
          backgroundColor: "#ff1a51",
        });
        return;
      }
      console.log(error);
      DdLogs.error(`Login error: ${error}`);
      Snackbar.show({
        text: t("somethingWentWrong"),
        duration: Snackbar.LENGTH_SHORT,
        textColor: "#fcfcfd",
        backgroundColor: "#ff1a51",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ flexGrow: 1, backgroundColor: "#fff", paddingTop: insets.top }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <CustomHeader />
        <View style={styles.childContainer}>
          <View style={[styles.headerContainer]}>
            <View style={[styles.welcomeContainer]}>
              <Text
                style={[
                  styles.welcome,
                  { textAlign: isRTL ? "right" : "left" },
                ]}
              >
                {t("welcome")}
                <SvgXml xml={handWave} width={"28"} height={"28"} />
              </Text>
            </View>
            <Text
              style={[
                styles.loginToContinue,
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {t("loginToContinue")}
            </Text>
          </View>
          <CustomInput
            placeholder={t("email")}
            value={email}
            iconName={mailIcon}
            onChangeText={(e) => setEmail(e)}
            keyboardType={"email-address"}
            rightIcon={""}
          />
          <CustomInput
            placeholder={t("password")}
            value={userPassword}
            iconName={lockIcon}
            onChangeText={(e) => setUserPassword(e)}
            onSubmitEditing={auth}
            secureTextEntry={true}
            rightIcon={""}
          />
          <TouchableOpacity style={styles.forgotPass} onPress={onForgot}>
            <Text
              style={[
                styles.labelStyle,
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {t("forgotPassword")}
            </Text>
          </TouchableOpacity>
          <ButtonCTA
            customStyle={{ width: wp(90) }}
            buttonText={t("login")}
            onPress={auth}
            disabled={loading}
            loading={loading}
          />
        </View>
      </ScrollView>
      <View style={styles.secondaryButtonContainer}>
        {lang === "he" ? (
          <>
            <TouchableOpacity onPress={navigateToSignUp}>
              <Text style={styles.signUp}> {t("signUp")} </Text>
            </TouchableOpacity>
            <Text style={styles.noAccount}> {t("dontHaveAnAccount")} </Text>
          </>
        ) : (
          <>
            <Text style={styles.noAccount}> {t("dontHaveAnAccount")} </Text>
            <TouchableOpacity onPress={navigateToSignUp}>
              <Text style={styles.signUp}> {t("signUp")} </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default Login;
