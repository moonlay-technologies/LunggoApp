import Moment from 'moment';
import 'moment/locale/id';

//// Format price to Rp1.000.000
export var price = price =>
	"Rp " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export var dateFullShort = date =>
  Moment(date).format('ddd, D MMM YYYY');

export var dateFullLong = date =>
	Moment(date).format('dddd, D MMM YYYY');

export var date = date =>
	Moment(date).format('D MMM YYYY');

export var dateLong = date =>
	Moment(date).format('D MMMM YYYY');
