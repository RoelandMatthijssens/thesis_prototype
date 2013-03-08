function loadPage(id){
	url = $(".form input#url_"+id).val();
	load_url_in_frame(url, id);
}

function load_url_in_frame(url, id){
	var frame = $("#frame_"+id)
	frame.attr("src", "http://"+url);
	frame[0].onload = function(){load_script(id);};
	//load_script(id);
}

function remove_frame(id){
	$("#frame_container_"+id).remove();
}

function get_next_frame_id_container(){
	return $("#next_frame_id");
}

function get_next_frame_id(){
	return get_next_frame_id_container().val();
}

function incr_next_frame_id(){
	var previous_val = get_next_frame_id();
	var next_val = (parseInt(previous_val)+1).toString();
	get_next_frame_id_container().val(next_val);
	return next_val;
}

function add_frame(){
	var id = incr_next_frame_id();
	var content = $("#content");
	content.append(build_frame(id));
}

function build_frame(id){
	var container = $(document.createElement('div'));
	container.addClass("frame_container");
	container.attr('id', 'frame_container_'+id);
	container.append(create_frame_form(id));
	container.append(create_debug_div(id));
	frame = create_frame(id);
	container.append(frame);
	return container;
}

function create_debug_div(id){
	var div = $(document.createElement('div'));
	div.attr('id', 'debug_div_'+id);
	return div;
}

function create_frame_form(id){
	var form = $(document.createElement('div'));
	var url_input = $('<input id="url_'+id+'" type="text" name="search" value="">');
	var load_button = $('<input type="button" name="submit" value="submit" id="search_button" onclick="loadPage('+id+')">');
	var remove_button = $('<input type="button" name="remove" value="remove frame" onclick="remove_frame('+id+')">');
	form.addClass("form");
	form.append(url_input);
	form.append(load_button);
	form.append(remove_button);
	return form
}

function create_frame(id){
	var frame = $('<iframe id="frame_'+id+'"/>');
	return frame;
}

function load_script(frame_id){
	var frame = document.getElementById("frame_"+frame_id)
	var frameDocument = frame.contentDocument;
	script = frameDocument.createElement('script');
	script.type = 'text/javascript';
	script.src = 'http://localhost/prototypes/child.js';
	frameDocument.body.appendChild(script);
	console.log(frameDocument);
}

// ON LOAD (debugging)
$(function(){
	add_frame(1);
	load_url_in_frame("www.infogroep.be", "1");
	//setTimeout(function(){load_script("1")}, 1000);
	}
)
