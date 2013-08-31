function Graph(){
	//variables
	var width = 900;
	var height = 900;

	var allData = []

	var nodeMinSize = 3;
	var nodeMaxSize = 12;

	var force = d3.layout.force()

	var nodeGroup = null;
	var linkGroup = null;
	var node = null;
	var link = null;
	var currentNodeData = [];
	var currentLinkData = [];
	var groupCenters = null; //for radial layout

	var colorScale = d3.scale.category20();
	var tooltip = Tooltip("vis-tooltip", 300);

	//charge for radial layout
	//bigger nodes push harder
	var charge = function(node){
		return -Math.pow(node.radius, 2.0)/2
	}

	var layout;
	
	//main function
	function graph(container, data){
		//format the data
		allData = data;

		//create svg container
		var vis = d3.select(container).append("svg")
			.attr("width", width)
			.attr("height", height)
			;
		//create groups for links/nodes
		linkGroup = vis.append("g")
			.attr("id", "links");
		nodeGroup = vis.append("g")
			.attr("id", "nodes");

		allData = setupData(data);
		setupForce(force);
		setFilter("all");
		setLayout("force");

		update();
	}

	function update(){
		currentNodeData = filterNodes(allData.nodes);
		currentLinkData = filterLinks(allData.links);

		applyLayout();
	}

	function applyLayout(){
		//based on the layout, manipulate the graph
		if (layout == "force"){
			force.nodes(currentNodeData);
			updateNodes();
			force.links(currentLinkData);
			updateLinks();
			force.start();
		}
		if(layout == "radial"){
			var domainsCounts = groupNodes(currentNodeData, "domain")
			var domains = d3.entries(domainCounts).sort(function(a, b){
				return b.value - a.value;
			});
			domains = domains.map(function(v){return v.key});
			updateCenters(domains);
			force.nodes(currentNodeData);
			updateNodes();
			//remove links from the svg
			//they will be reapplied when svg is done animating 
			//and calls updateLinks
			force.links([]);
			if(link){
				link.data([]).exit().remove();
				link = null;
			}
			force.start();
		}
	}

	function setupData(data){
		//map countRange to sizeDomain
		var countRange = d3.extent(data.nodes, function(d){return d.visitedCount});
		var sizeScale = d3.scale.sqrt().range([nodeMinSize, nodeMaxSize]).domain(countRange).clamp(true);

		//give the nodes some random position/size
		data.nodes.forEach(function(node){
			node.x = 200;
			node.y = 200;
			node.radius = sizeScale(node.visitedCount);
		});
		nodesMap = mapNodes(data.nodes);

		//point the source/target of links to nodes, instead of identifiers
		data.links.forEach(function(link){
			link.source = nodesMap.get(link.source);
			link.target = nodesMap.get(link.target);
		});

		return data;
	}

	function mapNodes(nodes){
		var map = d3.map();
		nodes.forEach(function(node){
			map.set(getNodeIdentifier(node), node);
		});
		return map;
	}

	function filterNodes(nodes){
		var filteredNodes = nodes;
		if(filter == "popular"){
			var visitedCounts = nodes.map(function(node){return node.visitedCount}).sort(d3.descending);
			cutoff = d3.quantile(visitedCounts, 0.3);
			filteredNodes = nodes.filter(function(node){
				return node.visitedCount > cutoff;
			});
		}
		if(filter == "obscure"){
			var visitedCounts = nodes.map(function(node){return node.visitedCount}).sort(d3.ascending);
			cutoff = d3.quantile(visitedCounts, 0.3);
			filteredNodes = nodes.filter(function(node){
				return node.visitedCount < cutoff;
			});
		}
		if(filter == "new"){
			var timeOrder = nodes.map(function(node){return node.timeAdded}).sort(d3.descending);
			cutoff = d3.quantile(timeOrder, 0.3);
			filteredNodes = nodes.filter(function(node){
				return node.timeAdded > cutoff;
			});
		}
		if(filter == "old"){
			var timeOrder = nodes.map(function(node){return node.timeAdded}).sort(d3.ascending);
			cutoff = d3.quantile(timeOrder, 0.3);
			filteredNodes = nodes.filter(function(node){
				return node.timeAdded < cutoff;
			});
		}
		return filteredNodes;
	}

	function filterLinks(links){
		var currentNodes = mapNodes(currentNodeData);
		filteredLinks = links.filter(function(link){
			return currentNodes.get(getNodeIdentifier(link.source)) && currentNodes.get(getNodeIdentifier(link.target));
		});
		return filteredLinks;
	}

	//******************
	//*Render functions*
	//******************

	function updateNodes(){
		node = nodeGroup.selectAll("circle.node")
			.data(currentNodeData, function(d){return getNodeIdentifier(d)});
		
		node.enter().append("circle")
			.attr("class", "node")
			.attr("cx", function(d){return d.x})
			.attr("cy", function(d){return d.y})
			.attr("r" , function(d){return d.radius})
			.style("stroke", "black")
			.style("fill", function(d){return colorScale(d.domain)})
			.style("stroke-width", 1.0)
			.on("click", function(d){alert(d.selection)})
			.on("mouseover", showDetails)
			.on("mouseout", hideDetails)
			.call(force.drag)
			;
		
		node.exit().remove();
	}

	function updateLinks(){
		link = linkGroup.selectAll("line.link")
			.data(currentLinkData, function(d){return getLinkIdentifier(d)});

		link.enter().append("line")
			.attr("class", "link")
			.attr("x1", function(d){return d.source.x})
			.attr("y1", function(d){return d.source.y})
			.attr("x2", function(d){return d.target.x})
			.attr("y2", function(d){return d.target.y})
			.attr("stroke", "#aaa")
			;

		link.exit().remove();
	}

	//******************
	//*Helper functions*
	//******************

	function getNodeIdentifier(node){
		return node.selection;
	}

	function getLinkIdentifier(link){
		return getNodeIdentifier(link.source)+"_"+getNodeIdentifier(link.target);
	}

	function setupForce(force){
		force.size([width, height]);
		setLayout("force");
		setFilter("all");
	}

	function setFilter(newFilter){
		filter = newFilter;
	}
	function setSort(newSort){
		sort = newSort;
	}
	function setLayout(newLayout){
		layout = newLayout;
		if (layout == "force"){
			force.on("tick", forceTick)
				.charge(-200)
				.linkDistance(50)
				;
		}
		if (layout == "radial"){
			force.on("tick", radialTick)
			.charge(charge);
		}
	}

	function forceTick(event){
		node
			.attr("cx", function(d){return d.x})
			.attr("cy", function(d){return d.y})

		link
			.attr("x1", function(d){return d.source.x})
			.attr("y1", function(d){return d.source.y})
			.attr("x2", function(d){return d.target.x})
			.attr("y2", function(d){return d.target.y})
	}

	function radialTick(event){
		node.each(moveToRadialLayout(e.alpha));
		node
			.attr("cx", function(data){return data.x})
			.attr("cy", function(data){return data.y})

		//stop the animation if there is not enough change
		//and redraw the links
		if (e.alpha < 0.03){
			force.stop();
			updateLinks();
		}
	};

	function moveToRadialLayout(alpha){
		var k = alpha * 0.1;
		return function(data){
			var centerNode = groupCenters(data.domain);
			data.x += (centerNode.x - data.x) * k
			data.y += (centerNode.y - data.y) * k
		}
	}


	function showDetails(node, _){
		//show node data on hover
		content  = '<p class="tooltipData">'+node.domain+'</p>';
		content += '<p class="tooltipData">'+node.url+'</p>';
		content += '<hr class="tooltip-hr"/>'
		content += '<p class="tooltipData">'+node.visitedCount+'</p>';
		content += '<p class="tooltipData">Detailed, Formula</p>';
		content += '<hr class="tooltip-hr"/>'
		content += '<p class="tooltipData">'+node.timeDisplay+'</p>';
		tooltip.showTooltip(content, d3.event);

		//highlight neighbors
		//todo
	}

	function hideDetails(node, _){
		tooltip.hideTooltip();
	}

	function groupNodes(nodes, attr){
		var groups = {};
		nodes.forEach(function(node){
			if(groups[node[attr]]){
				groups[node[attr]] += 1;
			}else{
				groups[node[attr]] = 1;
			}
		});
		return groups;
	}

	function updateCenters(domains){
		if (layout == "radial"){
			//TODO; RadialPlacement
			groupCenters = RadialPlacement().center({"x":width/2, "y":height/2-100})
				.radius(300).increment(18).keys(domains);
		}
	}

	//******************
	//*Public functions*
	//******************
	
	graph.toggleLayout = function(newLayout){
		force.stop;
		setLayout(newLayout);
		update();
	}
	graph.toggleFilter = function(newFilter){
		force.stop;
		setFilter(newFilter);
		update();
	}
	graph.nodes = function(){
		return allData.nodes;
	}
	graph.groupNodes = function(nodes, attr){
		return groupNodes(nodes, attr);
	}

	return graph;
}

window.onload = function(){
	myGraph = Graph();

	d3.json("data/data.json", function(json){
		myGraph("#vis", json);
	});
}
