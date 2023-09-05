import { starGoldIcon, xIcon } from "../assets/SVGs";
import { normalized, radius } from "../config/metrics";
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import win from "../assets/win.png";
import lose from "../assets/lose.png";
import draw from "../assets/draw.png";
import { useTranslation } from "react-i18next";

interface Parameters {
  playerName: string;
  playerImage: string;
  rating: string;
  gameStatus: string;
  badge: string;
  disabled: boolean;
  onPress: () => void;
  onCancel: () => void;
}

const PlayerCard: React.FC<Parameters> = ({
  playerName,
  playerImage,
  rating,
  gameStatus,
  badge,
  disabled,
  onPress,
  onCancel,
}) => {
  const { t } = useTranslation();

  const getGameStateIcon = () => {
    switch (t(gameStatus)) {
      case t("statusWin"):
        return win;
      case t("statusLose"):
        return lose;
      case t("statusDraw"):
        return draw;
      default:
        return null;
    }
  };

  return (
    <Pressable
      onPress={() => (onPress ? onPress() : null)}
      disabled={disabled}
      activeOpacity={0.5}
      style={styles.touchable}
    >
      <View style={styles.playerView}>
        <View style={styles.innerFirstView}>
          <SvgXml
            xml={playerImage}
            style={styles.photoStyle}
            height={normalized.hp(7)}
            width={normalized.hp(7)}
          />
          <Text style={styles.nameText}>{playerName}</Text>
        </View>
        {gameStatus ? (
          <View style={styles.innerCenterView}>
            <Image
              source={getGameStateIcon()}
              style={{ height: 70, width: 70}}
            />
          </View>
        ) : null}

        <View style={styles.innerSecondView}>
          {badge ? <Text style={styles.badgeText}>{badge}</Text> : null}
        </View>

        <View style={styles.ratingView}>
          <SvgXml
            xml={starGoldIcon}
            width={normalized.wp(5)}
            height={normalized.hp(5)}
          />
          <Text style={styles.ratingStarText}>{rating}</Text>
        </View>
        {onCancel ? (
          <View style={styles.crossView}>
            <Pressable onPress={() => (onCancel ? onCancel() : null)}>
              <SvgXml xml={xIcon} width={wp(4)} height={wp(4)} />
            </Pressable>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  playerView: {
    height: hp(11),
    margin: normalized.wp(2),
    elevation: 3,
    backgroundColor: "#F3F7FF",
    borderRadius: hp(2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  innerFirstView: {
    flex: 2.5,
    paddingHorizontal: normalized.wp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  innerCenterView: {
    position: "absolute",
    right: 0,
  },
  photoStyle: {
    margin: normalized.wp(2),
  },
  nameText: {
    fontSize: normalized.hp(2.5),
    color: "black",
  },
  innerSecondView: {
    flex: 2.5,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: normalized.wp(3),
  },
  badgeText: {
    fontSize: normalized.hp(2),
    backgroundColor: "#70c48c",
    color: "white",
    padding: normalized.hp(1.5),
    borderRadius: 26,
  },
  ratingView: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#FFD401",
    borderRadius: 20,
    height: normalized.hp(3.5),
    paddingHorizontal: normalized.wp(1.5),
    bottom: normalized.hp(8.5),
    // zIndex: 4
  },
  ratingStarText: {
    fontSize: normalized.hp(1.5),
    fontWeight: "500",
    color: "black",
    marginHorizontal: normalized.wp(1),
  },
  touchable: {
    backgroundColor: "white",
  },
  gameStatus: {
    color: "#222222",
    fontSize: normalized.hp(2),
  },
  crossView: {
    position: "absolute",
    alignSelf: "flex-end",
    right: normalized.wp(1),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 4,
    borderRadius: 100,
    height: normalized.hp(3),
    width: normalized.hp(3),
    paddingHorizontal: normalized.wp(1.5),
    bottom: normalized.hp(9.5),
  },
});

export default PlayerCard;
