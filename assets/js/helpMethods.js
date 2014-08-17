function randomNumber (low, high) {
	return Math.floor((Math.random()*high)+low);
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
