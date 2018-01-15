'use strict';

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';
import Button from 'react-native-button';
import { Icon } from 'react-native-elements';
import { fetchWishlist, checkUserLoggedIn } from '../../api/Common';
import Modal from 'react-native-modal';
import globalStyles from '../../commons/globalStyles';

export default class WishButton extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isModalVisible: false,
      wishlisted: this.props.wishlisted,
    };
  }

  _onPress = async () => {
    let { wishlisted } = this.state;
    this.setState({wishlisted:!wishlisted})

    let isLoggedIn = await checkUserLoggedIn();
    if (!isLoggedIn) {
      return this.setState({isModalVisible:true, wishlisted});
    } else fetchWishlist(this.props.id, wishlisted);
  };

  _goToLoginScreen = () => {
    this.setState({isModalVisible: false});
    console.log(this.props)
    this.props.navigation.navigate('LoginScreen', {back: true} );
  }
  state = {open: false};
  render() {
  	return (
      <View>
        <TouchableOpacity onPress={this._onPress}
        style={{flex:1, alignItems:'flex-end',}} >
          <Icon type='materialicons' size={this.props.big? 30 : 24}
            name={this.state.wishlisted? 'favorite' : 'favorite-border'}
            color={this.state.wishlisted? 'red' : '#cdcdcd'}
          />
        </TouchableOpacity>

        <Modal
          style={{}}
          modalDidClose={() => this.setState({open: false})}
          // isVisible={true}
          isVisible={this.state.isModalVisible}
        >
        <View style={{paddingHorizontal:10,paddingVertical:15, backgroundColor:'#fff'}}>
          <Text style={styles.textCart}>
            Login Here
          </Text>
          <View style={{marginVertical:10}}>
            <Button 
            containerStyle={globalStyles.ctaButton2}
            style={{fontSize: 14, color: '#fff', fontFamily:'Hind',}}
            onPress={this._goToLoginScreen}>
              OK
            </Button>
          </View>
          <TouchableOpacity
            style={{margin: 5}}
            onPress={()=>this._setModalVisible(false)}>
            <Text>Close modal</Text>
          </TouchableOpacity>
        </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textCart: {
    fontFamily: 'Hind-Light', 
    color:'#454545', 
    fontSize:14,
    textAlign:'center',
    ...Platform.select({
      ios: {
        lineHeight:12,
        paddingTop:4,
        marginBottom:-5,
        marginTop:8
      },
      android: {
        marginTop:5

      },
    }),
  }
});
