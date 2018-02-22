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
  if (!emailString.match(Regex.email)) return 'Email/nomor telepon belum benar';
  return null;
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

export function validatePhone (phoneNumber) {
  //// blom bisa validasi + (+62...)
 if ( !isNaN(phoneNumber) && phoneNumber!='' && phoneNumber!=false
    && phoneNumber >= 100000000 ) return null;
  return 'Email/nomor telepon belum benar';
}

// //// phone number validation with 10 or more digits
// export var validatePhone = testInput => /\d{10,}/.test(testInput);

//// phone number validation starts with 0 | +62 followed by another 9 or more numbers
export var validatePhone_Indonesia = testInput => /(0|[+]?62)\d{9,}/.test(testInput);

//// validasi no KTP: length == 16
export var validateKTP = testInput => /\d{16}/.test(testInput);


//// validasi no kartu kredit
//// masa berlaku kartu kredit
//// no CCV
//// kode pos
//// no passport
//// no STNK
//// NIK/NIM
//// no NPWP
//// gmaps lat / lng
//// no RT/RW

//// province
//// city
