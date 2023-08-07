import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useStore } from "../../store";
import { store } from "../../redux/store/store";
import styles from "./styles";
import { GetUserDetails } from "../../services/react-query/queries/user";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  addFilter,
  drawerIcon,
  neilPlayer,
  plusIcon,
  starGoldIcon,
  undo,
  xIcon,
} from "../../assets/SVGs";
import images from "../../config/images";
import { SvgXml } from "react-native-svg";
import { normalized } from "../../config/metrics";
import NavigationService from "../../navigation/NavigationService";
import { useNavigation } from "@react-navigation/native";
import ButtonCTA from "../../components/ButtonCTA";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import {
  expectedRating,
  removeSearchResult,
  searchUser,
} from "../../redux/actions/action";
import axios from "axios";
import { BaseURL, endPoints } from "../../constants";
import { useTranslation } from "react-i18next";
import PlayerCard from "../../components/PlayerCard";

const Home: React.FC = () => {
  const [isClickedBtn, setIsClickedBtn] = useState("rapid");
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.auth);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const { isLoading, isFetching, data = { results: [] } } = GetUserDetails();
  const [calRating, setCalRating] = useState(0);
  const [itemListArray, setItemListArray] = useState([]);
  const [resetResponse, setResetResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const lang = useSelector((state: any) => state.auth.language);
  console.log("User Data2:", user);

  const onLogOut = () => {
    setIsLoggedIn(false);
  };

  const navigateToAddOpponent = () => NavigationService.navigate("AddOpponent");

  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };

  const dispatch = useDispatch();

  const handleRemoveResult = (index: number) => {
    dispatch(removeSearchResult(index));
  };

  const { searchResults, expectRating } = useSelector(
    (state: any) => state.auth
  );

  const content =
    searchResults?.length > 0
      ? searchResults.map((result: any) => ({
          svg: neilPlayer,
          text: result?.opponentName,
          points: result?.opponentPoints,
          status: result?.opponentStatus,
          starText: result?.opponentRating,
          image: images.icons.players,
          starImage: images.icons.star,
          wgmImage: images.icons.wgm,
        }))
      : null;

  const getCurrentRatingApi = async () => {
    try {
      const response = await BaseURL.get(endPoints.getUserApi);
      setCalRating(response.data.rating_israel);
      return response.data;
    } catch (error) {
      console.error("Search error:", error);
      console.log("error response:", error?.response?.data);
      throw error;
    }
  };

  const sendDataToAPI = async () => {
    setLoading(true);
    console.log("itemlist", itemListArray);
    const payload = {
      games: itemListArray,
    };

    try {
      const response = await BaseURL.post(endPoints.calculateRating, payload);
      dispatch(expectedRating(response.data));
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getListObjects();
  }, [searchResults]);

  const getListObjects = () => {
    let tempArray: any = [];
    searchResults?.map((item: any) => {
      let obj = {
        opponentRating: item.opponentRating,
        opponentPoints: item.opponentPoints,
      };

      tempArray.push(obj);
    });

    setItemListArray(tempArray);
  };

  useEffect(() => {
    getCurrentRatingApi();
  }, []);

  const calRatingButton = () => {
    sendDataToAPI();
  };

  const handleReset = async () => {
    setLoading(true);
    try {
      const resetRating = await BaseURL.put(endPoints.reset, {
        // Request payload
      });
      const response = resetRating?.data;
      dispatch(expectedRating(response));
      setLoading(false);
    } catch (error) {
      console.log("API error:", error);
      setLoading(false);
    }
  };

  const handleUndo = async () => {
    setLoading(true);
    try {
      const resetUndo = await BaseURL.put(endPoints.undo);
      dispatch(expectedRating(resetUndo.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("API error:", error);
    }
  };

  const refRBSheet = useRef();

  const defaultButtonStyle = {
    width: wp(18),
    height: hp(4.5),
    backgroundColor: "white",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  };

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingTop: insets.top,
        justifyContent: "space-evenly",
        alignItems: "center",
        
      }}
    >
      {loading && (
        <View style={styles.buttonLoader}>
          <ActivityIndicator size="large" color="silver" />
        </View>
      )}
       <CustomHeader drawerIcon={drawerIcon} drawerButtonPress={openDrawer} />
      <View style={styles.allPlayerView}>
        <Text></Text>
        <Text
          style={[
            styles.allPlayerText,
            { fontWeight: "700", fontSize: normalized.wp(6) },
          ]}
        >
          All Player's
        </Text>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <SvgXml xml={addFilter} width={20} height={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.ratingDirection}>
        <View style={styles.ratingView}>
          <Text
            style={[
              styles.ratingText,
              { fontWeight: "600", fontSize: normalized.wp(4) },
            ]}
          >
            {t("currentRating")} ({calRating})
          </Text>
        </View>
        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>
            {t("expectedRating")} ({expectRating ? expectRating : calRating})
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
    {content?.map((item: any, index: any) => (
          <PlayerCard
            playerImage={item.svg}
            playerName={item.text}
            centerText={item.status}
            rating={item.starText}
            disabled={true}
            onCancel={() => handleRemoveResult(index)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={[styles.view2, {alignItems: lang === "he" ? "flex-start" : "flex-end"}]} onPress={navigateToAddOpponent}>
        <View style={styles.button}>
          {/* <Text style={[styles.text,{borderWidth: 1,textAlign: 'center'}]}>+</Text> */}
          <SvgXml xml={plusIcon} width={20} height={20} />
        </View>
      </TouchableOpacity>
      <View style={styles.lastView}>
        <View style={styles.sixView}>
          <TouchableOpacity onPress={handleUndo} style={styles.sevenView}>
            <SvgXml xml={undo} width={20} height={20} />

            <Text style={styles.undoText}>{t("undo")}</Text>
          </TouchableOpacity>

          <View style={styles.seperator} />

          <TouchableOpacity onPress={handleReset} style={styles.eightView}>
            <Image source={images.icons.reset} style={styles.reset} />
            <Text style={styles.resetText}>{t("reset")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonView}>
        <ButtonCTA
          customStyle={{ width: wp(90) }}
          buttonText={t("calculate") + " " + t("rating")}
          onPress={calRatingButton}
        />
      </View>
      <Text style={styles.nineText}>{t("theRatingsMayNotBeAccurate")}</Text>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "black",
          },
        }}
      >
        <View style={styles.bottomStyle}>
          <TouchableOpacity
            style={styles.bottomXIcon}
            onPress={() => refRBSheet.current.close()}
          >
            <SvgXml xml={xIcon} width={20} height={20} />
          </TouchableOpacity>
          <Text
            style={[
              styles.allPlayerText,
              { fontWeight: "700", fontSize: normalized.wp(5) },
            ]}
          >
            Game Type
          </Text>

          <View style={styles.bottomButtonView}>
            <TouchableOpacity
              style={[
                defaultButtonStyle,
                isClickedBtn === "rapid"
                  ? { backgroundColor: "#007AFF" }
                  : null,
              ]}
              onPress={() => setIsClickedBtn("rapid")}
            >
              <Text
                style={
                  isClickedBtn === "rapid"
                    ? { color: "white" }
                    : { color: "black" }
                }
              >
                Rapid
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                defaultButtonStyle,
                isClickedBtn === "blitz"
                  ? { backgroundColor: "#007AFF" }
                  : null,
              ]}
              onPress={() => setIsClickedBtn("blitz")}
            >
              <Text
                style={
                  isClickedBtn === "blitz"
                    ? { color: "white" }
                    : { color: "black" }
                }
              >
                Blitz
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                defaultButtonStyle,
                isClickedBtn === "classical"
                  ? { backgroundColor: "#007AFF" }
                  : null,
              ]}
              onPress={() => setIsClickedBtn("classical")}
            >
              <Text style={{ color: defaultButtonStyle.color }}>Classical</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default Home;
