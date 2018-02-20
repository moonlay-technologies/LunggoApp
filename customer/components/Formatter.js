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

// export var dollar = int => '$' + int;

export var price = money => {
	defaultMoneyFormat = rupiah; //// use rupiah as default price
	return defaultMoneyFormat(money);
}
