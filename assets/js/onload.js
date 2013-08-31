window.onload = function(){
//	db = new Database();
	
	destinationList = [];
	sourceList = [];
	destinationList = [];
	
	initDB();
	$(".chosen-select").chosen();
	$(".floating_form").hide();
	hide_overlay();

	addFrame();
	loadUrlInFrame("wise.vub.ac.be", 1)
	addFrame();
	loadUrlInFrame("darkthrone.com", 2)

}
