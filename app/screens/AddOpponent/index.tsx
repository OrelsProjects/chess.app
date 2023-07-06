import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';

import NavigationService from 'app/navigation/NavigationService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  enterIcon,
  leftArrowIcon,
  lockIcon,
  neilPlayer,
  starGoldIcon,
  starIconTwo,
  userIcon,
  xIcon,
} from 'app/assets/SVGs/index';

import styles from './styles';
import ButtonCTA from 'app/components/ButtonCTA';
import CustomHeader from 'app/components/CustomHeader';
import CustomInput from 'app/components/CustomInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppStyles from 'app/config/styles';
import { normalized } from 'app/config/metrics';
import { SvgXml } from 'react-native-svg';

const AddOpponent: React.FC = () => {
  const [opponentName, setOpponentName] = useState('');
  const [ratingNumber, setRatingNumber] = useState('');
  const [selectedBtn, setSelectedBtn] = useState('W')
  const goBack = () => NavigationService.goBack();
  const navigateToHome = () => NavigationService.navigate('Home');
  const insets = useSafeAreaInsets();

  const colors = [AppStyles.color.COLOR_PRIMARY, AppStyles.color.BABY_PINK];

  const users = [
    {
      image: neilPlayer,
      name: 'Mike',
      rating: '500',
      tag: 'GM',
    },
    {
      image: neilPlayer,
      name: 'Oreal',
      rating: '500',
      tag: 'IM',
    },
  ];

  const gameStatsBtn = [
    {
      name: 'W',
      value: 'W'
    },
    {
      name: 'L',
      value: 'L'
    },
    {
      name: 'D',
      value: 'D'
    },
  ]

  const renderUsers = () => {
    return (
      <>
        <View style={styles.divider} />
        <Text style={styles.optionText}>Selected Options</Text>
        {users.map((user, i) => {
          const randomIndex = Math.floor(Math.random() * colors.length);
          const randomColor = colors[randomIndex];
          return (
            <View key={i} style={styles.userParentContainer}>
              <View style={styles.userChildContainer}>
                <View style={styles.userView}>
                  <SvgXml
                    xml={user.image}
                    width={normalized.wp(12)}
                    height={normalized.hp(12)}
                    style={styles.userImg}
                  />
                  <View style={styles.userDetailsView}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <View style={styles.ratingView}>
                      <SvgXml
                        xml={starGoldIcon}
                        width={normalized.wp(5)}
                        height={normalized.hp(5)}
                      />
                      <Text style={styles.starText}>{user.rating}</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={[
                    styles.wgmContainer,
                    { backgroundColor: randomColor },
                  ]}>
                  <Text style={styles.wgmText}>{user.tag}</Text>
                </View>

                <TouchableOpacity style={styles.xIcon}>
                  <SvgXml xml={xIcon} width={wp(4)} height={wp(4)} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </>
    );
  };

  return (
    <View
      style={{ flexGrow: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <CustomHeader leftIcon={leftArrowIcon} onBackButtonPress={goBack} />
        <View style={styles.childContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>Add Opponents</Text>
          </View>

          <CustomInput
            value={opponentName}
            iconName={userIcon}
            onChangeText={e => setOpponentName(e)}
          />

          <View style={styles.gameStatsBtnView}>
            {gameStatsBtn.map(btn => {
              return (
                <TouchableOpacity style={[styles.statsBtnContainer, { backgroundColor: selectedBtn === btn.name ? AppStyles.color.BABY_PINK : '#F3F7FF', borderColor: selectedBtn === btn.name ? AppStyles.color.BABY_PINK : AppStyles.color.COLOR_PRIMARY },]} key={btn.name} onPress={() => setSelectedBtn(btn.value)}>
                  <Text style={styles.statsBtnText}>{btn.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <CustomInput
            placeholder="Enter Rating Number"
            value={ratingNumber}
            iconName={starIconTwo}
            onChangeText={e => setRatingNumber(e)}
            rightIcon={enterIcon}
          />
        </View>

        {ratingNumber !== '' ? renderUsers() : null}
      </ScrollView>
      <View style={styles.secondaryButtonContainer}>
        <ButtonCTA
          customStyle={{ width: wp(90) }}
          buttonText={'Submit'}
          onPress={navigateToHome}
        />
      </View>
    </View>
  );
};

export default AddOpponent;
