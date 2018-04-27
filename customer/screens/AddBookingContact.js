'use strict';

import React from 'react';
import { phoneWithoutCountryCode_Indonesia } from '../components/Formatter';
import PersonDataForm from '../../commons/components/PersonDataForm';
import { getProfile } from '../../commons/ProfileController';
import { CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class AddBookingContact extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      ...props.navigation.state.params.contact,
      isContactNeverFilled: props.navigation.state.params.isContactNeverFilled,
      resetValidator: false
    }
  }

  _fillMyContactInfo = async () => {
    let contact = await getProfile();
    console.log('contact');
    console.log(contact);
    this.setState({ isContactNeverFilled: false, ...contact, resetValidator: true });
  }

  _backAndSetContact = contactData => {
    let { name, email, countryCallCd } = contactData;
    let phone = phoneWithoutCountryCode_Indonesia(contactData.phone);
    let contact = { name, email, phone, countryCallCd };
    this.props.navigation.state.params.setContact(contact);
    this.props.navigation.goBack();
  }

  _fillMyContactInfoCheckbox = () => (
    (this.state.isContactNeverFilled) ?
      <CheckBox size={18} textStyle={{ fontSize: 13 }} style={{ marginBottom: 20 }}
        title='Isi dengan data saya sendiri'
        checkedColor='#01d4cb' uncheckedColor='grey' checked={false}
        onPress={this._fillMyContactInfo}
      /> : null
  )

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={true}>
        <PersonDataForm onSubmit={this._backAndSetContact} formTitle='Kontak'
          contact={this.state} submitButtonText='OK'
          additionalContent={<this._fillMyContactInfoCheckbox />} resetValidator={this.state.resetValidator}
        />
      </KeyboardAwareScrollView>
    );
  }
}
