// import React, { useState } from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { Button } from 'react-native-paper';

// import NavigationService from 'app/navigation/NavigationService';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import {
//   enterIcon,
//   leftArrowIcon,
//   lockIcon,
//   neilPlayer,
//   starGoldIcon,
//   starIconTwo,
//   userIcon,
//   xIcon,
// } from 'app/assets/SVGs/index';

// import styles from './styles';
// import ButtonCTA from 'app/components/ButtonCTA';
// import CustomHeader from 'app/components/CustomHeader';
// import CustomInput from 'app/components/CustomInput';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import AppStyles from 'app/config/styles';
// import { normalized } from 'app/config/metrics';
// import { SvgXml } from 'react-native-svg';
// import { useDispatch, useSelector } from 'react-redux';
// import { userSearch } from 'app/redux/actions/action';

// const AddOpponent: React.FC = () => {
//   const [opponentName, setOpponentName] = useState('');
//   const [ratingNumber, setRatingNumber] = useState('');
//   const [selectedBtn, setSelectedBtn] = useState('W');
//   const goBack = () => NavigationService.goBack();
//   const navigateToHome = () => NavigationService.navigate('Home');
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();

//   const colors = [AppStyles.color.COLOR_PRIMARY, AppStyles.color.BABY_PINK];

//   const searchData = useSelector(state => state.auth.userSearch);
//   console.log('Search data:', searchData[0].first_name);

//   let userName = searchData[0].first_name;
//   let userRatingNumber = searchData[0].rating_israel;

//   const handleUserSearch = async () => {
//     try {
//       const response = await dispatch(userSearch());
//       console.log('api searching response: ', response);
//     } catch (error) {
//       console.error('Search error:', error);
//     }
//   };

//   const users = [
//     {
//       image: neilPlayer,
//       name: 'Mike',
//       rating: '500',
//       tag: 'GM',
//     },
//     {
//       image: neilPlayer,
//       name: 'Oreal',
//       rating: '500',
//       tag: 'IM',
//     },
//   ];

//   const gameStatsBtn = [
//     {
//       name: 'W',
//       value: 'W',
//     },
//     {
//       name: 'L',
//       value: 'L',
//     },
//     {
//       name: 'D',
//       value: 'D',
//     },
//   ];

//   const renderUsers = () => {
//     return (
//       <>
//         <View style={styles.divider} />
//         <Text style={styles.optionText}>Selected Options</Text>
//         {users.map((user, i) => {
//           const randomIndex = Math.floor(Math.random() * colors.length);
//           const randomColor = colors[randomIndex];
//           return (
//             <View key={i} style={styles.userParentContainer}>
//               <View style={styles.userChildContainer}>
//                 <View style={styles.userView}>
//                   <SvgXml
//                     xml={user.image}
//                     width={normalized.wp(12)}
//                     height={normalized.hp(12)}
//                     style={styles.userImg}
//                   />
//                   <View style={styles.userDetailsView}>
//                     <Text style={styles.userName}>{user.name}</Text>
//                     <View style={styles.ratingView}>
//                       <SvgXml
//                         xml={starGoldIcon}
//                         width={normalized.wp(5)}
//                         height={normalized.hp(5)}
//                       />
//                       <Text style={styles.starText}>{user.rating}</Text>
//                     </View>
//                   </View>
//                 </View>

//                 <View
//                   style={[
//                     styles.wgmContainer,
//                     { backgroundColor: randomColor },
//                   ]}>
//                   <Text style={styles.wgmText}>{user.tag}</Text>
//                 </View>

//                 <TouchableOpacity style={styles.xIcon}>
//                   <SvgXml xml={xIcon} width={wp(4)} height={wp(4)} />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           );
//         })}
//       </>
//     );
//   };

//   return (
//     <View
//       style={{ flexGrow: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
//       <ScrollView
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled">
//         <CustomHeader leftIcon={leftArrowIcon} onBackButtonPress={goBack} />
//         <View style={styles.childContainer}>
//           <View style={styles.headerContainer}>
//             <Text style={styles.heading}>Add Opponents</Text>
//           </View>

//           <CustomInput
//             value={opponentName}
//             iconName={userIcon}
//             onChangeText={e => setOpponentName(e)}
//           />

//           <View style={styles.gameStatsBtnView}>
//             {gameStatsBtn.map(btn => {
//               return (
//                 <TouchableOpacity
//                   style={[
//                     styles.statsBtnContainer,
//                     {
//                       backgroundColor:
//                         selectedBtn === btn.name
//                           ? AppStyles.color.BABY_PINK
//                           : '#F3F7FF',
//                       borderColor:
//                         selectedBtn === btn.name
//                           ? AppStyles.color.BABY_PINK
//                           : AppStyles.color.COLOR_PRIMARY,
//                     },
//                   ]}
//                   key={btn.name}
//                   onPress={() => setSelectedBtn(btn.value)}>
//                   <Text style={styles.statsBtnText}>{btn.name}</Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>

//           <CustomInput
//             placeholder="Enter Rating Number"
//             value={ratingNumber}
//             iconName={starIconTwo}
//             onChangeText={e => setRatingNumber(e)}
//             rightIcon={enterIcon}
//           />
//         </View>

//         {ratingNumber !== '' ? renderUsers() : null}
//       </ScrollView>
//       <View style={styles.secondaryButtonContainer}>
//         <ButtonCTA
//           customStyle={{ width: wp(90) }}
//           buttonText={'Submit'}
//           onPress={handleUserSearch} //navigateToHome
//         />
//       </View>
//     </View>
//   );
// };

