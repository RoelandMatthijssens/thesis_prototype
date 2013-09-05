var styleLocation = "http://localhost/prototypes/assets/css/style.css";
var jqueryLocation = "http://localhost/prototypes/assets/js/jquery/jquery.js";
var visualisations = {};

function loadUrlInFrame(url, frameId){
	var frame = getFrame(frameId);
	var input = $(".form input#url_"+frameId).val(url);
	frame.src = "http://"+url;
	clearOnload(frameId);
	addOnloadEvent(onFrameLoadFunction(frameId), frameId);
}

function reloadVis (frameId, vis) {
	removeOldVis(frameId);
	visualisations[frameId] = vis;
	var v;
	if(vis==="force"){
		v=forceSearch;
	} else {
		v=ribbons;
	}
	new v(frameId);
}

function removeOldVis (frameId) {
	$("#vis_"+frameId).children().remove();
}

function onFrameLoadFunction(frameId){
	//onload event for frames will persists even when src or location is changed
	//onload function will be reexecuted on location change
	return function(){
		var frame = getFrame(frameId);
		addStyleToFrame(frameId, styleLocation);
		addScriptToFrame(frameId, jqueryLocation);
		var vis = visualisations[frameId];
		if(!vis){vis = "force"};
		reloadVis(frameId, vis);
//		myDb.selectSources(getUrlFromFrame(frameId), function(source){
//			var id = source.id;
//			myDb.selectDestinations(id, function(resultSet){
//				renderRange(source, groupDestinations(resultSet.rows), frameId);
//			});
//		});
//		frame.contentDocument.mouseX=0;
//		frame.contentDocument.mouseY=0;
//		$(frame.contentDocument).mousemove( function(e) {
//			frame.contentDocument.mouseX = e.pageX;
//			frame.contentDocument.mouseY = e.pageY;
//		});
	};
}

function groupDestinations(rows){
	var result = [];
	for(var i=0;i<rows.length;i++){
		result.push(rows.item(i).pageUrl);
	}
	return result;
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
	var parsedLink = parseUrl(link);
	var ll = parsedLink.pathname;
	var l = frame.contentDocument.createTextNode(ll);
	div.appendChild(l);
	$(div).click(function(){
		removeOverlay(frame);
		frame.contentWindow.location = link;
	})
}

function renderRange(range, destinations, frameId){
	if (range.range === ""){
		return null;
	}
	var frame = getFrame(frameId);
	var ran = deserializeIFrameRange(range.range, frameId);
	wrapRange(ran, "iJSpluginLinkStyle range_"+range['id']);
	$(frame).contents().find(".range_"+range['id']).click(function(){
		var container = createClickContainer(frame);
		for(var i = 0;i < destinations.length; i++){
			addLinkToContainer(destinations[i], container, frame);
		}
	});
}
