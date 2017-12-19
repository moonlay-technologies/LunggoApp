'use strict';
import { Platform, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default StyleSheet.create({
  ctaButton: {
    height: 45,
    width: '100%',
    paddingTop: 13,
    paddingBottom: 13,
    overflow: 'hidden',
    borderRadius:25,
    backgroundColor: Colors.primaryColor,
  },
  bottomCtaBarContainer: {
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

});