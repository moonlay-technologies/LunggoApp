'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';

export default class LoginScreen extends Component<{}> {

  static navigationOptions = {
    title: 'Peserta Baru',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Nama Guest
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          onChangeText={(text) => this.setState({text})}
          value={'Guest Name'}
        />
        <Text style={styles.label}>
          Tanggal Lahir
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          onChangeText={(text) => this.setState({text})}
          value={'tanggal lahir'}
        />
        <Text style={styles.label}>
          Email
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          onChangeText={(text) => this.setState({text})}
          value={'Email'}
        />
        <Text style={styles.label}>
          No. Telp
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          onChangeText={(text) => this.setState({text})}
          value={'08134561233'}
        />
        <Text style={styles.label}>
          No. KTP / Passport
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          onChangeText={(text) => this.setState({text})}
          value={'000156332'}
        />
        <View style={{alignItems: 'flex-end',}}>
          <Button
            containerStyle={{height:40, width:90, paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, backgroundColor: '#437ef7'}}
            style={{fontSize: 14, color: '#ffffff'}}
            onPress={() => this._handlePress()}>
            Save
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: '#fff',
    flex:1,
  },
  label: {
    marginBottom: 5,
  },
  txtInput: {
    height: 40, 
    borderColor: '#cdcdcd', 
    borderWidth: 1, 
    paddingRight:10, 
    paddingLeft:10, 
    marginBottom:20, 
  },
});
