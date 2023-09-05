import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import NavigationService from "../../navigation/NavigationService";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  enterIcon,
  enterIconFlipped,
  leftArrowIcon,
  defaultPlayer,
  starIconTwo,
  userIcon,
  xIcon,
} from "../../assets/SVGs/index";

import styles from "./styles";
import ButtonCTA from "../../components/ButtonCTA";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { normalized } from "../../config/metrics";
import { useDispatch, useSelector } from "react-redux";
import { addOpponents } from "../../redux/actions/action";
import { BaseURL } from "../../constants";
import { useTranslation } from "react-i18next";
import images from "../../config/images";
import axios from "axios";
import PlayerCard from "../../components/PlayerCard";
import { IGameProps, ISearchOpponentProps, IUseRefProps } from "./types";
import RBSheet from "react-native-raw-bottom-sheet";
import { DdLogs } from "@datadog/mobile-react-native";
import { ActivityIndicator } from "react-native-paper";

const AddOpponent: React.FC = () => {
  const { t } = useTranslation();
  const [opponentName, setOpponentName] = useState("");
  const [ratingNumber, setRatingNumber] = useState("");
  const [badge, setBadge] = useState("");
  const [selectedOpponents, setSelectedOptionArray] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState<ISearchOpponentProps[]>([]);
  const insets = useSafeAreaInsets();
  const [, setName] = useState("");
  const [, setRating] = useState("");

  const source = React.useRef<IUseRefProps | null>(null);
  const gameTypeSheet = React.useRef<IUseRefProps | null>(null);
  const gameStateSheet = React.useRef<IUseRefProps | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setSearchData(
      searchResults.map((result: any) => ({
        svg: defaultPlayer,
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
  const language = useSelector((state: any) => state.auth.language);
  const navigateToHome = () => NavigationService.navigate("Home");

  const isRTL = language === "he" || language === "ar";

  const submitOpponents = (gameType: string) => {
    if (selectedOpponents.length == 0) {
      Alert.alert(`${t("note")}:`, t("pleaseSelectUsers"));
    } else {
      selectedOpponents?.map((item: any) => {
        item.gameType = gameType;
      });
      dispatch(addOpponents(selectedOpponents));
      navigateToHome();
    }
  };

  const addOpponent = (gameState: IGameProps) => {
    if (ratingNumber && gameState) {
      let opponent = {
        opponentName: opponentName,
        opponentPoints: gameState.value,
        opponentStatus: gameState.name,
        opponentRating: ratingNumber,
        image: defaultPlayer,
        badge: badge,
      };
      let allOpponents = [...selectedOpponents, opponent];

      setOpponentName("");
      setRatingNumber("");
      setSelectedOptionArray(allOpponents);
    } else {
      Alert.alert(t("pleaseFillAllFields"));
    }
  };

  const gameStates: IGameProps[] = [
    {
      name: t("statusLose"),
      value: "1",
    },
    {
      name: t("statusDraw"),
      value: "0.5",
    },
    {
      name: t("statusWin"),
      value: "0",
    },
  ];

  const gameTypes: IGameProps[] = [
    {
      name: t("blitz"),
      value: "blitz",
    },
    {
      name: t("rapid"),
      value: "rapid",
    },
    {
      name: t("classical"),
      value: "classical",
    },
  ];

  React.useEffect(() => {
    return () => {
      source?.current?.cancel("Component unmounted");
    };
  }, []);

  const handleRemoveItem = (index: number) => {
    var list = [...selectedOpponents];
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
      if (text.length === 0) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      source.current = axios.CancelToken.source();
      const response = await BaseURL.get(`/users/search`, {
        cancelToken: source?.current?.token,
        params: {
          search: text.toLowerCase(),
          page: 1,
          limit: 5,
        },
      });
      setSearchResults(response.data);

      return response.data;
    } catch (error) {
      DdLogs.error(`Search error: ${error}`);
      setSearchResults([]);
      throw error;
    } finally {
      setIsSearching(false);
    }
  };

  const renderGameTypesSheet = () => (
    <RBSheet
      ref={gameTypeSheet}
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
      <View style={styles.sheetContainer}>
        <Text style={styles.sheetTitleText}>{t("sheetTitleGameType")}</Text>
        <View style={styles.sheetButtonsContainer}>
          {gameTypes.map((gameType: IGameProps) => (
            <TouchableOpacity
              key={gameType.name}
              style={styles.sheetButton}
              onPress={() => {
                gameTypeSheet.current?.close();
                submitOpponents(gameType.value);
              }}
            >
              <Text style={[styles.sheetButtonText]}>{gameType.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </RBSheet>
  );

  const renderGameStatesSheet = () => (
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
      <View style={styles.sheetContainer}>
        <Text style={styles.sheetTitleText}>{t("sheetTitleGameState")}</Text>
        <View style={styles.sheetButtonsContainer}>
          {gameStates.map((state: IGameProps) => (
            <TouchableOpacity
              key={state.name}
              style={styles.sheetButton}
              onPress={() => {
                gameStateSheet.current?.close();
                addOpponent(state);
              }}
            >
              <Text style={[styles.sheetButtonText]}>{state.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </RBSheet>
  );

  const renderUsers = () => {
    return (
      <>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.divider} />
          <View style={{ width: normalized.wp("90%") }}>
            {selectedOpponents.map((user: any, i) => {
              return (
                <PlayerCard
                  key={i}
                  playerImage={user?.image}
                  playerName={user?.opponentName}
                  rating={user?.opponentRating}
                  gameStatus={user?.opponentStatus}
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
  };

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
              placeholder={t("searchInputPlaceholder")}
              rightIcon={opponentName ? xIcon : ""}
              onRightIconPress={() => clearSearchResults()}
              rightIconSize={20}
              isLoading={isSearching}
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
              <CustomInput
                editable={opponentName == "" ? true : false}
                containerStyle={{ zIndex: 1 }}
                placeholder={t("ratingInputPlaceholder")}
                value={ratingNumber.toString()}
                iconName={starIconTwo}
                onRightIconPress={() => {
                  if (ratingNumber) {
                    showGameStateSheet();
                  }
                }}
                onChangeText={(e) => setRatingNumber(e)}
                rightIcon={isRTL ? enterIconFlipped : enterIcon}
                rightIconDisabled={!ratingNumber}
                keyboardType="number-pad"
                rightIconSize={32}
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
          onPress={() => gameTypeSheet?.current?.open()}
          disabled={selectedOpponents.length == 0 || !!ratingNumber}
        />
      </View>
      {renderGameStatesSheet()}
      {renderGameTypesSheet()}
    </View>
  );
};

export default AddOpponent;
