'use strict';

import React from 'react';
import RegistrationScreen from './RegistrationScreen';
import { phoneWithoutCountryCode_Indonesia }
  from '../../../customer/components/Formatter';
import { fetchTravoramaApi, fetchWishlist, AUTH_LEVEL, backToMain }
  from '../../../api/Common';
import registerForPushNotificationsAsync
  from '../../../api/NotificationController';
import { fetchTravoramaLoginApi } from '../AuthController';
import { shouldRefreshProfile } from '../../ProfileController';

const {getItemAsync, setItemAsync, deleteItemAsync} =
  Expo.SecureStore;

export default class RegistrationContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  _register = accountData => {
    const { replace, pop, state:{params} } = this.props.navigation;
    this.setState({ isLoading: true });

    let onOtpVerified = ({ countryCallCd, phone, otp, navigation }) =>
    {
      this.setState({ isLoading: true });
      let request = {
        path: '/v1/account/verifyphone',
        method: 'POST',
        data: { countryCallCd, phoneNumber: phone, otp },
        requiredAuthLevel: AUTH_LEVEL.User,
      }
      fetchTravoramaApi(request).then(({ status }) => {
        shouldRefreshProfile();
        if (status = 200) {
          let { resetAfter, thruBeforeLogin } = params;
          if (resetAfter)
            backToMain(this.props.navigation);
          else if (thruBeforeLogin)
            pop(2);
          else
            pop();
        }
      }).finally(() => this.setState({ isLoading: false }));
    };

    let goToPhoneVerification = () => {
      replace('OtpVerification', {
        countryCallCd: accountData.countryCallCd,
        phone: accountData.phone,
        onVerified: onOtpVerified,
      });
    };

    let request = {
      path: '/v1/register',
      method: 'POST',
      data: {
        ...accountData,
        phone: phoneWithoutCountryCode_Indonesia(accountData.phone),
        countryCallCd: '62'
      },
      requiredAuthLevel: AUTH_LEVEL.Guest,
    };

    this.setState({ isLoading: true });

    fetchTravoramaApi(request).then(response => {
      if (response.status == 200) {
        fetchTravoramaLoginApi( accountData.email, '62',
          accountData.phone, accountData.password
        ).then(response => {
          if (response.status == 200) {
            setItemAsync('isLoggedIn', 'true');
            registerForPushNotificationsAsync();
            fetchWishlist();
            goToPhoneVerification();
          } else {
            console.log(response);
            let error = 'Terjadi kesalahan pada server';
          }
          this.setState({ error });
        }).catch(error => {
          console.log("Login error!!");
          console.log(error);
        });
      } else {
        this.setState({ isLoading: false });
        let error;
        switch (response.error) {
          case 'ERR_EMAIL_ALREADY_EXIST':
            error = `Email ${accountData.email} sudah pernah terdaftar`;
            break;
          case 'ERR_PHONENUMBER_ALREADY_EXIST':
            error = `Nomor ${accountData.phone} sudah pernah terdaftar`;
            break;
          case 'ERR_INVALID_REQUEST':
            error = 'Ada kesalahan pengisian data';
            break;
          default:
            error = 'Terjadi kesalahan pada server';
        }
        this.setState({ error });
      }
    }).catch(error => console.log(error))
      .finally( () => this.setState({isLoading: false}) );
  }

  _goToLoginScreen = () => this.props.navigation
    .replace('LoginScreen', this.props.navigation.state.params)

  render() {
    const { isLoading } = this.state;
    const submitRegister = this._register;
    const goToLoginScreen = this._goToLoginScreen;
    return RegistrationScreen(
      {isLoading, submitRegister, goToLoginScreen}
    );
  }
}
