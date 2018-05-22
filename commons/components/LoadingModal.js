'use strict';

import React from 'react';
import { Text, View } from 'react-native';
import Modal from './Modal';
import LoadingAnimation from './../../customer/components/LoadingAnimation';

export default function LoadingModal (props) {
  return (
    <Modal
      onBackdropPress={ () => {} }
      onBackButtonPress={ () => {} }
      {...props}
    >
      <View style={{alignItems:'center'}}>
      <View style={{paddingVertical: 20, backgroundColor: '#fff', flexDirection: 'row', width:'80%'}}>
        <View style={{ height: 50, }}>
          <LoadingAnimation width={70} height={70} />
        </View>
        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
          <Text>Mohon tunggu...</Text>
        </View>
      </View>
      </View>
    </Modal>
  );
}