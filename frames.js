function requestPage(id){
	url = getUrlFromInput(id);
	loadUrlInFrame(url, id);
}

function getUrlFromInput(id){
	var url = $(".form input#url_"+id).val();
	return url;
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

function getFrame(id){
	var frame = $("#frame_"+id)[0];
	return frame;
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
	var loadButton = $('<input type="button" name="submit" value="submit" id="search_button" onclick="requestPage('+id+')">');
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

function addScriptToFrame(frameId, scriptSrc){
	var frame = getFrame(frameId);
	var script = frame.contentDocument.createElement('script');
	script.type = 'text/javascript';
	script.src = scriptSrc;
	frame.contentDocument.body.appendChild(script);
}

function addStyleToFrame(frameId, styleSrc){
	var frame = getFrame(frameId);
	var style = frame.contentDocument.createElement("link");
	style.href = styleSrc;
	style.rel = "stylesheet";
	style.type = "text/css";
	frame.contentDocument.body.appendChild(style);
}

function callScriptFromFrame(id, functionString){
	var frame = getFrame(id);
	return frame.contentWindow.eval(functionString);
}

function getUrlFromFrame(frameId){
	var frame = $("#frame_"+frameId)[0];
	var doc = frame.contentDocument;
	return doc.location.href;
}
