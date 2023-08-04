/**
 * @format
 */

import { AppRegistry,I18nManager } from 'react-native';
import App from './app/Entrypoint';
import { name as appName } from './app.json';
// I18nManager.allowRTL(true);
// setTimeout(() => I18nManager.allowRTL(false), 1000)
// I18nManager.allowRTL(true);
  
AppRegistry.registerComponent(appName, () => App);
