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
  bottomCtaBarContainer1: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    padding: 20,
    borderTopColor: "#efefef",
    borderTopWidth: 1,
  },
    bottomCtaBarContainer2: {
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
  openingText: {
    fontSize:56, color:'#fff', 
    fontFamily: 'Hind-Bold',
    ...Platform.select({
      ios: {
        lineHeight:56*0.4,
        paddingTop: 76 - (56 * 0.4)
      },
      android: {
        lineHeight:56*0.9,
        paddingBottom: 100 - (56 * 0.9)
      },
    }),
  },
  categoryTitle :{
    fontFamily:'Hind-Bold',
    fontSize:30,
    color:'#454545',
    ...Platform.select({
      ios: {
        lineHeight:20,
        paddingTop: 30 - (30 * 0.2),
        height:40
        //backgroundColor:'red'
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),
        //backgroundColor:'red'

      },
    }),
  },

});