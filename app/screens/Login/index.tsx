import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";

import styles from "./styles";
import NavigationService from "../../navigation/NavigationService";
import { useStore } from "../../store";
import images from "../../config/images";
import CustomInput from "../../components/CustomInput";
import {
  googleIcon,
  handWave,
  leftArrowIcon,
  lockIcon,
  mailIcon,
} from "../../assets/SVGs/index";
import { SvgXml } from "react-native-svg";
import CustomHeader from "../../components/CustomHeader";
import ButtonCTA from "../../components/ButtonCTA";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import {
  setHeader,
  setOnBoarding,
  setToken,
  setUserInfo,
} from "../../redux/actions/action";
import { store } from "../../redux/store/store";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const lang = useSelector((state: any) => state.auth.language);
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [signUpUserpassword, setSignUpUserpassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const onLogin = () => {
    setIsLoggedIn(true);
  };

  const onForgot = () => NavigationService.navigate("ForgotPassword");
  const navigateToSignUp = () => NavigationService.navigate("SignUpScreen");
  const navigateToHome = () => NavigationService.navigate("Home");
  const dispatch = useDispatch();

  useEffect(() => {
    // NavigationService.navigate('ResetPassword')navigat
    dispatch(setOnBoarding(false));
  }, []);
  useEffect(() => {
    console.log("Language: ", lang);
  }, [lang]);
  useEffect(() => {
    console.log("test2");
  }, [setIsLoggedIn]);

  // let auth = async () => {
  //     setLoading(true);
  //     const username = email.toLowerCase();
  //     const password = userPassword;
  //     console.log("Login credentials:",username, password)

  //     Auth.signIn(username, '3456789').then(res=>{
  //         dispatch(setHeader(user.attributes.sub));
  //       onLogin();
  //         console.log("trdyt",res)
  //         setLoading(false)
  //     }).catch(err=>{
  //       console.log("Error:",err)
  //       console.log("Error: response:",err?.response?.data)
  //       setLoading(false)
  //     })
  // };
  let auth = async () => {
    try {
      setLoading(true);
      const username = email;
      const password = userPassword;
      console.log("Email and password:", username, password);
      const user = await Auth.signIn(username, password);
      const { name } = { name: user?.username };
      dispatch(setToken(user?.attributes?.sub));
      dispatch(setUserInfo({ name, email }));
      console.log("user", user);

      onLogin();

      setLoading(false);
    } catch (error) {
      console.error("Error occurred:", error);
      Alert.alert("Incorrect username or password");
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
              <Text style={[styles.welcome]}>
                {t("welcome")}
                <SvgXml xml={handWave} width={"28"} height={"28"} />
              </Text>
            </View>
            <Text style={[styles.loginToContinue]}>{t("loginToContinue")}</Text>
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
            <Text style={styles.labelStyle}>{t("forgotPassword")}</Text>
          </TouchableOpacity>

          <ButtonCTA
            customStyle={{ width: wp(90) }}
            buttonText={t("login")}
            onPress={auth}
            disabled={loading}
            loading={loading}
          />
          {/* {loading && (
            <View style={styles.buttonLoader}>
              <ActivityIndicator size="large" color="silver" />
            </View>
          )} */}
          <Text style={styles.orText}>{t("or")}</Text>

          <TouchableOpacity
            style={styles.googleSignInContainer}
            onPress={() => console.log("Google Sign in pressed")}
          >
            {lang === "en" ? (
              <>
                <SvgXml xml={googleIcon} width={"44"} height={"44"} />
                <Text style={styles.googleText}>{t("continueWithGoogle")}</Text>
              </>
            ) : (
              <>
                <Text style={styles.googleText}>{t("continueWithGoogle")}</Text>
                <SvgXml xml={googleIcon} width={"44"} height={"44"} />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* </View> */}
      </ScrollView>
      <View style={styles.secondaryButtonContainer}>
        {lang === "en" ? (
          <>
            <Text style={styles.noAccount}>{t("dontHaveAnAccount")}</Text>
            <TouchableOpacity onPress={navigateToSignUp}>
              <Text style={styles.signUp}>{t("signUp")}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={navigateToSignUp}>
              <Text style={styles.signUp}>{t("signUp")}</Text>
            </TouchableOpacity>
            <Text style={styles.noAccount}>{t("dontHaveAnAccount")}</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default Login;
