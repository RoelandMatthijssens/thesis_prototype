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
			return range_to_string(range);
		}
	}
}

function restoreSelection (selectionDetails) {
	if (selectionDetails != null) {
		if (typeof window.getSelection != 'undefined') {
			var selection = window.getSelection();
			selection.removeAllRanges();
			var range = string_to_range(selectionDetails);
			selection.addRange(range);
		}
	}
}

function callOnFrame(id, fun){
	var frame = $("#frame_"+id)[0];
	frame.contentWindow.

}

//==============debugging=========


function renderAllSelections(){
	var amount = get_next_frame_id();
	for(var i=1;i<=amount;i++){
		var selection = getSelectionFromFrame(i);
		var range = selectionToRange(selection);
		var string = range_to_string(range);
		alert(string);
		var debugDiv = $("#debug_div_"+i);
		debugDiv.append(string);
	}
}
