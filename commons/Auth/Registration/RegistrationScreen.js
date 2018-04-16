'use strict';

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PersonDataForm from '../../components/PersonDataForm';
import LoadingModal from './../../components/LoadingModal';

export default function RegistrationScreen(props) {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <LoadingModal isVisible={props.isLoading} />
      <PersonDataForm onSubmit={props.submitRegister} formTitle='Daftar Akun Baru' hasPasswordField
        submitButtonText='Daftarkan' buttonDisabled={props.isLoading}
      />
      <TouchableOpacity style={{ marginBottom: 30, alignItems: 'center' }}
        onPress={props.goToLoginScreen}
      >
        <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Hind' }}>
          Sudah punya akun? Login di sini
        </Text>
      </TouchableOpacity>
    </View>
  );
}