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

export default class AddParticipant extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: null,
      birthDate : null,
      email : null,
      tel : null,
      idCardNo : null,
    };
  }

  static navigationOptions = {
    title: 'Registrasi',
  };

  _add = () => {
    //// validation
    if (!this.state.name) return;
    
    //// if validation passed
    //// pass data to ParticipanChoice
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.addParticipantListItem(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Nama
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          onChangeText={ name => this.setState({name}) }
          value={this.state.name}
        />
        <Text style={styles.label}>
          Email
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          onChangeText={ email => this.setState({email}) }
          value={this.state.email}
        />
        <Text style={styles.label}>
          Password
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={{ height: 40, borderColor: '#cdcdcd', borderWidth: 1, paddingRight:10, paddingLeft:10, marginBottom:5, }}
          onChangeText={ password => this.setState({password}) }
          value={this.state.password}
        />
        <Text style={{marginBottom:20, fontSize:12}}>Gunakan kombinasi huruf kapital dan angka</Text>
        <Text style={styles.label}>
          Ulangi Password
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          value={this.state.password}
        />
        <View style={{alignItems: 'flex-end',}}>
          <Button
            containerStyle={{
              height: 50,
              width: '100%',
              paddingTop: 15,
              paddingBottom :10,
              overflow: 'hidden',
              borderRadius: 4,
              backgroundColor: '#437ef7',
            }}
            style={{fontSize: 15, color: '#ffffff'}}
            onPress={this._add}
          >
            Sign In
          </Button>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop:25, flexDirection: 'row'}}>
          <Text>
            Sudah punya akun ?
          </Text>
          <Text style={{marginLeft:10, color:'#437ef7', textDecorationLine: 'underline'}}>
            Login
          </Text>
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