// export default AddOpponent;

import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from 'app/redux/actions/action';
import { BaseURL, endPoints } from 'app/constants';

const AddOpponent: React.FC = () => {
  const [opponentName, setOpponentName] = useState('');
  const [ratingNumber, setRatingNumber] = useState(0);
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [serachApiData, setSearchApiData] = useState([]);
  const [selectedOptionArray, setSelectedOptionArray] = useState([]);
  const goBack = () => NavigationService.goBack();
  const navigateToHome = () => NavigationService.navigate('Home');
  const insets = useSafeAreaInsets();

  const colors = [AppStyles.color.COLOR_PRIMARY, AppStyles.color.BABY_PINK];

  const [name, setName] = useState('');
  const [rating, setRating] = useState('');

 
  const dispatch = useDispatch();


  const userData = () => {
    if (selectedOptionArray.length == 0) {
      Alert.alert('Note:', 'Please select users');
    } else {
      dispatch(searchUser(selectedOptionArray));
      navigateToHome();
    }
  };

  const selectedOptionArrayFN = () => {
    if (opponentName != '' && ratingNumber != '') {
      let valObj = {
        opponentName: opponentName,
        opponentPoints: selectedBtn,
        opponentRating: ratingNumber,
        image: neilPlayer,
        tag: 'GM',
      };
      let obj = [...selectedOptionArray, valObj];

      setOpponentName('');
      setRatingNumber('');
      setSelectedOptionArray(obj);
    } else {
      Alert.alert('Please fill all the fields');
    }
    setSelectedBtn('');
  };



  const gameStatsBtn = [
    {
      name: 'W',
      value: '0',
    },
    {
      name: 'D',
      value: '0.5',
    },
    {
      name: 'L',
      value: '1',
    },
  ];



  const getUsersFromApi = async (text: any) => {
    setOpponentName(text);
    try {
      if (text == '') {
        setSearchApiData([]);
      } else {
        const response = await BaseURL.get(`/search/users/${text}/1/10`);
       
        setSearchApiData(response.data);
 
        return response.data;
      }
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  };

  const renderUsers = () => {
    // if (opponentName === name) {
    return (
      <>
        <View style={styles.divider} />
        <Text style={styles.optionText}>Selected Options</Text>
        {selectedOptionArray.map((user: any, i) => {
          const randomIndex = Math.floor(Math.random() * colors.length);
          const randomColor = colors[randomIndex];
          console.log('user', user);
          return (
            <View key={i} style={styles.userParentContainer}>
              {/* Render the card components */}
              <View style={styles.userChildContainer}>
                <View style={styles.userView}>
                  <SvgXml
                    xml={user.image}
                    width={normalized.wp(12)}
                    height={normalized.hp(12)}
                    style={styles.userImg}
                  />
                  <View style={styles.userDetailsView}>
                    <Text style={styles.userName}>{user.opponentName}</Text>
                    <View style={styles.ratingView}>
                      <SvgXml
                        xml={starGoldIcon}
                        width={normalized.wp(5)}
                        height={normalized.hp(5)}
                      />
                      <Text style={styles.starText}>{user.opponentRating}</Text>
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
    // }
    // return null;
  };

  const onPressItem = (item: any) => {
    console.log('item', item);
    setSearchApiData([]);
    setOpponentName(item.first_name);
    setRatingNumber(item.rating_israel);
    setName(item.first_name);
    setRating(item.rating_israel);
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

          <View style={{ width: '100%' }}>
            <CustomInput
              value={opponentName}
              iconName={userIcon}
              onChangeText={e => getUsersFromApi(e)}
              placeholder={''}
              rightIcon={''}
            />
            {serachApiData.length > 0 && (
              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: 60,
                  height: 250,
                  width: '100%',
                  borderRadius: 10,
                  alignSelf: 'center',
                  backgroundColor: 'lightgray',
                }}>
                <ScrollView>
                  {serachApiData.map((item: any, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => onPressItem(item)}
                        style={{
                          height: 50,
                          marginHorizontal: 8,
                          borderRadius: 10,
                          marginTop: 5,
                          backgroundColor: 'white',
                          width: '96%',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            paddingHorizontal: 15,
                          }}>{`${item.first_name} ${item.last_name}`}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.gameStatsBtnView}>
            {gameStatsBtn.map((btn: any) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.statsBtnContainer,
                    {
                      backgroundColor:
                        selectedBtn === btn.value
                          ? AppStyles.color.BABY_PINK
                          : '#F3F7FF',
                      borderColor:
                        selectedBtn === btn.value
                          ? AppStyles.color.BABY_PINK
                          : AppStyles.color.COLOR_PRIMARY,
                    },
                  ]}
                  key={btn.name}
                  onPress={() => setSelectedBtn(btn.value)}>
                  <Text style={styles.statsBtnText}>{btn.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <CustomInput
            placeholder="Enter Rating Number"
            value={ratingNumber.toString()}
            iconName={starIconTwo}
            onRightIconPress={selectedOptionArrayFN}
            onChangeText={e => setRatingNumber(e)}
            rightIcon={enterIcon}
          />
        </View>

        {name != '' ? renderUsers() : null}

        <View style={styles.secondaryButtonContainer}>
          <ButtonCTA
            customStyle={{ width: wp(90) }}
            buttonText={'Submit'}
            onPress={() => {
              //handleUserSearch();
              userData();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddOpponent;
