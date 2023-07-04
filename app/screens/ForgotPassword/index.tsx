import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import NavigationService from 'app/navigation/NavigationService';

import styles from './styles';
import ButtonCTA from 'app/components/ButtonCTA';
const Home: React.FC = () => {
  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Forgot Password</Text>
      <Text style={styles.text2}>Don't worry it happens. Please enter your the email address with associated with your account</Text>
      <ButtonCTA buttonText={"Submit"} onPress={goBack}/>
    </View>
  );
};

export default Home;
