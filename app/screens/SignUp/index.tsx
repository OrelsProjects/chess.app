import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from 'app/components/CustomHeader';
import styles from './style';
import CustomInput from 'app/components/CustomInput';
import { useStore } from 'app/store';
import {
  lockIcon,
  mailIcon,
  starIcon,
  calenderIcon,
} from 'app/assets/SVGs/index';
import { Auth } from 'aws-amplify';
import ButtonCTA from 'app/components/ButtonCTA';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavigationService from 'app/navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { Signup, setHeader, setToken, setUserInfo, userSignupInfo } from 'app/redux/actions/action';
import { normalized } from 'app/config/metrics';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { SvgXml } from 'react-native-svg';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

const SignUpScreen: React.FC = () => {
  const {t} = useTranslation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [israel, setIsrael] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)

  const insets = useSafeAreaInsets();

  const handleLogin = () => NavigationService.navigate('Login');
  const authSignup = () =>
    fetchData(name, password, email, '+123456789',israel);
  //console.log("name, password", name, password);
  //NavigationService.navigate('Login');

  type SignUpParameters = {
    name: string;
    password: string;
    email: string;
    phoneNumber: string;
  };

  const fetchData = async (name, password, email, phoneNumber,israel) => {
    console.log("test",email)
    try {
      setLoading(true);
      const  user  = await Auth.signUp({
        username: name,
        password: password,

        attributes: {
          email: email?.toLowerCase(), // optional
          phone_number: phoneNumber, // optional - E.164 number convention
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: false,
        },
      });
  console.log("zest",JSON.stringify(user))
      dispatch(setToken(user?.userSub))

      const interval = setInterval(()=>{
        dispatch(setUserInfo({name, email}))
        try {
          let objParam={
            first_name: name,
            last_name: 'testing',
            gender: 'male',
            email: email,
            phone_number: '0543442286',
            player_number: Number(israel),
            date_of_birth: '12-12-2020',
          }
          dispatch(Signup(objParam));
         setLoading(false)
         clearInterval(interval)
        } catch (error) {
          setLoading(false)
          console.error('Signup error:', error);
        }

      },3000)
     

      // NavigationService.navigate('EnterOTP', {
      //   username: name,
      //   password: password,
      //   email: email,
      //   israel_rt:israel
      // });
    } catch (error) {
      setLoading(false)
      console.log('error signing up:', error);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(()=>{
    console.log('Password:',password)
  },[password])
  const verifyOTP = async () => {

    
  };

  const dispatch = useDispatch();

  const handleUserInfo = async () => {
    try {
      let obj={
        first_name: name,
        gender: 'male',
        email: email.toLowerCase(),
        password: password,
        date_of_birth: birth,
      }
      dispatch(
        userSignupInfo(obj),
      );
      //console.log('userSignUp dispatched', name, email, password, birth);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  // useEffect(() => {
  //   handleLogin;
  // }, []);

  return (
    <View
      style={{ flexGrow: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
      <ScrollView>
        <View style={styles.container}>
          <CustomHeader />

          <View style={styles.childContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.welcome}>{t('signUp')} </Text>
              <Text style={styles.loginToContinue}>
                {t('signUpForRegistration')}
              </Text>
            </View>
            <CustomInput
              placeholder={t('name')}
              value={name}
              iconName={mailIcon}
              onChangeText={e => setName(e)}
            />
            <CustomInput
              placeholder={t('email')}
              value={email}
              iconName={mailIcon}
              onChangeText={e => setEmail(e)}
              keyboardType={'email-address'}
            />
            <CustomInput
              placeholder={t('password')}
              value={password}
              iconName={lockIcon}
              onChangeText={e => setPassword(e)}
              secureTextEntry={true}
            />
            {/* <CustomInput
              placeholder={t('dateOfBirth')}
              value={birth}
              iconName={calenderIcon}
              onChangeText={e => setBirth(e)}
            /> */}
            <TouchableOpacity style={styles.datePickerContainer} onPress={()=>setOpen(true)}>
              <SvgXml xml={calenderIcon} height={'20'} width={'20'} />
              <Text style={[styles.datePickerText]}>{birth?birth:moment(new Date()).format('DD-MM-YYYY')}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              mode='date'
              open={open}
              date={new Date()}
              onConfirm={(date) => {
                setOpen(false)
                setBirth(moment(date).format('DD-MM-YYYY'))
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />

            <CustomInput
              placeholder={`${t('israel')} ${t('rating')}`}
              value={israel}
              iconName={starIcon}
              maxLength={6}
              onChangeText={e => setIsrael(e)}
            />
            

            <View style={styles.mainSigningView}>
              <View style={styles.childSigningView}>
                <Text style={styles.noAccount}>
                  {t('bySigningUpYoureAgreeToOur')}
                </Text>
                <TouchableOpacity>
                  <Text style={styles.signUp}> {t('termsAndConditions')} </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.andView}>
                <Text style={styles.noAccount}>{t('and')}</Text>
                <TouchableOpacity>
                  <Text style={styles.signUpPolicy}> {t('privacyPolicy')}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ButtonCTA
              customStyle={{ width: wp(90), top: normalized.hp(3) }}
              buttonText={t('signUp')}
              onPress={() => {
              
                authSignup();
              }}
              disabled={loading}
              loading={loading}
            />
          </View>
          <View style={styles.secondaryButtonContainer}>
            <Text style={styles.noAccountTwo}>{t('dontHaveAnAccount')} </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.signUp}>{t('login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
