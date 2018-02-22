'use strict';

import React from 'react';
import Button from 'react-native-button';
import {
  Platform, StyleSheet, Text, View, Image, TouchableOpacity,
  ScrollView,
} from 'react-native';
import globalStyles from '../../commons/globalStyles';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { checkUserLoggedIn } from '../../api/Common'; //'../../commons/Auth/AuthController';
import { removeAccessToken } from '../../commons/Auth/AuthController';
import { NavigationActions } from 'react-navigation';
import { getProfile } from '../../commons/ProfileController';

export default class AccountScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      isLoggedIn: null,
      name: '...',
      avatar: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png',
    }
  }

  static navigationOptions = {
    title: 'Akun',
  };

  componentDidMount() {
    checkUserLoggedIn().then(isLoggedIn => {
      this.setState({ isLoggedIn });
      if (isLoggedIn)
        getProfile().then(({ contact }) => this.setState(contact));
    });
  }

  _setModalVisible = vis => this.setState({ isModalVisible: vis })

  _logout = () => {
    removeAccessToken().then(() =>
      this.props.navigation.dispatch(NavigationActions.reset(
        {
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'MainTabNavigator' })]
        }
      ))
    );
  }

  _closeModal = () => this._setModalVisible(false)

  render() {
    let { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>

        <Modal isVisible={this.state.isModalVisible}
          onBackdropPress={this._closeModal}
          onBackButtonPress={this._closeModal}
        >
          <View style={{ paddingHorizontal: 10, paddingVertical: 15, backgroundColor: '#fff' }}>
            <Text style={styles.textCart}>
              Apakah kamu yakin mau log out?
            </Text>
            <View style={{ marginVertical: 10 }}>
              <Button
                containerStyle={globalStyles.ctaButton2}
                style={{ fontSize: 14, color: '#fff', fontFamily: 'Hind', }}
                onPress={this._closeModal}>
                Tidak
              </Button>
            </View>
            <View>
              <Button
                containerStyle={globalStyles.ctaButton3}
                style={{ fontSize: 14, color: '#ff5f5f', fontFamily: 'Hind', }}
                onPress={this._logout}>
                Ya
              </Button>
            </View>
          </View>
        </Modal>

        {this.state.isLoggedIn ?

          <View style={styles.container}>
            <View style={{ alignItems: 'center', marginBottom: 40 }}>
              <View style={{ marginBottom: 20 }}>
                <Image style={styles.avatarBig} source={{ uri: this.state.avatar }} />
              </View>
              {/*<View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.activitydetailTitle}>{this.state.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.textCart}>Edit Profile</Text>
                  <View style={{ marginHorizontal: 10 }}>
                    <Text style={styles.textCart}>|</Text>
                  </View>
                  <Text style={styles.textCartColor}>100 point</Text>
                </View>
              </View>*/}
            </View>
            {/* <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef', paddingBottom: 15, marginBottom: 15 }}>
              <View style={{ justifyContent: 'center', flex: 1 }}>
                <Text style={styles.optionProfile}>{this.state.name}</Text>
              </View>
              <TouchableOpacity style={{ alignItems: 'flex-end', flex: 1 }}>
                <Icon
                  name='ios-settings-outline'
                  type='ionicon'
                  size={30}
                  color='#454545' />
              </TouchableOpacity>
            </View>

            {/*<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef', paddingBottom: 15, marginBottom: 15 }}>
              <View style={{ justifyContent: 'center', flex: 1 }}>
                <Text style={styles.optionProfile}>Notifikasi</Text>
              </View>
              <View style={{ alignItems: 'flex-end', flex: 1 }}>
                <Icon
                  name='ios-notifications-outline'
                  type='ionicon'
                  size={30}
                  color='#454545' />
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef', paddingBottom: 15, marginBottom: 15 }}>
              <View style={{ justifyContent: 'center', flex: 1 }}>
                <Text style={styles.optionProfile}>Undang Teman</Text>
              </View>
              <View style={{ alignItems: 'flex-end', flex: 1 }}>
                <Icon
                  name='ios-contacts-outline'
                  type='ionicon'
                  size={30}
                  color='#454545' />
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef', paddingBottom: 15, marginBottom: 15 }}>
              <View style={{ justifyContent: 'center', flex: 1 }}>
                <Text style={styles.optionProfile}>Pembayaran</Text>
              </View>
              <View style={{ alignItems: 'flex-end', flex: 1 }}>
                <Icon
                  name='ios-cash-outline'
                  type='ionicon'
                  size={30}
                  color='#454545' />
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef', paddingBottom: 15, marginBottom: 15 }}>
              <View style={{ justifyContent: 'center', flex: 1 }}>
                <Text style={styles.optionProfile}>Pengaturan</Text>
              </View>
              <View style={{ alignItems: 'flex-end', flex: 1 }}>
                <Icon
                  name='ios-settings-outline'
                  type='ionicon'
                  size={30}
                  color='#454545' />
              </View>
            </View>*/}
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#efefef', paddingBottom: 15, marginBottom: 15 }}>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._setModalVisible(true)}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                  <Text style={styles.optionProfile}>Log Out</Text>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                  <Icon
                    name='ios-log-out'
                    type='ionicon'
                    size={30}
                    color='#454545' />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          :
          <View style={styles.container}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#efefef', paddingBottom: 15, marginBottom: 15 }}>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigate('LoginScreen', { resetAfter: true })}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                  <Text style={styles.optionProfile}>Log In</Text>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                  <Icon
                    name='ios-log-in'
                    type='ionicon'
                    size={30}
                    color='#454545' />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#efefef', paddingBottom: 15, marginBottom: 15 }}>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigate('Registration', { resetAfter: true })}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                  <Text style={styles.optionProfile}>Daftar</Text>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                  <Icon
                    name='ios-laptop'
                    type='ionicon'
                    size={30}
                    color='#454545' />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  activitydetailTitle: {
    fontFamily: 'Hind-Bold',
    fontSize: 19,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 12,
        paddingTop: 14,
        marginBottom: -16,
      },
      android: {
        lineHeight: 24
      },
    }),
  },
  avatarBig: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 45
  },
  textCartBesar: {
    fontFamily: 'Hind-Bold',
    color: '#454545',
    fontSize: 19,
    ...Platform.select({
      ios: {
        lineHeight: 25,
        paddingTop: 0,
      },
      android: {},
    }),
  },
  textCart: {
    fontFamily: 'Hind-Light',
    color: '#454545',
    fontSize: 14,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 12,
        paddingTop: 4,
        marginBottom: -5,
        marginTop: 8
      },
      android: {
        marginTop: 5

      },
    }),
  },
  textCartColor: {
    fontFamily: 'Hind',
    color: '#ff5f5f',
    fontSize: 14,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 12,
        paddingTop: 4,
        marginBottom: -5,
        marginTop: 8
      },
      android: {
        marginTop: 5

      },
    }),
  },
  optionProfile: {
    fontFamily: 'Hind-Light',
    fontSize: 17,
    ...Platform.select({
      ios: {
        lineHeight: 25,
        paddingTop: 0,
        marginBottom: -10,
        //backgroundColor:'red'
      },
      android: {},
    }),
  },
});
