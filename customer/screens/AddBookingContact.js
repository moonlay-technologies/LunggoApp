'use strict';

import React from 'react';
import {phoneWithoutCountryCode_Indonesia} from '../components/Formatter';
import PersonDataForm from '../../commons/components/PersonDataForm';

export default class AddBookingContact extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      ...props.navigation.state.params.contact,
    }
  }

  _backAndSetContact = contactData => {
    let { name, email, countryCallCd } = contactData;
    let phone = phoneWithoutCountryCode_Indonesia(contactData.phone);
    let contact = { name, email, phone, countryCallCd };
    this.props.navigation.state.params.setContact(contact);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <PersonDataForm onSubmit={this._backAndSetContact} formTitle='Kontak'
        contact={{...this.state}} submitButtonText='OK' />
    );
  }
}
