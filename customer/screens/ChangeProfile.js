'use strict';

import React from 'react';
import { phoneWithoutCountryCode_Indonesia } from '../components/Formatter';
import PersonDataForm from '../../commons/components/PersonDataForm';
import { AUTH_LEVEL, fetchTravoramaApi, backToMain } from '../../api/Common';
import { fetchProfile } from '../../commons/ProfileController';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingModal from './../../commons/components/LoadingModal';

export default class ChangeProfile extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false
    };
  }

  _changeProfile = async  profile => {
    this.setState({ isLoading: true });

    let request = {
      path: '/v1/profile',
      method: 'PATCH',
      data: { ...profile },
      requiredAuthLevel: AUTH_LEVEL.User,
    }
    var changeProfileResponse = await fetchTravoramaApi(request);

    if (changeProfileResponse.status == 200) {
      await fetchProfile();
      this.props.navigation.goBack();
    } else {
      // TODO: display if timeout or failed
      console.log('failed to fetch profile. response:');
      console.log(changeProfileResponse);
    }

    this.setState({ isLoading: false });
  }

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={true}>
        <LoadingModal isVisible={this.state.isLoading} />
        <PersonDataForm
          contact={this.props.navigation.state.params.profile}
          onSubmit={this._changeProfile}
          formTitle='Ubah Profil'
          submitButtonText='OK' />
      </KeyboardAwareScrollView>
    );
  }
}
