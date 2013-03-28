function wrapperGenerator(){
	var wrapper = document.createElement("span");
	wrapper.className = "selected"
	return wrapper;
}
function insertAfter(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function wrapSelection(selection){
	wrapFrontOfSelection(selection);
	wrapBackOfSelection(selection);
	selection.removeAllRanges();
}

function wrapFrontOfSelection(selection){
	var wrapper = wrapperGenerator();
	var anchor = selection.anchorNode;
	var content = anchor.nodeValue;
	if (content == null) {
		return null;
	}
	
	//split content by selection, and wrap sepperatly in textNodes
	var unselectedContent = document.createTextNode(content.substring(0, selection.anchorOffset));
	var selectedContent = document.createTextNode(content.substring(selection.anchorOffset));
	//wrap selected part in wrapper
	wrapper.appendChild(selectedContent);
	
	//replace original anchor with new wrapped content
	insertAfter(unselectedContent, anchor);
	insertAfter(wrapper, unselectedContent);
	anchor.remove();
}

function wrapBackOfSelection(selection){
	var wrapper = wrapperGenerator();
	var focus = selection.focusNode;
	var content = focus.nodeValue;
	if (content == null) {
		return null;
	}

	//split content by selection, and wrap in textNodes
	var selectedContent = document.createTextNode(content.substring(0, selection.focusOffset));
	var unselectedContent = document.createTextNode(content.substring(selection.focusOffset));
	//wrap selected part in wrapper
	wrapper.appendChild(selectedContent);

	//replace original anchor with new wrapped content
	insertAfter(wrapper, focus);
	insertAfter(unselectedContent, wrapper);
	focus.remove();
}
