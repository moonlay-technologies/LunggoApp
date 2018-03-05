import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
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
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{section.title}</Text>
            <Image style={styles.buttonImage} source={icon}/>
        </View>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text style={styles.activityDesc}>{section.content}</Text>
      </View>
    );
  }

  render() {
    return (
      <Accordion
        style={styles.container}
        sections={this.props.sections}
        underlayColor={'transparent'}
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
    flexDirection: 'row',
    marginVertical:20,
  },
  title: {
    flex    : 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#454545',
  },
  buttonImage: {
    width : 20,
    height: 20
  },
  content: {
    overflow: 'hidden',
    paddingBottom:30
  },
    divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
  },
  activityDesc: {
    fontSize: 16,
    color: '#454545',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 10,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },

})