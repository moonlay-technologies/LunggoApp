import React from 'react';
import { View, Text, StyleSheet,Platform } from 'react-native';

export class MultilineText extends React.Component {
  // static propTypes = {
  //   children: React.PropTypes.string
  // };

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.children)
      return (
        <View>
          {this.props.children.split(/\\n|\\\\n|\\r\\n|\\\\r\\\\n/).map((line, idx) => (
            <Text style={styles.activityDesc} {...this.props} key={idx}>{line}</Text>
          ))}
        </View>
      );
    else return null;
  }
}

export class ListedText extends React.Component {
  // static propTypes = {
  //   children: React.PropTypes.string
  // };

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.children)
      return (
        <View>
          {this.props.children.split(/\\n- |\\\\n- |\\r\\n- |\\\\r\\\\n- |\r\n- |^- /m).map((line, idx) => idx != 0 &&(
            <View key={idx} style={{marginBottom:5}}>
              <View style={{flexDirection:"row"}}>
                <View style={{flex:0.1, }}><Text>-</Text></View>
                <View style={{flex:2}}><Text style={styles.activityDesc} {...this.props} key={idx}>{line}</Text></View>
              </View>
            </View>
          ))}
        </View>
      );
    else return null;
  }
}

export class MonoText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'space-mono' }]}
      />
    );
  }
}
const styles = StyleSheet.create({
  activityDesc: {
    fontSize: 15.5,
    color: '#454545',
    fontFamily: 'Hind-Light',
    ...Platform.select({
      ios: {
        lineHeight: 14,
        paddingTop: 9,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
});