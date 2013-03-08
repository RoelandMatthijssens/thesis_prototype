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

function selectionToRange(selection){
	var range = selection.getRangeAt(0);
	if (range != null){
		return range;
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

function getSelectionFromFrame(id){
	var frame = document.getElementById('frame_'+id)
	var content = frame.contentWindow
	var selection = content.getSelection();
	return selection;
}
