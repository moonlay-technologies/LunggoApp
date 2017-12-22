import Regex from '../constants/Regex';

export function validateUserName (userNameString) {
  let errorEmail = validateEmail(userNameString);
  let errorPhone = validatePhone(userNameString);
  // if (errorEmail != null) return errorEmail;
  // if (errorPhone != null) return errorPhone;
  // return null;

  if (errorEmail==null || errorPhone==null) return null;
  else return errorEmail;

}

export function validateEmail (emailString) {
  if (!emailString) return 'Wajib diisi';
  if (!emailString.match(Regex.email)) return 'Alamat email belum benar';
  return null;
}

export function validatePhone (phoneNumber) {
  //// blom bisa validasi + (+62...)
	if ( !isNaN(phoneNumber) && phoneNumber!='' && phoneNumber!=false
    && phoneNumber >= 1000000 ) return null;
  return 'Nomor belum benar';
}

export function validatePassword (passwordString) {
  if (!passwordString) return 'Wajib diisi'
  if (passwordString.length < 6) return 'Password minimal 6 karakter';
  return null;
}

export function validateRequiredField (inputString) {
  if (!inputString) return 'Wajib diisi'
  return null;
}
