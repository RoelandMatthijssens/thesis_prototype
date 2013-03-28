function selectionToRange(selection){
	return selection.getRangeAt(0);
}

function selectionToString(selection){
	return rangy.serializeSelection(selection);
}

function rangeToString(range){
	return rangy.serializeRange(range);
}

function wrapRange(range, className){
	cssApplier = rangy.createCssClassApplier(className);
	cssApplier.applyToRange(range);
}

function addHandler(className, eventString, handler){
	$("."+className).on(eventString, handler);
}

function deserializeIFrameRange(selectionString, iframeId){
	frame = getFrame(iframeId);
	var result = rangy.deserializeRange(selectionString, frame.contentDocument);
	return result;
}

function serializeIFrameSelection(selection, iframeId){
	frame = getFrame(iframeId);
	var result = rangy.serializeSelection(selection, false, frame.contentDocument);
	return result;
}
