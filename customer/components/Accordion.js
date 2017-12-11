import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

export default class AccordionView extends Component {

  constructor(props) {
    super(props);
    this.icons = {   
      'up'   : require('../../assets/icons/right-arrow.png'),
      'down' : require('../../assets/icons/down-arrow.png')
    };
  }

  _renderHeader(section, isActive) {
    let icon = isActive ? this.icons['up'] : this.icons['down'];
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{section.title}</Text>
          <Image style={styles.buttonImage} source={icon}/>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  }

  render() {
    return (
      <Accordion
        style={styles.container}
        sections={this.props.sections}
        renderHeader={(section, index, isActive) =>
          this._renderHeader(section,isActive)
        }
        renderContent={this._renderContent}
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    // marginTop: 20,
    // overflow: 'hidden'
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
  content: {
    padding   : 10,
    paddingTop: 0,
    borderBottomColor: "#cdcdcd",
    borderBottomWidth: 1,
    overflow: 'hidden'
  },
})