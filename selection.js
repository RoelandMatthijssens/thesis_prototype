//var DEBUG;
//function getSelectionHtml() {
//	var html = "";
//	if (typeof window.getSelection != "undefined") {
//		var sel = window.getSelection();
//		if (sel.rangeCount) {
//			var container = document.createElement("div");
//			for (var i = 0, len = sel.rangeCount; i < len; ++i) {
//				container.appendChild(sel.getRangeAt(i).cloneContents());
//			}
//			html = container.innerHTML;
//		}
//	} else if (typeof document.selection != "undefined") {
//		if (document.selection.type == "Text") {
//			html = document.selection.createRange().htmlText;
//		}
//	}
//	DEBUG.append(html);
//	DEBUG.append("<br/>");
//	DEBUG.append("<br/>");
//}
//function getText() {
//	t = (document.all) ? document.selection.createRange().text : document.getSelection();
//	DEBUG.append(t.getSelection);
//}
//
//function mouseUp() {
//	getSelectionHtml();
//}
//
//document.onmouseup = mouseUp;
//window.onload = function(){DEBUG = $(".debug");};

function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            sel = window.getSelection();
            makeEditableAndHighlight("yellow", range);
            sel.removeAllRanges();
        } else if (document.selection && range.select) {
            range.select();
        }
    }
}

function makeEditableAndHighlight(colour, range) {
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

