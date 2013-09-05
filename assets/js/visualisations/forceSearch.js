function forceSearch(frameId){
	var me = this;
	var filter = "normal";

	var w = 700;
	var h = 500;

	var nodesG = null;
	var node = null;
	var allData = [];
	var currentNodes = [];

	var force = d3.layout.force();
	var fill = d3.scale.category20();

	function visualisation(selection, data){
		allData = setupData(data);
		var vis = d3.select(selection)
			.append("svg:svg")
				.attr("width", w)
				.attr("height", h)
				.attr("pointer-events", "all")
			.append('svg:g')
				.call(d3.behavior.zoom().on("zoom", redraw))
			.append('svg:g');
		vis.append('svg:rect')
				.attr('width', w)
				.attr('height', h)
				.attr('fill', 'white')

		nodesG = vis.append("g").attr("id", "nodes");

		force.size([w, h]);
		force.friction(0.5);
		force.on("tick", forceTick)
			.charge(-10)
			.linkDistance(15);

		function redraw() {
			vis.attr("transform",
				"translate(" + d3.event.translate + ")"
				+ " scale(" + d3.event.scale + ")");
		}
		update();
	}

	function update(){
		currentNodes = filterNodes(allData.nodes);
		force.nodes(currentNodes);
		updateNodes();
		force.start();
	}

	visualisation.updateData = function(newData){
		allData = setupData(newData);
		node.remove();
		update();
	}

	function filterNodes (allNodes) {
		var filteredNodes = allNodes;
		return allNodes;
	}

	function setupData (data) {
		var nodes = data.nodes;
		for (var i = 0; i < nodes.length; i++) {
			var n = nodes[i];
			n.x = 250;
			n.y = 250;
			n.radius = n.size;
		};
		return data;
	}

	function mapNodes (nodes) {
		var nodeMap = d3.map();
		for (var i = 0; i < nodes.length; i++) {
			var n = nodes[i];
			nodeMap.set(n.id, n);
		};
		return nodeMap;
	}

	function updateNodes () {
		console.log(currentNodes);
		node = nodesG.selectAll("circle.node")
			.data(currentNodes);
		node.enter().append("circle")
			.attr("class", "node")
			.attr("id", function(d) { return d.id;})
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.attr("r",  function(d) { return Math.max(d.size*2, 0); })
			.style("fill", function(d) { return fill(d.group); });
			//mouseinteraction TODO
		node.exit().remove();
		console.log(node.data());
	}

	function forceTick (event) {
		node
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
	}

	function gatherData () {
		var url = getUrlFromFrame(frameId);
		var type = getContentType(url);
		addResource(url, type, function(resourceId){
			getLinkedResources(resourceId, function(data){
				var result = {"nodes":[], "links":[]};
				var nextTypeIndex = 1;
				var types = {};
				for(var key in data){
					var d = data[key];
					console.log(d);
					var amount = d.amount;
					var type = d.type
					types[type] = types[type] ? types[type] : nextTypeIndex++;
					result.nodes.push({"name":key, "group":types[type], "size":amount});
				};
				visualisation("#vis_"+frameId, result);
			});
		});
	}

	gatherData();
	return visualisation;
}