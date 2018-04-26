import React from 'react';
import { View, Text } from 'react-native';

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
            <Text {...this.props} key={idx}>{line}</Text>
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
