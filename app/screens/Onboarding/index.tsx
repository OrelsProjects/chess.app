import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import images from 'app/config/images';
import NavigationService from 'app/navigation/NavigationService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Icons } from 'app/svgs';
import Svg, { SvgUri, SvgXml } from 'react-native-svg';
import { onboardOne, onboardTwo, sliderOne, sliderTwo } from 'app/assets/SVGs';

const OnBordingScreen: React.FC = () => {
  const [showComponent, setShowComponent] = useState(false);

  const _renderCalender = () => {
    const navigation = () => NavigationService.navigate('Login');

    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          {/* <Image source={images.icons.calenderImage} style={styles.image} /> */}
          <SvgXml xml={onboardTwo}  width={wp(100)} height={wp(60)}/>
        </View>
        <View style={styles.textView}>
          <View style={styles.mainView}>
            <View style={styles.heading}>
              <Text style={styles.headingText}>Text here</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={styles.text}>
                Interact and earn rewards with our points program! Help
                classmates and earn points redeemable for cash or future course
                purchases. Start building your rewards now.
              </Text>
              {/* <Image source={images.icons.Slider2} style={styles.slider} /> */}
              <SvgXml xml={sliderTwo} width={wp(8)} height={wp(12)}/> 
            </View>
            <View style={styles.buttons}>
              <View style={styles.buttonDirection}>
                <TouchableOpacity onPress={navigation}>
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={navigation}
                  style={styles.nextButtonView}>
                  <Text style={styles.nextButtonText}>Next</Text>
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
    const skipNavigation = () => NavigationService.navigate('Login');

    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          {/* <Image source={images.icons.gameImage} style={styles.image} /> */}
          <SvgXml xml={onboardOne} width={wp(100)} height={wp(60)}/>
        </View>
        <View style={styles.textView}>
          <View style={styles.mainView}>
            <View style={styles.heading}>
              <Text style={styles.headingText}>Text here</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={styles.text}>
                Take your investment knowledge to the next level with Nmo
                academy's expert-led courses.
              </Text>
           
              <SvgXml xml={sliderOne} width={wp(8)} height={wp(12)}/> 
              {/* <SvgUri
              uri={require('../../images/handWaveIcon.svg')}
              width={20}
              height={20}
            /> */}
            </View>
            <View style={styles.buttons}>
              <View style={styles.buttonDirection}>
                <TouchableOpacity onPress={skipNavigation}>
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={navigation}
                  style={styles.nextButtonView}>
                  <Text style={styles.nextButtonText}>Next</Text>
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
