//// Format price to Rp1.000.000
export var price = price =>
	"Rp " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
