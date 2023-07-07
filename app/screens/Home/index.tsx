import React from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { useStore } from 'app/store';

import styles from './styles';
import { GetUserDetails } from 'app/services/react-query/queries/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from 'app/components/CustomHeader';
import { drawerIcon, neilPlayer, starGoldIcon, undo } from 'app/assets/SVGs';
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
const Home: React.FC = () => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const { isLoading, isFetching, data = { results: [] } } = GetUserDetails();
  const insets = useSafeAreaInsets();

  const onLogOut = () => {
    setIsLoggedIn(false);
  };

  const navigateToAddOpponent = () => NavigationService.navigate('AddOpponent');

  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };

  const content = [
    {
      svg: neilPlayer,
      text: 'Neil',
      starText: '1200',
      image: images.icons.players,
      starImage: images.icons.star,
      wgmImage: images.icons.wgm,
    },
    // Add more objects for additional items
  ];

  // const renderItem = ({ item }) => (
  //   <Card style={styles.card} mode="elevated">
  //     <Card.Cover source={{ uri: item.image }} />
  //     <Card.Title title={item.name} />
  //     <Card.Content>
  //       <View style={styles.content}>
  //         <Paragraph>Status: {item.status}</Paragraph>
  //         <Paragraph>Species: {item.species}</Paragraph>
  //         <Paragraph>Gender: {item.gender}</Paragraph>
  //       </View>
  //     </Card.Content>
  //   </Card>
  // );

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingTop: insets.top,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <CustomHeader leftIcon={drawerIcon} onBackButtonPress={openDrawer} />

      <View style={styles.ratingDirection}>
        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>Current Rating (224)</Text>
        </View>
        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>Expected Rating (1854)</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {Array.from({ length: 3 }, (_, index) => (
          <React.Fragment key={index}>
            {content.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.firstView}>
                <TouchableOpacity style={styles.secondView}>
                  <View style={styles.thirdView}>
                    <SvgXml xml={item.svg} style={styles.neil} />
                    <View style={styles.fourthView}>
                      <Text style={styles.neilText}>{item.text}</Text>
                      <Image source={item.image} style={styles.players} />
                    </View>
                    <View style={styles.middleView}>
                      {/* <Image source={item.starImage} style={styles.starImage} /> */}
                      <SvgXml
                        xml={starGoldIcon}
                        width={normalized.wp(5)}
                        height={normalized.hp(5)}
                      />
                      <Text style={styles.starText}>{item.starText}</Text>
                    </View>
                  </View>
                  <View style={styles.wgmContainer}>
                    <Text style={styles.wgmText}>WGM</Text>
                  </View>
                  {/* <Image source={item.wgmImage} style={styles.wgm} /> */}
                </TouchableOpacity>
              </View>
            ))}
          </React.Fragment>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.fifthView}
        onPress={navigateToAddOpponent}>
        <Image source={images.icons.addIcon} style={styles.addIcon} />
      </TouchableOpacity>
      <View style={styles.lastView}>
        <View style={styles.sixView}>
          <TouchableOpacity style={styles.sevenView}>
            <SvgXml xml={undo} width={20} height={20} />

            <Text style={styles.undoText}>Undo</Text>
          </TouchableOpacity>

          <View style={styles.seperator} />

          <TouchableOpacity style={styles.eightView}>
            <Image source={images.icons.reset} style={styles.reset} />
            <Text style={styles.resetText}>reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonView}>
        <ButtonCTA
          customStyle={{ width: wp(90) }}
          buttonText={'Calculate Rating'}
          // onPress={onLogin}
        />
      </View>
      <Text style={styles.nineText}>The ratings may not be accurate</Text>
    </View>
  );
};

export default Home;

// import React from 'react';
// import {
//   View,
//   FlatList,
//   RefreshControl,
//   TouchableOpacity,
//   Text,
//   Image,
//   ScrollView,
// } from 'react-native';
// import { useStore } from 'app/store';

// import styles from './styles';
// import { GetUserDetails } from 'app/services/react-query/queries/user';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import CustomHeader from 'app/components/CustomHeader';
// import { drawerIcon, neilPlayer, reset, undo } from 'app/assets/SVGs';
// import images from 'app/config/images';
// import { SvgXml } from 'react-native-svg';
// import { normalized } from 'app/config/metrics';
// const Home: React.FC = () => {
//   const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
//   const { isLoading, isFetching, data = { results: [] } } = GetUserDetails();
//   const insets = useSafeAreaInsets();

//   const onLogOut = () => {
//     setIsLoggedIn(false);
//   };

//   const content = [
//     {
//       svg: neilPlayer,
//       text: 'Neil',
//       starText: '1200',
//       image: images.icons.players,
//       starImage: images.icons.star,
//       wgmImage: images.icons.wgm,
//     },
//   ];

//   return (
//     <View
//       style={{
//         flexGrow: 1,
//         backgroundColor: '#fff',
//         paddingTop: insets.top,
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//       }}>
//       <CustomHeader leftIcon={drawerIcon} />
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         {Array.from({ length: 8 }, (_, index) => (
//           <React.Fragment key={index}>
//             {content.map((item, itemIndex) => (
//               <View key={itemIndex} style={styles.firstView}>
//                 <TouchableOpacity style={styles.secondView}>
//                   <View style={styles.thirdView}>
//                     <SvgXml xml={item.svg} style={styles.neil} />
//                     <View style={styles.fourthView}>
//                       <Text style={styles.neilText}>{item.text}</Text>
//                       <Image source={item.image} style={styles.players} />
//                     </View>
//                     <View style={styles.middleView}>
//                       <Image source={item.starImage} style={styles.starImage} />
//                       <Text style={styles.neilText}>{item.starText}</Text>
//                     </View>
//                   </View>
//                   <Image source={item.wgmImage} style={styles.wgm} />
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </React.Fragment>
//         ))}
//       </ScrollView>

//       <View style={styles.lastView}>
//         <TouchableOpacity style={styles.fifthView}>
//           <Image source={images.icons.addIcon} style={styles.addIcon} />
//         </TouchableOpacity>

//         <View style={styles.sixView}>
//           <TouchableOpacity style={styles.sevenView}>
//             <SvgXml xml={undo} width={normalized.wp(6)} height={normalized.hp(2)} />
//             {/* <Image source={images.icons.undo} style={styles.undo} /> */}
//             <Text style={styles.undoText}>Undo</Text>
//           </TouchableOpacity>

//           <View style={styles.seperator}></View>

//           <TouchableOpacity style={styles.eightView}>
//            {/* <SvgXml xml={reset} width={normalized.wp(8)} height={normalized.hp(3)} /> */}
//             <Image source={images.icons.reset} style={styles.reset} />
//             <Text style={styles.resetText}>reset</Text>
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.nineText}>The ratings may not be accurate</Text>

//       </View>
//     </View>
//   );
// };

// export default Home;
