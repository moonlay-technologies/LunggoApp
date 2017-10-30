import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image,
  TouchableHighlight, Animated
} from 'react-native';

export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.icons = {   
      'up'   : require('../assets/icons/right-arrow.png'),
      'down' : require('../assets/icons/down-arrow.png')
    };

    this.state = {       
      title: props.title,
      expanded: true,
      animation: new Animated.Value()
    };
  }

  toggle() {
    let { minHeight, maxHeight, expanded, animation } = this.state;
    let initialValue = expanded ? maxHeight + minHeight : minHeight,
          finalValue = expanded ? minHeight : maxHeight + minHeight;

    this.setState({expanded : ! expanded});

    this.state.animation.setValue(initialValue);  //Step 3
    Animated.spring(animation, {toValue: finalValue}).start();
  }

  _setMinHeight(event) {
    this.setState({minHeight : event.nativeEvent.layout.height})
  }
  _setMaxHeight(event) {
    this.setState({maxHeight : event.nativeEvent.layout.height})
  }

  render() {
    let icon = (this.state.expanded) ? this.icons['up'] : this.icons['down'];
    return ( 
      <Animated.View style={styles.container,{height: this.state.animation}}>

        <View style={styles.titleContainer}
          onLayout={this._setMinHeight.bind(this)}
        >
          <Text style={styles.title}>
            {this.state.title}
          </Text>
          <TouchableHighlight 
            onPress={this.toggle.bind(this)}
            underlayColor="#f1f1f1"
          >
            <Image style={styles.buttonImage} source={icon}></Image>
          </TouchableHighlight>
        </View>

        <View style={styles.body}
          onLayout={this._setMaxHeight.bind(this)}
        >
          {this.props.children}
        </View>

      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 20,
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex    : 1,
    padding : 10,
    color   : '#2a2f43',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonImage: {
    width : 20,
    height: 20
  },
  body: {
    padding   : 10,
    paddingTop: 0,
    borderBottomColor: "#cdcdcd",
    borderBottomWidth: 1,
    overflow: 'hidden'
  }
});