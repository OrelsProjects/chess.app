import { Auth } from "aws-amplify";
import moment from "moment";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import {
  calenderIcon,
  lockIcon,
  mailIcon,
  userIcon,
  starIcon,
} from "../../assets/SVGs/index";
import ButtonCTA from "../../components/ButtonCTA";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import { normalized } from "../../config/metrics";
import NavigationService from "../../navigation/NavigationService";
import { setToken, setUserInfo } from "../../redux/actions/action";
import { SIGNUP_FAILURE, SIGNUP_SUCCESS } from "../../redux/actions/actionType";
import styles from "./style";
import { endPoints } from "../../constants";
import Snackbar from "react-native-snackbar";
import axios from "axios";

const SignUpScreen: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [israel, setIsrael] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [items, setItems] = useState([
    { label: `${t("male")}`, value: "male", labelStyle: { color: "#8A8A8F" } },
    {
      label: `${t("female")}`,
      value: "female",
      labelStyle: { color: "#8A8A8F" },
    },
  ]);
  const dispatch = useDispatch();
  const lang = useSelector((state: any) => state.auth.language);

  const insets = useSafeAreaInsets();

  const handleLogin = () => NavigationService.navigate("Login");
  const authSignup = () =>
    fetchData(name, password, email, phoneNumber, gender, birth, israel);

  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };

  const fetchData = async (
    name: string,
    password: string,
    email: string,
    phoneNumber: string,
    gender: string,
    birth: string,
    israel: string
  ) => {
    let errorText = null;
    if (!name) {
      errorText = "Name is missing";
    } else if (!email) {
      errorText = "Email is missing";
    } else if (!phoneNumber) {
      errorText = "Phone number is missing";
    } else if (!password) {
      errorText = "Password is missing";
    }

    if (errorText) {
      Snackbar.show({
        text: errorText,
        textColor: "#fcfcfd",
        backgroundColor: "red",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const user = await Auth.signUp({
        username: name,
        password: password,
        attributes: {
          email: email?.toLowerCase(),
          phone_number: "+" + phoneNumber,
        },
        autoSignIn: {
          enabled: false,
        },
      });
      dispatch(setToken(user?.userSub));

      const interval = setInterval(() => {
        dispatch(setUserInfo({ name, email }));
        let objParam = {
          first_name: name,
          last_name: "testing",
          gender: gender,
          email: email,
          phone_number: "+" + phoneNumber,
          player_number: Number(israel),
          date_of_birth: birth,
          token: user?.userSub,
        };
        Signup(objParam);
        clearInterval(interval);
      }, 1000);
    } catch (error) {
      setLoading(false);
      Snackbar.show({
        text: error.toString(),
        duration: Snackbar.LENGTH_SHORT,
        textColor: "#fcfcfd",
        backgroundColor: "red",
      });
    } 
  };

  const Signup = async (data: SignupData) => {
    try {
      const {
        first_name,
        last_name,
        gender,
        email,
        phone_number,
        player_number,
        date_of_birth,
        token,
      } = data;

      const SignUpAPI = axios.create({
        baseURL: "https://0j3kvj5lpl.execute-api.us-east-1.amazonaws.com",
        headers: {
          "content-type": "text/plain; charset=utf-8",
          UserId: token,
        },
      });

      let apiParams = {
        first_name,
        last_name,
        gender,
        email,
        phone_number,
        player_number,
        date_of_birth,
      };
      const response = await SignUpAPI.post(endPoints.signUp, apiParams);

      setLoading(false);
      if (response) {
        dispatch({ type: SIGNUP_SUCCESS, payload: response.config.data });

        NavigationService.navigate("EnterOTP", {
          username: apiParams.first_name,
          email: apiParams.email,
        });
      }
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error });
      setLoading(false);
      Snackbar.show({
        text: error?.response?.data.toString(),
        textColor: "#fcfcfd",
        backgroundColor: "red",
      });
    }
  };

  return (
    <View
      style={{ flexGrow: 1, backgroundColor: "#fff", paddingTop: insets.top }}
    >
      <ScrollView>
        <View style={styles.container}>
          <CustomHeader />

          <View style={styles.childContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.welcome}>{t("signUp")} </Text>
              <Text style={styles.loginToContinue}>
                {t("signUpForRegistration")}
              </Text>
            </View>
            <CustomInput
              placeholder={t("username")}
              value={name}
              iconName={userIcon}
              onChangeText={(e) => setName(e)}
            />
            <CustomInput
              placeholder={t("email")}
              value={email}
              iconName={mailIcon}
              onChangeText={handleEmailChange}
              isEmailValid={isEmailValid}
              keyboardType={"email-address"}
            />

            <CustomInput
              placeholder={`${t("phoneNumber")}`}
              value={phoneNumber}
              iconName={starIcon}
              maxLength={10}
              onChangeText={(e) => setPhoneNumber(e)}
              keyboardType={"phone-pad"}
            />

            <DropDownPicker
              open={isDropDownOpen}
              value={gender}
              items={items}
              setOpen={() => setIsDropDownOpen(!isDropDownOpen)}
              setValue={setGender}
              setItems={setItems}
              placeholder={`${t("gender")}`}
              style={styles.datePickerContainer}
              placeholderStyle={{
                color: "#8A8A8F",
                fontSize: 16,
              }}
              dropDownContainerStyle={{
                borderColor: "#ccc",
              }}
              textStyle={{
                color: "#333",
                fontSize: 16,
              }}
            />

            <CustomInput
              placeholder={t("password")}
              value={password}
              iconName={lockIcon}
              onChangeText={(e) => setPassword(e)}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.datePickerContainer}
              onPress={() => setOpen(true)}
            >
              {lang === "he" ? (
                <>
                  <Text
                    style={[
                      styles.datePickerText,
                      { textAlign: lang === "he" ? "right" : "left" },
                      birth ? {} : { color: "#8A8A8F" },
                    ]}
                  >
                    {birth ? birth : t("dateOfBirth")}
                  </Text>
                  <SvgXml xml={calenderIcon} height={"20"} width={"20"} />
                </>
              ) : (
                <>
                  <SvgXml xml={calenderIcon} height={"20"} width={"20"} />
                  <Text
                    style={[
                      styles.datePickerText,
                      { textAlign: lang === "he" ? "right" : "left" },
                      birth ? {} : { color: "#8A8A8F" },
                    ]}
                  >
                    {birth ? birth : t("dateOfBirth")}
                  </Text>
                </>
              )}
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={open}
              locale={lang}
              date={new Date()}
              onConfirm={(date) => {
                setOpen(false);
                setBirth(moment(date).format("DD-MM-YYYY"));
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <CustomInput
              placeholder={`${t("playerNumber")}`}
              value={israel}
              iconName={starIcon}
              maxLength={6}
              onChangeText={(e) => setIsrael(e)}
              keyboardType="phone-pad"
            />

            <View style={styles.mainSigningView}>
              <View style={styles.childSigningView}>
                <Text style={styles.noAccount}>
                  {t("bySigningUpYoureAgreeToOur")}
                </Text>
                <TouchableOpacity>
                  <Text style={styles.signUp}> {t("termsAndConditions")} </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.andView}>
                <Text style={styles.noAccount}>{t("and")}</Text>
                <TouchableOpacity>
                  <Text style={styles.signUpPolicy}> {t("privacyPolicy")}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ButtonCTA
              customStyle={{ width: wp(90), top: normalized.hp(3) }}
              buttonText={t("signUp")}
              onPress={() => {
                authSignup();
              }}
              disabled={loading}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
