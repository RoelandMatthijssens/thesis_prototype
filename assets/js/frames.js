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
	var visualisationContainer = buildVisualisation(id);
	container.append(frame);
	container.append(visualisationContainer);
	return container;
}

function buildVisualisation (id) {
	var container = $(document.createElement("div"));
	container.addClass("visualisationContainer");
	container.attr("id", "visualisation_"+id);
	var controls = buildVisualisationControls(id);
	var vis = $(document.createElement("div"));
	vis.attr("id", "vis_"+id);
	container.append(controls);
	container.append(vis);
	return container;
}

function buildVisualisationControls (id) {
	var container = $(document.createElement("div"));
	container.addClass("controlContainer");
	container.attr("id", "contols_"+id);
	var changeLayout = buildButton("Ribbon layout", function(){
		if(visualisations[id] === "force"){
			reloadVis(id, "ribbons");
			$(this).attr('value', 'Force layout');
		} else if(visualisations[id]==="ribbons"){
			reloadVis(id, "force");
			$(this).attr('value', 'Ribbon layout');
		}
	});
	changeLayout.addClass("controlButton");
	changeLayout.attr("id", "layouts_"+id);
	var filter = $(document.createElement("div"));
	filter.addClass("controlButton");
	filter.attr("id", "filter_"+id);
	var search = $(document.createElement("div"));
	search.addClass("control");
	search.attr("id", "search_"+id);
	container.append(changeLayout)
	container.append(filter);
	container.append(search);
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
		var frameId = this.valueOf();
		var frame = getFrame(frameId);
		var selection = rangy.getIframeSelection(frame);
		var selectionString = serializeIFrameSelection(selection, frameId);
		var frameUrl = getUrlFromFrame(frameId);
		if (selectionString == ""){return true};
		var data = {
			frameId : frameId,
			selection : selectionString,
			url : frameUrl
		};
		result.push(data);
	});
	return result;
}

function createFrameForm(id){
	var form = $(document.createElement('div'));
	var urlInput = $('<input id="url_'+id+'" type="text" name="search" value="">');
	var loadButton = $('<input type="button" name="submit" value="submit" id="search_button" onclick="requestPage('+id+')">');
	var removeButton = $('<input type="button" name="remove" value="remove frame" onclick="removeFrame('+id+')">');
	var addSourceButton = buildButton("Add Source", function(){
		addSourceToList(id);
		clearSelection(id);
	})
	var addDestButton = buildButton("Add Destination", function(){
		addDestinationToList(id);
		clearSelection(id);
	})
	form.addClass("form");
	form.append(urlInput);
	form.append(loadButton);
	form.append(removeButton);
	form.append(addSourceButton);
	form.append(addDestButton);
	//form.append(linkFlag);
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

function clearOnload (frameId) {
	var frame = getFrame(frameId);
	frame.onload = null;
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

function getRangeFromFrame(frameId){
	var frame = getFrame(frameId);
	var selection = rangy.getIframeSelection(frame);
	var selectionString = serializeIFrameSelection(selection, frameId);
	return selectionString;
}

function saveSelection(frameId){
	var frame = getFrame(frameId);
	var selection = rangy.getIframeSelection(frame);
	var selectionString = serializeIFrameSelection(selection, frameId);
	var url = getUrlFromFrame(frameId);
	db.saveRange(url, selectionString);
	return selectionString;
}

function saveUniDirectionalLink(){
	var linkData = getAllLinkSelections();
	if (linkData.length < 2){
		console.log("Select at least two ranges before creating a link");
		return false;
	}
	if (linkData.length > 2) {
		console.log("More than 2 links windows were selected. Asuming Single-Source-Multiple-Destinations link");
	}
	var source = linkData[0];
	var destinations = linkData.slice(1);
	var frame = getFrame(source.frameId);
	frame.src = frame.src;
	db.saveUniDirectionalLink(source, destinations);
	console.log("link saved")
	return true;
}

function getElementPosition(frameId, elementId){
	var frame = getFrame(frameId);
	var frameWindow = frame.contentWindow;
	var relativePos = getRelativeElementPosition(frameWindow, elementId);
	var rx = relativePos[0];
	var ry = relativePos[1];

	var fTop = $(frame).offset().top;
	var fLeft = $(frame).offset().left;
	var frameY = fTop - $(window).scrollTop();
	var frameX = fLeft - $(window).scrollLeft();

	var x = frameX + Math.max(0, rx);
	var y = frameY + Math.max(0, ry);

	return [x, y];
}

function getRelativeElementPosition(wrapper, elementId){
	var element = wrapper.document.getElementById(elementId);
	var eTop = $(element).offset().top;
	var eLeft = $(element).offset().left;
	var t = eTop-$(wrapper).scrollTop();
	var l = eLeft-$(wrapper).scrollLeft();
	var pos = [l, t];
	console.log(element);
	return pos;
}


function getContentType(url)
{
	var http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	return http.getResponseHeader("content-type");
}
