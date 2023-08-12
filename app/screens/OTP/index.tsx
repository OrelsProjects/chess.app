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
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store/index";

interface OtpProps {
  username: String;
}

const EnterOTP: React.FC<OtpProps> = ({ route }) => {
  const lang = useSelector((state: any) => state.auth.language);
  const { t } = useTranslation();
  const userName = route.params.username || "test";
  const userEmail = route.params.email || "test@gmail.com";

  const insets = useSafeAreaInsets();
  const goBack = () => NavigationService.goBack();
  const [loading, setLoading] = useState(false);

  const navigateToResetPass = async () => {
    if (userName) {
      setLoading(true);
      try {
        await Auth.confirmSignUp(userName, value);
        setLoading(false);
        useStore.getState().setIsLoggedIn(true);
      } catch (error) {
        setLoading(false);
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
            {t("a6DigitsCodeHasBeenSentToYourEmail")}{" "}
            <Text style={{ color: "#383838" }}>{userEmail}</Text>
          </Text>
        </View>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          rootStyle={{
            marginVertical: hp(4),
            flexDirection: `${lang == "he" ? "row-reveresed" : "row"}`,
          }}
          onChangeText={(value) => {
            setValue(value);
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
            navigateToResetPass();
          }}
          disabled={loading}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default EnterOTP;
