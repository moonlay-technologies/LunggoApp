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
    let {navigate} = this.props.navigation;
    return (
      <View style={{ backgroundColor: '#fff'}}>
        <View style={[styles.header,styles.flowRight]}>
          <View style={{flex:6,}}>
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
              style={{position:'absolute', right:5, top:-5, padding:9}}
            >
              <View>
                <Icon
                  name='magnifying-glass'
                  type='entypo'
                  size={20}
                  color='#cccccc'/>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex:1,alignItems:'center',}}>
             <TouchableOpacity
              onPress={() => navigate('CartBlank')}
              activeOpacity={0.8}
             >
              <Icon
                name='shopping-basket'
                type='entypo'
                size={26}
                color='#23d3c3'/> 
            </TouchableOpacity>
            <View style={styles.notification}>
              <Text style={styles.txtNotification}>5</Text>
            </View>
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
  notification: {
    backgroundColor:'#ffc943',
    height:18,
    width:19,
    position:'absolute',
    right:0,
    top:-4,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:9,
  },
  txtNotification: {
    color:'#fff',
    fontFamily:'Hind-Bold',
    fontSize:12,
    ...Platform.select({
      ios: {
        //backgroundColor:'red',
        height:12,
        lineHeight:16,
      },
    })
  },
  header: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
       /* paddingHorizontal:15,
        paddingTop:30,
        paddingBottom:10,
        shadowColor: '#cdcdcd',
        shadowOffset: { height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // paddingVertical:15,*/
        paddingHorizontal:15,
        paddingTop:30,
        paddingBottom:10,
        borderBottomColor: "#ececec",
        borderBottomWidth: 1,
      },
      android: {
        paddingHorizontal:12.6,
        paddingVertical:12.6,
        elevation: 0,        
        borderBottomColor: "#ececec",
        borderBottomWidth: 1,

      },
    }),
  },
  searchInput: {
    height: 30,
    paddingLeft:15,
    paddingTop:5,
    paddingBottom:5,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 20,
    color: '#acacac',
    backgroundColor:'#f5f5f5',
  },
});