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

function range_to_string(range){
	return makeXPath(range.startContainer) + '|' + range.startOffset + '|' + makeXPath(range.endContainer) + '|' + range.endOffset;
}

function string_to_range(string){
	string = string.split(/\|/g);
	var range = document.createRange();
	range.setStart(document.evaluate(string[0], document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue, Number(string[1]));
	range.setEnd(document.evaluate(string[2], document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue, Number(string[3]));
	return range
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
function highlight_range(colour, range) {
	sel = window.getSelection();
	document.designMode = "on";
	if (range) {
		sel.removeAllRanges();
		sel.addRange(range);
	}
	// Use HiliteColor since some browsers apply BackColor to the whole block
	if (!document.execCommand("HiliteColor", false, colour)) {
		document.execCommand("BackColor", false, colour);
	}
	document.designMode = "off";
}
