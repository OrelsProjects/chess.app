// /**
//  * React Native App
//  * Everything starts from the Entry-point
//  */
// import React, { useEffect } from 'react';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { QueryClientProvider } from '@tanstack/react-query';
// import {
//   PaperThemeDefault,
//   PaperThemeDark,
//   CombinedDefaultTheme,
//   CombinedDarkTheme,
// } from 'app/config/theme-config';
// import { Amplify } from 'aws-amplify';
// import Navigator from 'app/navigation';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor, store } from './redux/store/store';
// import { useStore } from './store';
// import { RNQueryClient } from './services/react-query/query-client';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const configureAmplify = () => {
//   Amplify.configure({
//     Auth: {
//       region: 'us-east-1',
//       identityPoolRegion: 'us-east-1',
//       userPoolId: 'us-east-1_EgPnNwPLu',
//       userPoolWebClientId: '74eq9c0prk4gogk1gbr083c3jj', // Add the clientId property
//     },
//   });
// };
// // You can get the current config object
// // const currentConfig = Auth.configure();

// const EntryPoint: React.FC = () => {
//   const isDark = useStore(state => state.isDarkMode);
//   const paperTheme = isDark ? PaperThemeDark :PaperThemeDefault;
//   const combinedTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;

//   useEffect(() => {
//     configureAmplify();
//   }, []);

//   return (
//     <>
//       <Provider store={store}>
//         <PersistGate persistor={persistor}>
//           <SafeAreaView style={{ flex: 1 }}>
//             <PaperProvider theme={paperTheme}>
//               <QueryClientProvider client={RNQueryClient}>
//                 <Navigator theme={combinedTheme} />
//               </QueryClientProvider>
//             </PaperProvider>
//           </SafeAreaView>
//         </PersistGate>
//       </Provider>
//     </>
//   );
// };

// export default EntryPoint;







/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  PaperThemeDefault,
  PaperThemeDark,
  CombinedDefaultTheme,
  CombinedDarkTheme,
} from 'app/config/theme-config';
import Navigator from 'app/navigation';
import { useStore } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store/store';
import { RNQueryClient } from './services/react-query/query-client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import i18n from './i18n';

Amplify.configure(awsconfig);
const EntryPoint: React.FC = () => {
  
  const isDark = useStore(state => state.isDarkMode);
  const paperTheme = isDark ? PaperThemeDark : PaperThemeDefault;
  const combinedTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;
  
  return (
    <>
       <Provider store={store}>
         <PersistGate persistor={persistor}>
           <SafeAreaView style={{ flex: 1 }}>
             <PaperProvider theme={paperTheme}>
               <QueryClientProvider client={RNQueryClient}>
                 <Navigator theme={combinedTheme} />
               </QueryClientProvider>
             </PaperProvider>
           </SafeAreaView>
         </PersistGate>
       </Provider>
    </>
  );
};

export default EntryPoint;