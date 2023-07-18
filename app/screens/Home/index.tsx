import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useStore } from 'app/store';
import { store } from 'app/redux/store/store';
import styles from './styles';
import { GetUserDetails } from 'app/services/react-query/queries/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from 'app/components/CustomHeader';
import {
  drawerIcon,
  neilPlayer,
  starGoldIcon,
  undo,
  xIcon,
} from 'app/assets/SVGs';
import images from 'app/config/images';
import { SvgXml } from 'react-native-svg';
import { normalized } from 'app/config/metrics';
import NavigationService from 'app/navigation/NavigationService';
import { useNavigation } from '@react-navigation/native';
import ButtonCTA from 'app/components/ButtonCTA';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import {
  expectedRating,
  removeSearchResult,
  searchUser,
} from 'app/redux/actions/action';
import axios from 'axios';
import { BaseURL, endPoints } from 'app/constants';


const Home: React.FC = () => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const { isLoading, isFetching, data = { results: [] } } = GetUserDetails();
  const [calRating, setCalRating] = useState(0);
  const [itemListArray, setItemListArray] = useState([]);
  const [resetResponse, setResetResponse] = useState('');
  const [loading,setLoading]=useState(false)
  const insets = useSafeAreaInsets();

  const onLogOut = () => {
    setIsLoggedIn(false);
  };

  const navigateToAddOpponent = () => NavigationService.navigate('AddOpponent');

  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };

  const dispatch = useDispatch();

  const handleRemoveResult = (index: number) => {
    dispatch(removeSearchResult(index));
  };

  const { searchResults, expectRating } = useSelector(
    (state: any) => state.auth,
  );

  const content =
    searchResults?.length > 0
      ? searchResults.map((result: any) => ({
          svg: neilPlayer,
          text: result?.opponentName,
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
      console.error('Search error:', error);
      throw error;
    }
  };

  const sendDataToAPI = async () => {
    setLoading(true)
    console.log('itemlist', itemListArray);
    const payload = {
      games: itemListArray,
    };

    try {
      const response = await BaseURL.post(endPoints.calculateRating, payload);

      dispatch(expectedRating(response.data));
      setLoading(false)
      console.log(response.data);
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
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
    setLoading(true)
    try {
      const resetRating = await BaseURL.put(endPoints.reset, {
        // Request payload
      });
      const response = resetRating?.data;
      dispatch(expectedRating(response));
      setLoading(false)
    } catch (error) {
      console.log('API error:', error);
      setLoading(false)
    }
  };

  const handleUndo = async () => {
    setLoading(true)
    try {
      const resetUndo = await BaseURL.put(endPoints.undo);
      dispatch(expectedRating(resetUndo.data));
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('API error:', error);
    }
  };

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingTop: insets.top,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
        {loading && (
            <View style={styles.buttonLoader}>
              <ActivityIndicator size="large" color="silver" />
            </View>
           )} 
      <CustomHeader leftIcon={drawerIcon} onBackButtonPress={openDrawer} />

      <View style={styles.ratingDirection}>
        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>Current Rating ({calRating})</Text>
        </View>
        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>
            Expected Rating ({expectRating})
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {Array.from({ length: 1 }, (_, index) => (
          <React.Fragment key={index}>
            {content
              ? content.map((item: any, index: any) => (
                  <View key={index} style={styles.firstView}>
                    <TouchableOpacity style={styles.secondView}>
                      <View style={styles.thirdView}>
                        <SvgXml xml={item.svg} style={styles.neil} />
                        <View style={styles.fourthView}>
                          <Text style={styles.neilText}>{item.text}</Text>
                        
                        </View>
                        <View style={styles.middleView}>
                          <SvgXml
                            xml={starGoldIcon}
                            width={normalized.wp(5)}
                            height={normalized.hp(5)}
                          />
                          <Text style={styles.starText}>
                            {resetResponse || item.starText}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.wgmContainer}>
                        <Text style={styles.wgmText}>WGM</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleRemoveResult(index)}
                        style={styles.xIcon}>
                        <SvgXml xml={xIcon} width={wp(4)} height={wp(4)} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                ))
              : null}
          </React.Fragment>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.view2} onPress={navigateToAddOpponent}>
        <View style={styles.button}>
          <Text style={styles.text}>+</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.lastView}>
        <View style={styles.sixView}>
          <TouchableOpacity onPress={handleUndo} style={styles.sevenView}>
            <SvgXml xml={undo} width={20} height={20} />

            <Text style={styles.undoText}>Undo</Text>
          </TouchableOpacity>

          <View style={styles.seperator} />

          <TouchableOpacity onPress={handleReset} style={styles.eightView}>
            <Image source={images.icons.reset} style={styles.reset} />
            <Text style={styles.resetText}>reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonView}>
        <ButtonCTA
          customStyle={{ width: wp(90) }}
          buttonText={'Calculate Rating'}
          onPress={calRatingButton}
        />
      </View>
      <Text style={styles.nineText}>The ratings may not be accurate</Text>
    </View>
  );
};

export default Home;
