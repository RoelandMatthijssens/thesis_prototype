var styleLocation = "http://localhost/prototypes/style.css";
var jqueryLocation = "http://localhost/prototypes/jquery.js";

function loadUrlInFrame(url, frameId){
	var frame = getFrame(frameId);
	frame.src = "http://"+url;
	addOnloadEvent(onFrameLoadFunction(frameId), frameId);
}
function onFrameLoadFunction(frameId){
	//onload event for frames will persists even when src or location is changed
	//onload function will be reexecuted on location change
	return function(){
		var frame = getFrame(frameId);
		addStyleToFrame(frameId, styleLocation);
		addScriptToFrame(frameId, jqueryLocation);
		db.selectRanges(getUrlFromFrame(frameId), function(source){
			var id = source.id;
			db.selectDestinations(id, function(destination){
				renderRange(source, destination, frameId);
			});
		});
		frame.contentDocument.mouseX=0;
		frame.contentDocument.mouseY=0;
		$(frame.contentDocument).mousemove( function(e) {
			frame.contentDocument.mouseX = e.pageX;
			frame.contentDocument.mouseY = e.pageY;
		});
	};
}

function findClickContainer(frame){
	var div = frame.contentDocument.getElementById("iJSpluginClickContainer")
	return div;
}

var parseUrl = (function () {
	var a = document.createElement('a');
	return function (url) {
		a.href = url;
		return {
			host: a.host,
			hostname: a.hostname,
			pathname: a.pathname,
			port: a.port,
			protocol: a.protocol,
			search: a.search,
			hash: a.hash
		};
	}
})();

function createOverlay(frame){
	var div = frame.contentDocument.createElement('div');
	div.id = "iJSpluginOverlay";
	$(div).click(function(){
		removeOverlay(frame);
	});
	frame.contentDocument.body.appendChild(div);
}

function createClickContainer(frame){
	var div = findClickContainer(frame);
	if(div){
		return div
	}
	console.log(div);
	div = frame.contentDocument.createElement('div');
	div.id = "iJSpluginClickContainer"
	div.style.top = frame.contentDocument.mouseY+"px";
	div.style.left = frame.contentDocument.mouseX+"px";
	frame.contentDocument.body.appendChild(div);
	createOverlay(frame);
	return div;
}

function removeOverlay(frame){
	var overlay = frame.contentDocument.getElementById("iJSpluginOverlay");
	var container = frame.contentDocument.getElementById("iJSpluginClickContainer");
	if(overlay){$(overlay).remove();}
	if(container){$(container).remove();}
}

function addLinkToContainer(link, container, frame){
	var div = frame.contentDocument.createElement('div');
	container.appendChild(div);
	var ll = parseUrl(link).host
	var l = frame.contentDocument.createTextNode(ll);
	div.appendChild(l);
	$(div).click(function(){
		removeOverlay(frame);
		frame.contentWindow.location = link;
	})
}

function renderRange(range, destination, frameId){
	if (range.range === ""){
		return null;
	}
	var frame = getFrame(frameId);
	var ran = deserializeIFrameRange(range.range, frameId);
	wrapRange(ran, "iJSpluginLinkStyle range_"+range['id']);
	$(frame).contents().find(".range_"+range['id']).click(function(){
		console.log(frame.contentDocument.mouseX, frame.contentDocument.mouseY);
		var container = createClickContainer(frame);
		addLinkToContainer(destination.pageUrl, container, frame);
	});
}
