function loadPage(id){
	url = $(".form input#url_"+id).val();
	loadUrlInFrame(url, id);
}

function loadUrlInFrame(url, id){
	var frame = $("#frame_"+id)
	frame.attr("src", "http://"+url);
	frame[0].onload = function(){loadScript(id);};
	//loadScript(id);
}

function removeFrame(id){
	$("#frame_container_"+id).remove();
}

function getNextFrameIdContainer(){
	return $("#next_frame_id");
}

function getNextFrameId(){
	return getNextFrameIdContainer().val();
}

function incrNextFrameId(){
	var previousVal = getNextFrameId();
	var nextVal = (parseInt(previousVal)+1).toString();
	getNextFrameIdContainer().val(nextVal);
	return nextVal;
}

function addFrame(){
	var id = incrNextFrameId();
	var content = $("#content");
	content.append(buildFrame(id));
}

function buildFrame(id){
	var container = $(document.createElement('div'));
	container.addClass("frame_container");
	container.attr('id', 'frame_container_'+id);
	container.append(createFrameForm(id));
	container.append(createDebugDiv(id));
	frame = createFrame(id);
	container.append(frame);
	return container;
}

function createDebugDiv(id){
	var div = $(document.createElement('div'));
	div.attr('id', 'debug_div_'+id);
	return div;
}

function createFrameForm(id){
	var form = $(document.createElement('div'));
	var urlInput = $('<input id="url_'+id+'" type="text" name="search" value="">');
	var loadButton = $('<input type="button" name="submit" value="submit" id="search_button" onclick="loadPage('+id+')">');
	var removeButton = $('<input type="button" name="remove" value="remove frame" onclick="remove_frame('+id+')">');
	form.addClass("form");
	form.append(urlInput);
	form.append(loadButton);
	form.append(removeButton);
	return form
}

function createFrame(id){
	var frame = $('<iframe id="frame_'+id+'"/>');
	return frame;
}

function loadScript(frameId){
	var frame = document.getElementById("frame_"+frameId)
	var frameDocument = frame.contentDocument;
	script = frameDocument.createElement('script');
	script.type = 'text/javascript';
	script.src = 'http://localhost/prototypes/child.js';
	frameDocument.body.appendChild(script);
	console.log(frameDocument);
}

function getUrlFromFrame(frameId){
	var frame = $("#frame_"+frameId)[0];
	var doc = frame.contentDocument;
	return doc.location.href;
}

// ON LOAD (debugging)
$(function(){
	addFrame(1);
	loadUrlInFrame("www.infogroep.be", "1");
	}
)
