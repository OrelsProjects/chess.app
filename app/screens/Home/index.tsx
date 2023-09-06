import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { drawerIcon, defaultPlayer, plusIcon, undo } from "../../assets/SVGs";
import images from "../../config/images";
import { SvgXml } from "react-native-svg";
import { normalized } from "../../config/metrics";
import NavigationService from "../../navigation/NavigationService";
import { useNavigation } from "@react-navigation/native";
import ButtonCTA from "../../components/ButtonCTA";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { setExpectedRating, removeOpponent } from "../../redux/actions/action";
import { BaseURL, endPoints } from "../../constants";
import { useTranslation } from "react-i18next";
import PlayerCard from "../../components/PlayerCard";
import { DdLogs } from "@datadog/mobile-react-native";
import { IOpponent, IOpponentDTO } from "../../redux/reducers/authReducer";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const userId = useSelector((state: any) => {
    return state.auth.token;
  });
  const [currentRating, setCurrentRating] = useState(0);
  const [opponentsList, setOpponentsList] = useState<IOpponent[]>([]);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const navigateToAddOpponent = () => NavigationService.navigate("AddOpponent");

  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };

  const dispatch = useDispatch();

  const handleRemoveResult = (index: number) => {
    dispatch(removeOpponent(index));
  };

  const { opponents, expectedRating } = useSelector((state: any) => state.auth);

  const content =
    opponents?.length > 0
      ? opponents.map((result: any) => ({
          svg: defaultPlayer,
          opponentName: result?.opponentName,
          points: result?.opponentPoints,
          status: result?.gameStatus,
          starText: result?.opponentRating,
          image: images.icons.players,
          starImage: images.icons.star,
          wgmImage: images.icons.wgm,
        }))
      : null;

  const getCurrentRatingApi = async () => {
    try {
      const response = await BaseURL.get(`${endPoints.getUserApi}/${userId}`);
      setCurrentRating(response.data.rating_israel);
      dispatch(setExpectedRating(response.data.rating_expected));
      return response.data;
    } catch (error) {
      DdLogs.error(`Get current api error: ${error}`);
      console.log(error);
      throw error;
    }
  };

  const calculateRatingCore = async () => {
    setLoading(true);
    const payload: IOpponentDTO[] = opponentsList.map((item: IOpponent) => {
      return {
        opponent_rating: item.opponentRating,
        opponent_points: item.opponentPoints,
        time_control: item.gameType,
      };
    });

    try {
      const response = await BaseURL.post(endPoints.calculateRating, payload, {
        headers: {
          UserId: userId,
        },
      });
      dispatch(setExpectedRating(response.data));
    } catch (error) {
      console.log("error", error);
      DdLogs.error(`Forgot password error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListObjects();
  }, [opponents]);

  const getListObjects = () => {
    let newOpponents: IOpponent[] = [];
    opponents?.map((item: any) => {
      newOpponents.push({
        opponentName: item.opponentName,
        opponentRating: item.opponentRating,
        opponentPoints: item.opponentPoints,
        gameType: item.gameType,
        gameStatus: item.gameStatus,
      });
    });

    setOpponentsList(newOpponents);
  };

  useEffect(() => {
    getCurrentRatingApi();
  }, [userId]);

  const calculateNewRating = () => {
    calculateRatingCore();
  };

  const handleReset = async () => {
    setLoading(true);
    try {
      const resetRating = await BaseURL.put(endPoints.reset, {
        // Request payload
      });
      const response = resetRating?.data;
      dispatch(setExpectedRating(response));
      setLoading(false);
    } catch (error) {
      DdLogs.error(`Reset rating error: ${error}`);
      setLoading(false);
    }
  };

  const handleUndo = async () => {
    setLoading(true);
    try {
      const result = await BaseURL.put(endPoints.undo);
      dispatch(setExpectedRating(result.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      DdLogs.error(`Undo error: ${error}`);
    }
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

      <View style={styles.ratingDirection}>
        <View style={styles.ratingView}>
          <Text
            style={[
              styles.ratingText,
              { fontWeight: "600", fontSize: normalized.wp(4) },
            ]}
          >
            {t("currentRating")} ({currentRating})
          </Text>
        </View>
        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>
            {t("expectedRating")} (
            {expectedRating ? expectedRating : currentRating})
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
            playerName={item.opponentName}
            gameStatus={item.status}
            rating={item.starText}
            disabled={true}
            onCancel={() => handleRemoveResult(index)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={[styles.view2]} onPress={navigateToAddOpponent}>
        <View style={styles.button}>
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
          onPress={calculateNewRating}
        />
      </View>
    </View>
  );
};

export default Home;
