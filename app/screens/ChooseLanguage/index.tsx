import React, { useEffect, useState } from "react";
import {
  I18nManager,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import i18n from "../../i18n";
import { useTranslation, withTranslation } from "react-i18next";

import NavigationService from "../../navigation/NavigationService";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import styles from "./styles";
import ButtonCTA from "../../components/ButtonCTA";
import CustomHeader from "../../components/CustomHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/actions/action";


const ChooseLanguage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const lang = useSelector((state: any) => state.auth.language);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const insets = useSafeAreaInsets();

  useEffect(() => {
    handleLanguageSelection(lang);
  }, [lang]);
  const handleLanguageSelection = (language: string) => {
    if (language === "en") setSelectedLanguage("English");
    else if (language === "he") setSelectedLanguage("Hebrew");
    i18n.changeLanguage(language);
    dispatch(setLanguage(language));
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
          <View style={styles.headerContainer}>
            <Text style={[styles.heading]}>{t("selectLanguage")}</Text>
            <Text style={styles.subHeading}>
              {t("chooseYourPreferredLanguage")}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setSelectedLanguage("English");
              handleLanguageSelection("en");
            }}
          >
            <View
              style={[
                styles.langButton,
                selectedLanguage === "English"
                  ? { borderColor: "#007AFF" }
                  : null,
              ]}
            >
              <Text style={styles.langBtnText}>{t("english")}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedLanguage("Hebrew");
              handleLanguageSelection("he");
            }}
          >
            <View
              style={[
                styles.langButton,
                selectedLanguage === "Hebrew"
                  ? { borderColor: "#007AFF" }
                  : null,
              ]}
            >
              <Text style={styles.langBtnText}>{t("Hebrew")}</Text>
            </View>
          </TouchableOpacity>

          <ButtonCTA
            customStyle={{ width: wp(90) }}
            buttonText={t("next")}
            onPress={() => {
              NavigationService.goBack();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChooseLanguage;
