function show_overlay(){
	show('overlay');
}
function hide_overlay(){
	hide('overlay');
}
function show(s){
	var obj = document.getElementById(s);
	obj.style.display='block';
}
function hide(s){
	var obj = document.getElementById(s);
	obj.style.display='none';
}
function open_floating_form(s){
	var obj = document.getElementById(s);
	show_overlay();
	obj.style.display='block';
}
function close_floating_form(s){
	var obj = document.getElementById(s);
	hide_overlay();
	obj.style.display='none';
}
