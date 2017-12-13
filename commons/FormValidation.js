import Regex from '../constants/Regex';

export function validateEmail (emailString) {
  if (!emailString) return 'Wajib diisi';
  if (!emailString.match(Regex.email)) return 'Alamat email belum benar';
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
