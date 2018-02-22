import Moment from 'moment';
import 'moment/locale/id';

export var dateFullShort = date =>
  Moment(date).format('ddd, D MMM YYYY');

export var dateFullLong = date =>
	Moment(date).format('dddd, D MMM YYYY');

export var date = date =>
	Moment(date).format('D MMM YYYY');

export var dateLong = date =>
	Moment(date).format('D MMMM YYYY');


//// Format number to "1.000.000"
export var number = int => int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//// Format price to "Rp 1.000.000"
export var rupiah = int => 'Rp ' + number(int);
export var price = rupiah; //// use rupiah as default price

// export var dollar = int => '$' + int;

//// format no handphone without prefix    0 | +
export var phoneWithoutPrefix = phone => {
  // TODO: validate if phone input is a valid phone number
  return (phone + '').replace(/^(0|[+])/,'');
}

//// format no handphone without Indonesia code   0 | +62
export var phoneWithoutCountryCode_Indonesia = phone => {
  // TODO: validate if phone input is a valid phone number
  return (phone + '').replace(/^(0|[+]?62)/,'');
}

//// format no handphone separator ' ', '-'

//// 24h-time formatter
//// format 'terbilang' (uang)

//// hari/tanggal/bulan/tahun - and other date format formatters
//// format negative numbers pake '-' dan pake '()'
//// format '2 jam 45 menit 30 detik'

