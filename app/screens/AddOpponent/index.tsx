import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";

import NavigationService from "../../navigation/NavigationService";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  enterIcon,
  leftArrowIcon,
  neilPlayer,
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
import { useDispatch } from "react-redux";
import { searchUser } from "../../redux/actions/action";
import { BaseURL } from "../../constants";
import { useTranslation } from "react-i18next";
import images from "../../config/images";
import axios from "axios";
import PlayerCard from "../../components/PlayerCard";
import CustomInputNonRtl from "../../components/CustomInoutNonRtl";
import { IGameStateProps, ISearchOpponentProps, IUseRefProps } from "./types";
import RBSheet from "react-native-raw-bottom-sheet";

const AddOpponent: React.FC = () => {
  const { t } = useTranslation();
  const [opponentName, setOpponentName] = useState("");
  const [ratingNumber, setRatingNumber] = useState("");
  const [badge, setBadge] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOptionArray, setSelectedOptionArray] = useState([]);
  const [searchData, setSearchData] = useState<ISearchOpponentProps[]>([]);
  const [selectedGameState, setSelectedGameState] = useState({
    name: "",
    value: "",
  });
  const insets = useSafeAreaInsets();
  const colors = [AppStyles.color.COLOR_PRIMARY, AppStyles.color.BABY_PINK];
  const [, setName] = useState("");
  const [, setRating] = useState("");

  const source = React.useRef<IUseRefProps | null>(null);
  const gameTypeSheet = React.useRef<IUseRefProps | null>(null);
  const gameStateSheet = React.useRef<IUseRefProps | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setSearchData(
      searchResults.map((result: any) => ({
        svg: neilPlayer,
        first_name: result?.first_name + " " + result?.last_name,
        rating_israel: result?.rating_israel,
        image: images.icons.players,
        starImage: images.icons.star,
        wgmImage: images.icons.wgm,
        badge: result?.badge,
      }))
    );
  }, [searchResults]);

  const goBack = () => NavigationService.goBack();
  const navigateToHome = () => NavigationService.navigate("Home");

  const userData = () => {
    if (selectedOptionArray.length == 0) {
      Alert.alert(`${t("note")}:`, t("pleaseSelectUsers"));
    } else {
      dispatch(searchUser(selectedOptionArray));
      navigateToHome();
    }
  };

  const addOpponent = (gameState: IGameStateProps) => {
    if (ratingNumber && gameState) {
      let opponent = {
        opponentName: opponentName,
        opponentPoints: gameState.value,
        opponentStatus: gameState.name,
        opponentRating: ratingNumber,
        image: neilPlayer,
        badge: badge,
        // tag: "GM",
      };
      let allOpponents = [...selectedOptionArray, opponent];

      setOpponentName("");
      setRatingNumber("");
      setSelectedOptionArray(allOpponents);
    } else {
      Alert.alert(t("pleaseFillAllFields"));
    }
  };

  const gameStates: IGameStateProps[] = [
    {
      name: t("statusWin"),
      value: "0",
    },
    {
      name: t("statusDraw"),
      value: "0.5",
    },
    {
      name: t("statusLose"),
      value: "1",
    },
  ];

  React.useEffect(() => {
    return () => {
      source?.current?.cancel("Component unmounted");
    };
  }, []);
  const handleRemoveItem = (index: number) => {
    var list = [...selectedOptionArray];
    list.splice(index, 1);
    setSelectedOptionArray(list);
  };

  const clearSearchResults = () => {
    setOpponentName("");
    setSearchResults([]);
  };

  const searchUsers = async (text: any) => {
    setOpponentName(text);
    setRatingNumber("");
    if (source.current) {
      source.current.cancel("Previous request cancelled");
    }
    try {
      source.current = axios.CancelToken.source();
      const response = await BaseURL.get(
        `/search/users/${text.toLowerCase()}/1/5`,
        {
          cancelToken: source.current.token,
        }
      );
      setSearchResults(response.data);

      return response.data;
    } catch (error) {
      setSearchResults([]);
      throw error;
    }
  };

  const renderUsers = () => {
    return (
      <>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.divider} />
          <View style={{ width: normalized.wp("90%") }}>
            {selectedOptionArray.map((user: any, i) => {
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

  const onUserSelected = (item: any) => {
    setSearchResults([]);
    setOpponentName(item.first_name);
    setRatingNumber(item.rating_israel);
    setName(item.first_name);
    setRating(item.rating_israel);
    setBadge(item.badge);
    showGameStateSheet();
  };

  const showGameStateSheet = () => {
    gameTypeSheet.current?.close();
    gameStateSheet.current?.open();
  }

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
              onChangeText={(value) => searchUsers(value)}
              placeholder={t("search")}
              rightIcon={opponentName ? xIcon : ""}
              onRightIconPress={() => clearSearchResults()}
            />
            {searchResults.length > 0 ? (
              <View>
                <ScrollView style={{ height: hp(40) }}>
                  {searchData.map((item: any, index: any) => (
                    <PlayerCard
                      playerImage={item?.svg}
                      playerName={item?.first_name}
                      rating={item?.rating_israel}
                      onPress={() => onUserSelected(item)}
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
          {searchResults.length == 0 && (
            <>
              <CustomInputNonRtl
                editable={opponentName == "" ? true : false}
                containerStyle={{ zIndex: 1 }}
                placeholder={t("rating")}
                value={ratingNumber.toString()}
                iconName={starIconTwo}
                onRightIconPress={() => showGameStateSheet()}
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
      <RBSheet
        ref={gameStateSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "#00000030",
          },
          draggableIcon: {
            backgroundColor: "black",
          },
        }}
      >
        <View style={styles.gameStatesContainer}>
          {gameStates.map((state: IGameStateProps) => (
            <TouchableOpacity
              key={state.name}
              style={styles.gameStateButton}
              onPress={() => {
                gameStateSheet.current?.close();
                addOpponent(state);
              }}
            >
              <Text style={[styles.defaultButtonTextStyle]}>{state.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </RBSheet>
    </View>
  );
};

export default AddOpponent;
