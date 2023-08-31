import { Auth } from "aws-amplify";
import moment from "moment";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  mobileIcon,
} from "../../assets/SVGs/index";
import { formatPhoneNumber } from "../../utils/phoneNumberUtils";
import ButtonCTA from "../../components/ButtonCTA";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import { normalized } from "../../config/metrics";
import NavigationService from "../../navigation/NavigationService";
import { setToken, setUserInfo } from "../../redux/actions/action";
import { SIGNUP_FAILURE, SIGNUP_SUCCESS } from "../../redux/actions/actionType";
import styles from "./style";
import { BaseURL, endPoints } from "../../constants";
import Snackbar from "react-native-snackbar";
import axios from "axios";
import { DdLogs } from "@datadog/mobile-react-native";

// type of input, value and isError
interface IInputData {
  placeholder: string;
  value: string;
  isError?: boolean;
}

interface IValidatePlayerNumberData {
  isValidated: boolean;
}

const SignUpScreen: React.FC = () => {
  const { t } = useTranslation();
  const language = useSelector((state: any) => state.auth.language);
  const isRTL = language === "he";
  const [email, setEmail] = useState<IInputData>({
    placeholder: t("email"),
    value: "",
    isError: false,
  });

  const [phoneNumber, setPhoneNumber] = useState<IInputData>({
    placeholder: t("phoneNumber"),
    value: "",
    isError: false,
  });

  const [password, setPassword] = useState<IInputData>({
    placeholder: t("password"),
    value: "",
    isError: false,
  });

  const [username, setUsername] = useState<IInputData>({
    placeholder: t("username"),
    value: "",
    isError: false,
  });
  const [genderValue, setGenderValue] = useState("");
  const [genderError, setGenderError] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState<IInputData>({
    placeholder: t("dateOfBirth"),
    value: "",
    isError: false,
  });

  const [playerNumber, setPlayerNumber] = useState<IInputData>({
    placeholder: t("playerNumber"),
    value: "",
    isError: false,
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
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

  const validateFields = async (): Promise<boolean> => {
    try {
      setLoading(true);
      const usernameError = !validateUsername(username.value);
      const emailError = !validateEmail(email.value);
      const phoneNumberError = !validatePhoneNumber(phoneNumber.value);
      const passwordError = !password.value;
      const genderError = !genderValue;
      const dateOfBirthError = !dateOfBirth.value;
      const playerNumberError = !playerNumber.value;

      setUsername({ ...username, isError: usernameError });
      setEmail({ ...email, isError: emailError });
      setPhoneNumber({ ...phoneNumber, isError: phoneNumberError });
      setPassword({ ...password, isError: passwordError });
      setGenderError(genderError);
      setDateOfBirth({ ...dateOfBirth, isError: dateOfBirthError });
      setPlayerNumber({ ...playerNumber, isError: playerNumberError });
      if (
        usernameError ||
        emailError ||
        phoneNumberError ||
        passwordError ||
        genderError ||
        dateOfBirthError ||
        playerNumberError
      ) {
        Snackbar.show({
          text: t("signUpFieldsIncorrectDataError"),
          textColor: "#fcfcfd",
          backgroundColor: "red",
        });

        return false;
      } else {
        const result = await BaseURL.get<IValidatePlayerNumberData>(
          endPoints.validatePlayerNumber(playerNumber.value)
        );
        if (result && result.data && !result.data.isValidated) {
          Snackbar.show({
            text: t("playerNumberIncorrect"),
            textColor: "#fcfcfd",
            backgroundColor: "red",
          });
          setPlayerNumber({ ...playerNumber, isError: true });
          return false;
        }
      }
      return true;
    } catch (error) {
      setLoading(false);
      DdLogs.error(
        `Fields validation on signup error: ${JSON.stringify(error)}`
      );
      return false;
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
  };

  // Israeli phone number validation
  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneNumberRegex = /^05\d{8}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleEmailChange = (text: string) => {
    setEmail({
      ...email,
      value: text ? text.toLowerCase() : "",
      isError: !validateEmail(text),
    });
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber({
      ...phoneNumber,
      value: text,
      isError: !validatePhoneNumber(text),
    });
  };

  const handleUsernameChange = (text: string) => {
    setUsername({
      ...username,
      value: text ? text.toLowerCase() : "",
      isError: !validateUsername(text),
    });
  };

  const handlePasswordChange = (text: string) => {
    setPassword({
      ...password,
      value: text,
      isError: !text,
    });
  };

  const handleDateOfBirthChange = (text: string) => {
    setDateOfBirth({
      ...dateOfBirth,
      value: text,
      isError: !text,
    });
  };

  const handlePlayerNumberChange = (text: string) => {
    setPlayerNumber({
      ...playerNumber,
      value: text,
      isError: !text,
    });
  };

  const signUp = async () => {
    try {
      setLoading(true);
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber.value);
      const user = await Auth.signUp({
        username: username.value,
        password: password.value,
        attributes: {
          email: email?.value.toLowerCase(),
          phone_number: formattedPhoneNumber,
        },
        autoSignIn: {
          enabled: true,
        },
      });

      dispatch(setToken(user?.userSub));
      dispatch(setUserInfo(username.value, username.value));

      let objParam = {
        username: username.value,
        gender: genderValue,
        email: email.value,
        phone_number: formattedPhoneNumber,
        player_number: Number(playerNumber.value),
        date_of_birth: dateOfBirth.value,
        token: user?.userSub,
      };
      console.log("objParam ", objParam);
      saveUserApi(objParam);
    } catch (error: any) {
      setLoading(false);
      DdLogs.error(`Signup error: ${error}`);
      console.error(error);
      if (error.code === "UsernameExistsException") {
        Snackbar.show({
          text: t("usernameExists"),
          duration: Snackbar.LENGTH_SHORT,
          textColor: "#fcfcfd",
          backgroundColor: "red",
        });
        setUsername({ ...username, isError: true });
        return;
      }
      Snackbar.show({
        text: t("somethingWentWrong"),
        duration: Snackbar.LENGTH_SHORT,
        textColor: "#fcfcfd",
        backgroundColor: "red",
      });
    }
  };

  const saveUserApi = async (data: ISignupData) => {
    try {
      const {
        username,
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
        username,
        gender,
        email,
        phone_number,
        player_number,
        date_of_birth,
      };
      const response = await SignUpAPI.post(endPoints.signUp, apiParams);
      console.log("response ", JSON.stringify(response?.config?.data));

      setLoading(false);
      if (response) {
        dispatch({ type: SIGNUP_SUCCESS, payload: response.config.data });
        console.log("apiParams ", JSON.stringify(apiParams));
        NavigationService.navigate("EnterOTP", {
          username: apiParams.username,
          email: apiParams.email,
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      dispatch({ type: SIGNUP_FAILURE, payload: error });
      setLoading(false);
      DdLogs.error(`Signup error: ${error}`);
      Snackbar.show({
        text: t("somethingWentWrong"),
        textColor: "#fcfcfd",
        backgroundColor: "red",
      });
    }
  };

  const showTermsOfService = () => {
    const url = "https://israchessapp.wixsite.com/israchess/terms";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        DdLogs.warn("Don't know how to open URI: " + url);
      }
    });
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
              <Text
                style={[
                  styles.signupTitle,
                  {
                    textAlign: isRTL ? "right" : "left",
                  },
                ]}
              >
                {t("signUp")}
              </Text>
            </View>
            <CustomInput
              placeholder={t("username")}
              value={username.value}
              iconName={userIcon}
              onChangeText={handleUsernameChange}
              isError={username.isError}
            />
            <CustomInput
              placeholder={t("email")}
              value={email.value}
              iconName={mailIcon}
              onChangeText={handleEmailChange}
              isError={email.isError}
              keyboardType={"email-address"}
            />

            <CustomInput
              placeholder={`${t("phoneNumber")}`}
              value={phoneNumber.value}
              iconName={mobileIcon}
              maxLength={10}
              onChangeText={handlePhoneNumberChange}
              isError={phoneNumber.isError}
              keyboardType={"phone-pad"}
            />

            <DropDownPicker
              open={isDropDownOpen}
              value={genderValue}
              items={genderItems}
              setOpen={() => setIsDropDownOpen(!isDropDownOpen)}
              setValue={setGenderValue}
              setItems={setGenderItems}
              placeholder={t("gender")}
              style={[
                styles.dropdownContainer,
                { borderColor: genderError ? "red" : "#ccc" },
              ]}
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
                textAlign: isRTL ? "right" : "left",
              }}
            />

            <CustomInput
              placeholder={t("password")}
              value={password.value}
              iconName={lockIcon}
              onChangeText={(e) => handlePasswordChange(e)}
              isError={password.isError}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={[
                styles.datePickerContainer,
                { borderColor: dateOfBirth.isError ? "red" : "#ccc" },
              ]}
              onPress={() => setOpen(true)}
            >
              {lang === "he" ? (
                <>
                  <Text
                    style={[
                      styles.datePickerText,
                      styles.placeholder,
                      {
                        textAlign: lang === "he" ? "right" : "left",
                      },
                    ]}
                  >
                    {dateOfBirth.value ? dateOfBirth.value : t("dateOfBirth")}
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
                      dateOfBirth ? {} : { color: "#8A8A8F" },
                    ]}
                  >
                    {dateOfBirth.value ? dateOfBirth.value : t("dateOfBirth")}
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
                handleDateOfBirthChange(moment(date).format("DD-MM-YYYY"));
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <CustomInput
              placeholder={`${t("playerNumber")}`}
              value={playerNumber.value}
              iconName={starIcon}
              maxLength={6}
              onChangeText={(e) => handlePlayerNumberChange(e)}
              isError={playerNumber.isError}
              keyboardType="phone-pad"
            />

            <View style={[styles.mainSigningView]}>
              <View
                style={[
                  styles.childSigningView,
                  {
                    display: "flex",
                    flexDirection: isRTL ? "row-reverse" : "row",
                  },
                ]}
              >
                <Text style={styles.noAccount}>
                  {t("bySigningUpYoureAgreeToOur")}
                </Text>
                <TouchableOpacity onPress={() => showTermsOfService()}>
                  <Text style={styles.signUp}> {t("termsAndConditions")} </Text>
                </TouchableOpacity>
              </View>
            </View>

            <ButtonCTA
              customStyle={{ width: wp(90), top: normalized.hp(1) }}
              buttonText={t("signUp")}
              onPress={() => {
                validateFields().then((isValidated) => {
                  if (isValidated) {
                    signUp();
                  } else {
                    setLoading(false);
                  }
                });
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
