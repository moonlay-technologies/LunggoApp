import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import Expo, { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import Colors from './constants/Colors';
import UpdateNotifModal from './customer/components/UpdateNotifModal';
import { fetchTravoramaApi, AUTH_LEVEL } from './api/Common';
import { addMyBookingListener } from './api/NotificationController';
import intervalController from './customer/screens/IntervalController';

const { getItemAsync, setItemAsync, deleteItemAsync } = Expo.SecureStore;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      skipIntro: false,
      isLoggedIn: false,
    };
  }

  componentWillUnmount() {
    intervalController.stop();
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onFinish={this._handleFinishLoading}
          onError={this._handleLoadingError}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          <RootNavigation
            skipIntro={this.state.skipIntro}
            isLoggedIn={this.state.isLoggedIn}
          />
          <UpdateNotifModal isVisible={this.state.isNotifModalVisible} currentVersion={this.state.currentVersion} latestVersion={this.state.latestVersion} urlPlatform={this.state.urlPlatform} forceToUpdate={this.state.forceToUpdate} />
        </View>
      );
    }
  }

  _checkVersion = () => {
    //currentVersion di Api masih 1.0.1
    //let currentVersion = "1.0.0";
    let currentVersion = Expo.Constants.manifest.version;
    let urlPlatform = '';
    let platform = Platform.OS;
    const version = 'v1';
    fetchTravoramaApi({
      method: 'POST',
      path: '/checkversion',
      requiredAuthLevel: AUTH_LEVEL.Guest,
      data: { currentVersion, platform },
    }).then(response => {
      console.log('cek versi');
      console.log(response);
      console.log('tutub');
      console.log(Platform);
      console.log(Expo.Constants.manifest);
      if (response.mustUpdate == true) {
        this.setState({
          isNotifModalVisible: true,
          currentVersion: currentVersion,
          latestVersion: response.latestVersion,
          urlPlatform: response.updateUrl,
          forceToUpdate: response.forceToUpdate
        });
      }
    });
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      getItemAsync('skipIntro').then(res => this.setState({ skipIntro: res })),
      getItemAsync('isLoggedIn').then(isLoggedIn => this.setState({ isLoggedIn })),
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        // { 'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf') },
        // { 'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf') },
        // { 'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf') },
        // { 'OpenSans-BoldItalic': require('./assets/fonts/OpenSans-BoldItalic.ttf') },
        // { 'OpenSans-CondLight': require('./assets/fonts/OpenSans-CondLight.ttf') },
        // { 'OpenSans-ExtraBold': require('./assets/fonts/OpenSans-ExtraBold.ttf') },
        // { 'OpenSans-ExtraBoldItalic': require('./assets/fonts/OpenSans-ExtraBoldItalic.ttf') },
        // { 'OpenSans-Italic': require('./assets/fonts/OpenSans-Italic.ttf') },
        // { 'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf') },
        // { 'OpenSans-LightItalic': require('./assets/fonts/OpenSans-LightItalic.ttf') },
        // { 'OpenSans-Semibold': require('./assets/fonts/OpenSans-Semibold.ttf') },
        // { 'OpenSans-SemiboldItalic': require('./assets/fonts/OpenSans-SemiboldItalic.ttf') },
        HurmeBold: require('./assets/fonts/HurmeGeometricSans4-Bold.otf'),
        HurmeSemiBold: require('./assets/fonts/HurmeGeometricSans4-SemiBold.otf'),
        Hurme: require('./assets/fonts/HurmeGeometricSans4.otf'),
        HurmeLight: require('./assets/fonts/HurmeGeometricSans4-Light.otf'),

        Hind: require('./assets/fonts/hind-regular.ttf'),
        HindBold: require('./assets/fonts/hind-bold.ttf'),
        HindSemiBold: require('./assets/fonts/hind-semibold.ttf'),
        HindLight: require('./assets/fonts/hind-light.ttf'),

      }),
      this._checkVersion(),
      addMyBookingListener(),
      intervalController.start(),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: Expo.Constants.statusBarHeight,
    backgroundColor: Colors.statusBar,
  },
});
