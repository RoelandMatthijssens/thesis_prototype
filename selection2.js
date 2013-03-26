function makeXPath (node, currentPath) {
	/* this should suffice in HTML documents for selectable nodes, XML with namespaces needs more code */
	currentPath = currentPath || '';
	switch (node.nodeType) {
		case 3:
		case 4:
			return makeXPath(node.parentNode, 'text()[' + (document.evaluate('preceding-sibling::text()', node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength + 1) + ']');
		case 1:
			return makeXPath(node.parentNode, node.nodeName + '[' + (document.evaluate('preceding-sibling::' + node.nodeName, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength + 1) + ']' + (currentPath ? '/' + currentPath : ''));
		case 9:
			return '/' + currentPath;
		default:
			return '';
	}
}

function getRange() {
	if (typeof window.getSelection != 'undefined') {
		var selection = window.getSelection();
		var range = selection.getRangeAt(0);
		if (range != null) {
			return rangeToString(range);
		}
	}
}

function restoreSelection (selectionDetails) {
	if (selectionDetails != null) {
		if (typeof window.getSelection != 'undefined') {
			var selection = window.getSelection();
			selection.removeAllRanges();
			var range = stringToRange(selectionDetails);
			selection.addRange(range);
		}
	}
}

function callOnFrame(id, functionString, params){
	var frame = $("#frame_"+id)[0];
	var fun = frame.contentWindow[functionString]
	alert(fun);
	alert(params);
	fun.apply(params);
}

function highlightRangeOnFrame(id, rangeString){
	frame = $("#frame_"+id)[0];
	frame.contentWindow.highlightRange("yellow", frame.contentWindow.stringToRange(rangeString));
}

//==============debugging=========


function renderAllSelections(){
	var amount = getNextFrameId();
	for(var i=1;i<=amount;i++){
		var selection = getSelectionFromFrame(i);
		var range = selectionToRange(selection);
		var string = rangeToString(range);
		alert(string);
		var debugDiv = $("#debug_div_"+i);
		debugDiv.append(string);
	}
}
