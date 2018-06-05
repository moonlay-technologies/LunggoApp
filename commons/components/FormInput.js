'use strict';

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, View, TextInput } from 'react-native';
import Colors from '../../constants/Colors';

export default class FormInput extends React.Component {
  render() {
    let formStyle =
      this.props.typeForm == 'txtInput' ? styles.txtInput :
        this.props.typeForm == 'txtInputFalse' ? styles.txtInputFalse :
          null;
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>{this.props.label}</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            style={formStyle}
            keyboardType={this.props.keyboardType}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='next'
            // onSubmitEditing={(event) => {
            //   this.refs.passwordInput.focus();
            // }}
            // blurOnSubmit={false}
            // onChangeText={userName => this.setState({
            //   userName, errorUserName: null, error: null
            // })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: '#454545',
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        lineHeight: 14,
        paddingTop: 9,
        marginBottom: -10
      },
      android: {
      },
    }),
  },
  txtInput: {
    height: 45,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 7,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 5,
    color: Colors.primaryText,
    backgroundColor: '#fff',
    fontFamily: 'Hind',
  },
  txtInputFalse: {
    height: 45,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 7,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#fdaab8',
    borderRadius: 5,
    color: Colors.primaryText,
    backgroundColor: '#fff',
    fontFamily: 'Hind',
  },
})