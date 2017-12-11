import React, {Component} from 'react';
import {
  Platform, StyleSheet, FlatList,
  Text, View, Image, TextInput, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements'

export default class SearchHeader extends Component {

  constructor (props) {
    super(props)
    this.state = {
      searchString:'',
      placeholder: 'Try "snorkeling"...',
    };
  }

  _goToSearchResult = () => {
    this.props.navigation.navigate(
      'SearchResults', {searchString: this.state.searchString}
    );
  };

  render() {
    return (
      <View style={{ backgroundColor: '#fff'}}>
        <View style={[styles.header,styles.flowRight]}>
          <View style={{flex:6}}>
            <TextInput
              style={styles.searchInput}
              onChangeText={str => this.setState({searchString:str})}
              onSubmitEditing={this._goToSearchResult}
              placeholder={this.state.placeholder}
              returnKeyType='search'
              underlineColorAndroid='transparent'
              selectTextOnFocus={true}
            />
            <TouchableOpacity
              onPress={this._goToSearchResult}
              style={{position:'absolute', right:5, top:-3, padding:9}}
            >
              <View>
                <Icon
                  name='magnifying-glass'
                  type='entypo'
                  size={22}
                  color='#acacac'/>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-end'}}>
            <Icon
              name='shopping-cart'
              type='feather'
              size={30}
              color='#acacac'/>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  header: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        paddingHorizontal:15,
        paddingTop:30,
        paddingBottom:15
      },
      android: {
        paddingHorizontal:15,
        paddingVertical:20,
      },
    }),
  },
  searchInput: {
    height: 35,
    paddingLeft:15,
    paddingTop:5,
    paddingBottom:5,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 25,
    color: '#acacac',
    backgroundColor:'#f5f5f5',
  },
});