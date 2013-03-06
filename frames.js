function loadPage(id){
	url = $(".form input#url_"+id).val();
	load_url_in_frame(url, id);
}

function load_url_in_frame(url, id){
	$("#frame_"+id).attr("src", "http://"+url);
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
	container.append(create_frame(id));
	return container;
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
	frame = $('<iframe class="frame" id="frame_'+id+'"></iframe>');
	return frame;
}

// ON LOAD (debugging)
$(function(){
	add_frame(1);
	add_frame(2);
	load_url_in_frame("www.infogroep.be", "1");
	load_url_in_frame("lanparty.infogroep.be", "2");
	}
)
