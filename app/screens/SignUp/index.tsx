import { Auth } from "aws-amplify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import DatePicker from "react-native-date-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import {
  calenderIcon,
  lockIcon,
  mailIcon,
  starIcon,
} from "../../assets/SVGs/index";
import ButtonCTA from "../../components/ButtonCTA";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import { normalized } from "../../config/metrics";
import NavigationService from "../../navigation/NavigationService";
import {
  setToken,
  setUserInfo,
  userSignupInfo
} from "../../redux/actions/action";
import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SET_TOKEN
} from "../../redux/actions/actionType";
import styles from "./style";
import { BaseURL, endPoints } from "../../constants";
import Snackbar from 'react-native-snackbar';
import axios from "axios";
import { store } from "../../redux/store/store";

const SignUpScreen: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [israel, setIsrael] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [items, setItems] = useState([
    {
      label: `${t('male')}`, value: 'male', labelStyle: {
        color: "#8A8A8F"
      }
    },
    {
      label: `${t('female')}`, value: 'female', labelStyle: {
        color: "#8A8A8F"
      }
    }
  ]);
  const dispatch = useDispatch();
  const lang = useSelector((state: any) => state.auth.language);

  const insets = useSafeAreaInsets();

  const handleLogin = () => NavigationService.navigate("Login");
  const authSignup = () =>
    fetchData(name, password, email, phoneNumber, gender, birth, israel);
  //console.log("name, password", name, password);
  //NavigationService.navigate('Login');

  type SignUpParameters = {
    name: string;
    password: string;
    email: string;
    phoneNumber: string;
    gender: string
    israel: string
  };

  interface SignupData {
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    // password: string;
    phone_number: string;
    player_number: number;
    date_of_birth: number;
    token:any
  }

  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email) => {
    // Implement your email validation logic here.
    // For example, you can use a regular expression to validate the email format.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text)); // Update the isEmailValid state based on email validation
  };

  const fetchData = async (name, password, email, phoneNumber, gender, birth, israel) => {
    console.log("test", email);
    if (!name || !email) {
      console.log('Name or Email is missing');
      Snackbar.show({
        text: 'Name or Email is missing',
        // duration: Snackbar.LENGTH_INDEFINITE,
        textColor: '#fcfcfd',
        backgroundColor: 'red'
      });
      setLoading(false)
      return;
    }
    if (!birth) {
      console.log('first_name or email or date_of_birth missing');
      Snackbar.show({
        text: 'Date of birth is not valid',
        // duration: Snackbar.LENGTH_INDEFINITE,
        textColor: '#fcfcfd',
        backgroundColor: 'red'
      });
      setLoading(false)
      return;
    }

    try {
      setLoading(true);
      const user = await Auth.signUp({
        username: name,
        password: password,

        attributes: {
          email: email?.toLowerCase(), // optional
          phone_number: "+" + phoneNumber, // optional - E.164 number convention
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: false,
        },
      });
      console.log("zest", JSON.stringify(user));
      dispatch(setToken(user?.userSub));

      const interval = setInterval(() => {
        dispatch(setUserInfo({ name, email }));
        try {
          let objParam = {
            first_name: name,
            last_name: "testing",
            gender: gender,
            email: email,
            phone_number: "+" + phoneNumber,
            player_number: Number(israel),
            date_of_birth: birth,
            token: user?.userSub
          };
          console.log("🚀 ~ file: index.tsx:144 ~ interval ~ objParam:", objParam)
          // dispatch(Signup(objParam));
          Signup(objParam)
          // setLoading(false);
          clearInterval(interval);
        } catch (error) {
          setLoading(false);
          console.error("Signup error:", error);
        }
      }, 1000);

      // NavigationService.navigate('EnterOTP', {
      //   username: name,
      //   password: password,
      //   email: email,
      //   israel_rt:israel
      // });
    } catch (error) {
      setLoading(false);
      console.log("error signing up:", error);
      Snackbar.show({
        text: error.toString(),
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#fcfcfd',
        backgroundColor: 'red'
      });
    } finally {
      // setLoading(false);
    }
  };

  const Signup = async (data: SignupData) => {
    console.log('Check Before API data ==> ', data);
    try {
      const {
        first_name,
        last_name,
        gender,
        email,
        phone_number,
        player_number,
        date_of_birth,
        token
      } = data;

      const SignUpAPI = axios.create({
        baseURL: "https://0j3kvj5lpl.execute-api.us-east-1.amazonaws.com",
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "UserId": token,
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
      }
      console.log('apiParams22', apiParams)
      const response = await SignUpAPI.post(endPoints.signUp, apiParams);

      console.log("testing", response)
      setLoading(false)
      if (response) {
        dispatch({ type: SIGNUP_SUCCESS, payload: response.config.data });

        //  useStore.getState().setIsLoggedIn(true)
        NavigationService.navigate('EnterOTP', {
          username: apiParams.first_name,
          email: apiParams.email,
        });
        // dispatch(set)
        console.log('response Sign Up Data:', response.config.data);
      }
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error });
      setLoading(false)
      console.log('error:', error);
      console.log('Error response:', error?.response?.data)
      Snackbar.show({
        text: error?.response?.data.toString(),
        // duration: Snackbar.LENGTH_INDEFINITE,
        textColor: '#fcfcfd',
        backgroundColor: 'red'
      });
    }

  };

  useEffect(() => {
    console.log("Password:", password);
  }, [password]);
  const verifyOTP = async () => { };



  const handleUserInfo = async () => {
    try {
      let obj = {
        first_name: name,
        gender: "male",
        email: email.toLowerCase(),
        password: password,
        date_of_birth: birth,
      };
      dispatch(userSignupInfo(obj));
      //console.log('userSignUp dispatched', name, email, password, birth);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  // useEffect(() => {
  //   handleLogin;
  // }, []);

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
              placeholder={t("name")}
              value={name}
              iconName={mailIcon}
              onChangeText={(e) => setName(e)}
            />
            <CustomInput
              placeholder={t("email")}
              value={email}
              iconName={mailIcon}
              // onChangeText={(e) => setEmail(e)}
              onChangeText={handleEmailChange}
              isEmailValid={isEmailValid} // Pass the isEmailValid prop
              keyboardType={"email-address"}
            />

            <CustomInput
              placeholder={`${t('phoneNumber')}`}
              value={phoneNumber}
              iconName={starIcon}
              // maxLength={6}
              onChangeText={(e) => setPhoneNumber(e)}
              keyboardType={"number-pad"}
            />

            <DropDownPicker
              open={isDropDownOpen}
              value={gender}
              items={items}
              setOpen={() => setIsDropDownOpen(!isDropDownOpen)}
              setValue={setGender}
              setItems={setItems}
              placeholder={`${t('gender')}`}
              style={styles.datePickerContainer}
              placeholderStyle={{
                color: "#8A8A8F",
                fontSize: 16,
              }}
              dropDownContainerStyle={{
                borderColor: "#ccc"
              }}
              textStyle={{
                color: '#333',
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
              {lang === "en" ? (
                <>
                  <SvgXml xml={calenderIcon} height={"20"} width={"20"} />
                  <Text
                    style={[
                      styles.datePickerText,
                      { textAlign: lang === "en" ? "left" : "right" },
                    ]}
                  >
                    {birth ? birth : moment(new Date()).format("DD-MM-YYYY")}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={[
                      styles.datePickerText,
                      { textAlign: lang === "en" ? "left" : "right" },
                    ]}
                  >
                    {birth ? birth : moment(new Date()).format("DD-MM-YYYY")}
                  </Text>
                  <SvgXml xml={calenderIcon} height={"20"} width={"20"} />
                </>
              )}
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={open}
              locale = {lang}
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
              placeholder={`${t("israel")} ${t("rating")}`}
              value={israel}
              iconName={starIcon}
              maxLength={6}
              onChangeText={(e) => setIsrael(e)}
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
          <View style={styles.secondaryButtonContainer}>
            {lang === "en" ? (
              <>
                <Text style={styles.noAccountTwo}>
                  {t("dontHaveAnAccount")}{" "}
                </Text>
                <TouchableOpacity onPress={handleLogin}>
                  <Text style={styles.signUp}>{t("login")}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity onPress={handleLogin}>
                  <Text style={styles.signUp}>{t("login")}</Text>
                </TouchableOpacity>
                <Text style={styles.noAccountTwo}>
                  {t("dontHaveAnAccount")}{" "}
                </Text>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
