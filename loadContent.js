var styleLocation = "http://localhost/prototypes/style.css";
var jqueryLocation = "http://localhost/prototypes/jquery.js";

function loadUrlInFrame(url, frameId){
	var frame = getFrame(frameId);
	frame.src = "http://"+url;
	addOnloadEvent(onFrameLoadFunction(frameId), frameId);
}
function onFrameLoadFunction(frameId){
	return function(){
		addStyleToFrame(frameId, styleLocation);
		addScriptToFrame(frameId, jqueryLocation);
		db.selectRanges(getUrlFromFrame(frameId), function(row){
			renderRange(row, frameId);
		});
	};
}

function renderRange(range, frameId){
	if (range['range'] === ""){
		return null;
	}
	var frame = getFrame(frameId);
	var ran = deserializeIFrameRange(range["range"], frameId);
	wrapRange(ran, "iJSpluginLinkStyle range_"+range['id']);
	$(".range_"+range['id']).click(function(){
		
	})
}
