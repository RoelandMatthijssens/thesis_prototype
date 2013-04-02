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

function getIdOfLinkFrames(){
	var result = [];
	var checkmarks = $(".use_in_link_flag");
	checkmarks.each(function(){
		if ($(this).attr("checked")){
			result.push($(this).val());
		}
	});
	return result;
}

function getAllLinkSelections(){
	var result = [];
	var participatingFrames = getIdOfLinkFrames();
	if (participatingFrames.length == 0){
		console.log("No frames selected for linking");
	}
	participatingFrames = $(participatingFrames);
	participatingFrames.each(function(){
		var frameId = this;
		var frame = getFrame(frameId);
		var selection = rangy.getIframeSelection(frame);
		var selectionString = serializeIFrameSelection(selection, frameId);
		if (selectionString == ""){return true};
		result.push([frameId, selectionString]);
	});
	return result;
}

function createFrameForm(id){
	var form = $(document.createElement('div'));
	var urlInput = $('<input id="url_'+id+'" type="text" name="search" value="">');
	var loadButton = $('<input type="button" name="submit" value="submit" id="search_button" onclick="requestPage('+id+')">');
	var removeButton = $('<input type="button" name="remove" value="remove frame" onclick="remove_frame('+id+')">');
	var linkFlag = $('<input type="checkbox" name="link" value="'+id+'" class="use_in_link_flag">Use in link')
	form.addClass("form");
	form.append(urlInput);
	form.append(loadButton);
	form.append(removeButton);
	form.append(linkFlag);
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

function addOnloadEvent(func, frameId) {
	var w = getFrame(frameId);
	var oldonload = w.onload;
	if (typeof w.onload != 'function') {
		w.onload = func;
	} else {
		w.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

function getUrlFromFrame(frameId){
	var frame = getFrame(frameId);
	var doc = frame.contentDocument;
	return doc.location.href;
}

function saveSelection(frameId){
	var frame = getFrame(frameId);
	var selection = rangy.getIframeSelection(frame);
	var selectionString = serializeIFrameSelection(selection, frameId);
	var url = getUrlFromFrame(frameId);
	db.saveRange(url, selectionString);
	return selectionString;
}
