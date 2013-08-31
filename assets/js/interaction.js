function addDestinationToList (frameId) {
	var destination = buildObject(frameId);
	destinationList.push(destination);
}
function addSourceToList (frameId) {
	var source = buildObject(frameId);
	sourceList.push(source);
}

function clearSourceList (){
	sourceList = [];
}
function clearDestinationList (){
	destinationList = [];
}

function buildObject (frameId) {
	var resource = buildResource(frameId);
	var selector = buildSelector(frameId);
	var tags = buildTags();
	source = {"resource":resource, "selector":selector, "tags":tags};
	return source;
}

function buildResource (frameId) {
	var url = getUrlFromFrame(frameId);
	var type = getContentType(url);
	var resource = {"url":url, "type":type};
	return resource;
}

function buildSelector (frameId) {
	var xPointer = getRangeFromFrame(frameId);
	var selector = {"xPointer":xPointer};
	return selector;
}

function buildTags () {
	return [];
}
