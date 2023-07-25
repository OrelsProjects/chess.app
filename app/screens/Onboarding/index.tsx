import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';
import images from '../../config/images';
import NavigationService from '../../navigation/NavigationService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Svg, { SvgUri, SvgXml } from 'react-native-svg';
import { onboardOne, onboardTwo, sliderOne, sliderTwo } from '../../assets/SVGs';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setOnBoarding } from '../../redux/actions/action';

const OnBordingScreen: React.FC = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [showComponent, setShowComponent] = useState(false);

  useEffect(()=>{
    console.log("on boarding screen opened!")
  })
  const _renderCalender = () => {
    const navigation = () => {
      NavigationService.navigate('Login');
      dispatch(setOnBoarding(false));
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
        
          <SvgXml xml={onboardTwo} width={wp(100)} height={wp(60)} />
        </View>
        <View style={styles.textView}>
          <View style={styles.mainView}>
            <View style={styles.heading}>
              <Text style={styles.headingText}>{t('textHere')}</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={styles.text}>
                {t('interactAndEarnRewardsWithOurPointsProgramHelpClassmatesAndEarnPointsRedeemableForCashOrFutureCoursePurchasesStartBuildingYourRewardsNow')}
              </Text>
              {/* <Image source={images.icons.Slider2} style={styles.slider} /> */}
              <SvgXml xml={sliderTwo} width={wp(8)} height={wp(12)} />
            </View>
            <View style={styles.buttons}>
              <View style={styles.buttonDirection}>
                <TouchableOpacity onPress={navigation}>
                  <Text style={styles.skipText}>{t('skip')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={navigation}
                  style={styles.nextButtonView}>
                  <Text style={styles.nextButtonText}>{t('next')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const _renderGame = () => {
    const navigation = () => setShowComponent(true);
    const skipNavigation = () => {
      NavigationService.navigate('Login');
      dispatch(setOnBoarding(false));
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          {/* <Image source={images.icons.gameImage} style={styles.image} /> */}
          <SvgXml xml={onboardOne} width={wp(100)} height={wp(60)} />
        </View>
        <View style={styles.textView}>
          <View style={styles.mainView}>
            <View style={styles.heading}>
              <Text style={styles.headingText}>{t('textHere')}</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={styles.text}>
                {t('takeYourInvestmentKnowledgeToTheNextLevelWithNmoAcademyExpertLedCourses')}
              </Text>

              <SvgXml xml={sliderOne} width={wp(8)} height={wp(12)} />
              {/* <SvgUri
              uri={require('../../images/handWaveIcon.svg')}
              width={20}
              height={20}
            /> */}
            </View>
            <View style={styles.buttons}>
              <View style={styles.buttonDirection}>
                <TouchableOpacity onPress={skipNavigation}>
                  <Text style={styles.skipText}>{t('skip')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={navigation}
                  style={styles.nextButtonView}>
                  <Text style={styles.nextButtonText}>{t('next')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {showComponent ? _renderCalender() : _renderGame()}
    </View>
  );
};

export default OnBordingScreen;
