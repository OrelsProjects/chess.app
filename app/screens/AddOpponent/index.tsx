

import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { Button } from "react-native-paper";

import NavigationService from "../../navigation/NavigationService";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  enterIcon,
  leftArrowIcon,
  lockIcon,
  neilPlayer,
  starGoldIcon,
  starIconTwo,
  userIcon,
  xIcon,
} from "../../assets/SVGs/index";

import styles from "./styles";
import ButtonCTA from "../../components/ButtonCTA";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppStyles from "../../config/styles";
import { normalized } from "../../config/metrics";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../redux/actions/action";
import { BaseURL, endPoints } from "../../constants";
import { useTranslation } from "react-i18next";
import images from "../../config/images";
import axios from "axios";
import PlayerCard from "../../components/PlayerCard";
import CustomInputNonRtl from "../../components/CustomInoutNonRtl";

const AddOpponent: React.FC = () => {
  const { t } = useTranslation();
  const [opponentName, setOpponentName] = useState("");
  const [ratingNumber, setRatingNumber] = useState(0);
  const [badge, setBadge] = useState("");
  const [selectedBtn, setSelectedBtn] = useState({
    name: "",
    value: "",
  });
  const [serachApiData, setSearchApiData] = useState([]);
  const [selectedOptionArray, setSelectedOptionArray] = useState([]);
  const goBack = () => NavigationService.goBack();
  const navigateToHome = () => NavigationService.navigate("Home");
  const insets = useSafeAreaInsets();
  const [searchData, setSearchData] = useState([]);
  const colors = [AppStyles.color.COLOR_PRIMARY, AppStyles.color.BABY_PINK];
  const source = React.useRef(null);

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setSearchData(
      serachApiData.map((result: any) => ({
        svg: neilPlayer,
        first_name: result?.first_name + " " + result?.last_name,
        rating_israel: result?.rating_israel,
        image: images.icons.players,
        starImage: images.icons.star,
        wgmImage: images.icons.wgm,
        badge: result?.badge,
      }))
    );
    console.log("serachApiData:", serachApiData);
  }, [serachApiData]);
  const userData = () => {
    if (selectedOptionArray.length == 0) {
      Alert.alert(`${t("note")}:`, t("pleaseSelectUsers"));
    } else {
      dispatch(searchUser(selectedOptionArray));
      navigateToHome();
    }
  };

  const selectedOptionArrayFN = () => {
    if (opponentName != "" && ratingNumber != "") {
      let valObj = {
        opponentName: opponentName,
        opponentPoints: selectedBtn.value,
        opponentStatus: selectedBtn.name,
        opponentRating: ratingNumber,
        image: neilPlayer,
        badge: badge,
        tag: "GM",
      };
      // console.log("🚀 ~ file: index.tsx:97 ~ selectedOptionArrayFN ~ valObj:", valObj)
      let obj = [...selectedOptionArray, valObj];

      setOpponentName("");
      setRatingNumber("");
      setSelectedOptionArray(obj);
    } 
    else if (selectedBtn.name !== "" && selectedBtn.name !== null && ratingNumber !== "") {

      let valObj = {
        opponentName: opponentName,
        opponentPoints: selectedBtn.value,
        opponentStatus: selectedBtn.name,
        opponentRating: ratingNumber,
        image: neilPlayer,
        badge: badge,
        tag: "GM",
      };
      let obj = [...selectedOptionArray, valObj];

      setOpponentName("");
      setRatingNumber("");
      setSelectedOptionArray(obj);
    } 
    else {
      Alert.alert(t("pleaseFillAllFields"));
    }
  };

  const gameStatsBtn = [
    {
      name: "W",
      value: "0",
    },
    {
      name: "D",
      value: "0.5",
    },
    {
      name: "L",
      value: "1",
    },
  ];
  React.useEffect(() => {
    return () => {
      if (source.current) {
        source.current.cancel("Component unmounted");
      }
    };
  }, []);
  const handleRemoveItem = (index: number) => {
    console.log("index:", index);
    var list = [...selectedOptionArray];
    list.splice(index, 1);
    setSelectedOptionArray(list);
  };

  const getUsersFromApi = async (text: any) => {
    
    setOpponentName(text);
    setRatingNumber("")
    if (source.current) {
      source.current.cancel("Previous request cancelled");
      // setisloading(false)
    }
    try {
      // if (text == '') {
      // setSearchApiData([]);
      // } else {
      source.current = axios.CancelToken.source();
      const response = await BaseURL.get(
        `/search/users/${text.toLowerCase()}/1/10`,
        {
          cancelToken: source.current.token,
        }
      );

      setSearchApiData(response.data);

      return response.data;
      // }
    } catch (error) {
      console.log("search error:", error);
      console.log("error response:", error?.response?.data);

      setSearchApiData([]);
      throw error;
    }
  };

  const renderUsers = () => {
    return (
      <>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

          <View style={styles.divider} />
          <Text style={styles.optionText}>Selected Options</Text>
          <View style={{ width: normalized.wp("90%") }}>
            {selectedOptionArray.map((user: any, i) => {
              const randomIndex = Math.floor(Math.random() * colors.length);
              const randomColor = colors[randomIndex];
             
              return (
                <PlayerCard
                  key={i}
                  playerImage={user?.image}
                  playerName={user?.opponentName}
                  rating={user?.opponentRating}
                  centerText={user?.opponentStatus}
                  badge={user?.badge}
                  onCancel={() => handleRemoveItem(i)}
                />
              );
            })}
          </View>
        </ScrollView>
      </>
    );
  };

  const onPressItem = (item: any) => {
    console.log("item", item);
    setSearchApiData([]);
    setOpponentName(item.first_name);
    setRatingNumber(item.rating_israel);
    setName(item.first_name);
    setRating(item.rating_israel);
    setBadge(item.badge);
  };
  console.log("eqwe", serachApiData[0]);
  return (
    <View
      style={{ flexGrow: 1, backgroundColor: "#fff", paddingTop: insets.top }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <CustomHeader leftIcon={leftArrowIcon} onBackButtonPress={goBack} />
        <View style={styles.childContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>
              {t("add")} {t("opponents")}
            </Text>
          </View>

          <View style={{ width: "100%" }}>
            <CustomInput
              value={opponentName}
              iconName={userIcon}
              onChangeText={(e) => getUsersFromApi(e)}
              placeholder={t("search")}
              rightIcon={opponentName ? xIcon : ""}
              onRightIconPress={() => getUsersFromApi("")}
            />
            {serachApiData.length > 0 ? (
              <View
                style={{
                  // position: "absolute",
                  // zIndex: 2,
                  // top: 60,

                  // width: "100%",
                  // borderRadius: 10,
                  // alignSelf: "center",
                  // backgroundColor: "lightgray",
                }}
              >
                <ScrollView style={{height:hp(40) }}>
                  {searchData.map((item: any, index: any) => (
                    <PlayerCard
                      playerImage={item?.svg}
                      playerName={item?.first_name}
                      rating={item?.rating_israel}
                      onPress={() => onPressItem(item)}
                      badge={item.badge}
                    />
                  ))}
                </ScrollView>
              </View>
            ) : opponentName ? (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  // elevation: 2,
                  // top: -normalized.hp(2),
                  marginTop: -normalized.hp(1),
                  marginBottom: normalized.hp(2),
                  borderRadius: 10,
                }}
              >
                <Text style={[styles.subHeading, { textAlign: "center" }]}>
                  {t("dataNotFound")}
                </Text>
              </View>
            ) : null}
          </View>
          {serachApiData.length == 0 && (
            <>
          <View style={[styles.gameStatsBtnView, { zIndex: 1 }]}>
            {gameStatsBtn.map((btn: any) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.statsBtnContainer,
                    {
                      backgroundColor:
                        selectedBtn.value === btn.value
                          ? "#C8DBF5"
                          : AppStyles.color.COLOR_WHITE,
                      borderColor:
                        selectedBtn.value === btn.value
                          ? AppStyles.color.COLOR_PRIMARY
                          : AppStyles.color.COLOR_PRIMARY,
                    },
                  ]}
                  key={btn.name}
                  onPress={() => {
                    setSelectedBtn({ name: btn.name, value: btn.value });
                  }}
                >
                  <Text style={styles.statsBtnText}>{btn.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
            <CustomInputNonRtl
            editable={opponentName == "" ? true : false}
            containerStyle={{ zIndex: 1 }}
            placeholder={t("enterRatingNumber")}
            value={ratingNumber.toString()}
            iconName={starIconTwo}
            onRightIconPress={selectedOptionArrayFN}
            onChangeText={(e) => setRatingNumber(e)}
            rightIcon={enterIcon}
            keyboardType="number-pad"
          />
           {renderUsers()}
          </>
          )}
        
         
        </View>


      </ScrollView>
      <View style={[styles.secondaryButtonContainer, { zIndex: 1 }]}>
        <ButtonCTA
          customStyle={{ width: wp(90) }}
          buttonText={t("submit")}
          onPress={() => {
            userData();
          }}
        />
      </View>
    </View>
  );
};

export default AddOpponent;
