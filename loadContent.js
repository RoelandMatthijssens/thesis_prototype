var styleLocation = "http://localhost/prototypes/style.css";

function loadUrlInFrame(url, frameId){
	var frame = getFrame(frameId);
	frame.src = "http://"+url;
	frame.onload = onFrameLoadFunction(frameId);
}
function onFrameLoadFunction(frameId){
	return function(){
		addStyleToFrame(frameId, styleLocation);
		var renderFunction = generateRenderFunction(frameId);
		db.selectRanges(getUrlFromFrame(frameId), renderFunction);
	};
}

function renderRange(rangeString, frameId){
	var frame = getFrame(frameId);
	var range = deserializeIFrameRange(rangeString, frameId);
	wrapRange(range, "testest");
}

function generateRenderFunction(frameId){
	return function(row){
		console.log("renderRange('"+row['range']+"', "+frameId+")");
		renderRange(row['range'], frameId);
	}
}
