'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import { CheckBox } from 'react-native-elements';
import * as Formatter from '../components/Formatter';
import {
  Platform, StyleSheet,
  Text, View, Image, TextInput, FlatList,
} from 'react-native';

export default class PaxChoice extends Component {

  static navigationOptions = {
    title: 'Pilih Peserta',
  };

  constructor (props) {
    super(props)
    this.state = {
      paxListItemIndexes: [undefined,true],
      pax: [
        { key:0, name: "John Doe (me)" },
        { key:1,id:1, name: "Ali Zainal" },
      ]
    };
  }

  postData = () => {
    let domain = 'http://travorama-local-api.azurewebsites.net';
    // let domain = 'api.travorama.com';
    let url = domain + '/v1/activities/book';
    
    /*fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activityId: this.props.navigation.state.params.activityId,
        contact: {
          title: 1,
          name: "Testing",
          countryCallCd: 62,
          phone : 1234567890,
          email: "developer@travelmadezy.com",
        },
        pax: [
          {
            type : 1,
            title : 1,
            name : "guest 1",
            dob : "02-18-1997",
            nationality : "ID",
            passportNo : "1234567",
            passportExp : "02-18-2022",
            passportCountry : "en",
          }
        ],
        date: this.props.navigation.state.params.date,
      })
    });*/
    this.props.navigation.navigate(
     'WebViewScreen', // { date: this.props.navigation.state.params.date }
    )

  }

  addPaxListItem = newPaxObj => {
    let {pax,paxListItemIndexes} = this.state;
    newPaxObj.key = pax.length;
    paxListItemIndexes[pax.length] = true;
    pax.push(newPaxObj)
    this.setState({pax,paxListItemIndexes})
  }

  _checkPax = index => {
    let {paxListItemIndexes} = this.state;
    paxListItemIndexes[index] = !paxListItemIndexes[index];
    this.setState({ paxListItemIndexes })
  }

  _renderItem = pax =>
    <View>
      <View style={{flexDirection: 'row'}}>
        <CheckBox style={{backgroundColor: '#fff'}}
          title={pax.name}
          checked={ this.state.paxListItemIndexes[pax.key] }
          onPress={ () => this._checkPax(pax.key) }
        />
        <View style={{
          alignItems: 'flex-end',
          flex: 1,
          marginTop: 3,
        }}>
          <Text>Edit</Text>
        </View>
      </View>
      <View style={styles.divider}/>
    </View>

  render() {
    let {navigation} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          style={{ marginBottom: 60, marginTop: 60, }}
          data={this.state.pax}
          renderItem={ ({item}) => this._renderItem(item) }
        />
          <Button
            containerStyle={{
              height: 35,
              flex: 1,
              paddingTop: 10,
              paddingBottom: 10,
              overflow: 'hidden',
              borderRadius: 4,
              backgroundColor: '#437ef7',
            }}
            style={{fontSize: 12, color: '#fff'}}
            onPress={ () => navigation.navigate(
              "AddPax", { addPaxListItem: this.addPaxListItem }
            )}
          >
            Tambah Peserta Baru
          </Button>

        {/*bottom CTA button*/}
        <View style={styles.bottomBarContainer}>
          <View style={{alignItems: 'flex-start', flex: 1}}>
            <Text style={{marginRight: 5, fontSize: 12,}}>
              1 Peserta
            </Text>
            <Text style={{
              color: 'green',
              marginRight: 3,
              fontWeight: 'bold',
              fontSize: 15,
            }}>
              {Formatter.price(navigation.state.params.price)}
            </Text> 
          </View>
          <View style={{alignItems: 'flex-end', flex:1}}>
            <Button
              containerStyle={{
                height: 35,
                width: 120,
                paddingTop: 10,
                paddingBottom: 10,
                overflow: 'hidden',
                borderRadius: 4,
                backgroundColor: '#437ef7',
              }}
              style={{fontSize: 12, color: '#fff'}}
              // onPress={() => this.postData()}
              onPress={() => navigation.navigate('WebViewScreen')}
            >
              Tambah ke Troli
            </Button>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    paddingBottom:40,
    backgroundColor: '#fff',
    flex:1,
  },
  bottomBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fbfbfb',
    padding: 20,
    borderTopColor: "#efefef",
    borderTopWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
   divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 15,
    marginBottom: 15,
  },
});
