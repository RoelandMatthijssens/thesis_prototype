var w = 1000,
		h = 1000,
		fill = d3.scale.category20();
var vis;
window.onload = function(){
	var vis1 = d3.select("#chart")
		.append("svg:svg")
			//.attr("width", w)
			//.attr("height", h)
			.attr("pointer-events", "all")
		.append('svg:g')
			.call(d3.behavior.zoom().on("zoom", redraw))
		.append('svg:g');
	vis = vis1;
	
	vis.append('svg:rect')
			//.attr('width', w)
			//.attr('height', h)
			.attr('fill', 'white');
	draw(data);
}
function redraw() {
	//console.log("here", d3.event.translate, d3.event.scale);
	//vis.attr("transform",
	//		"translate(" + d3.event.translate + ")"
	//		+ " scale(" + d3.event.scale + ")");
	d3.select("#chart").selectAll("circle.node")
		.data(data.nodes)
		.enter().append("svg:circle", function(d){return d.group})
			.attr("class", "node")
			//.attr("cx", function(d) { return d.x; })
			//.attr("cy", function(d) { return d.y; })
			.attr("r", 5)
			.style("fill", function(d) { return fill(d.group); })
			.on("mousedown", animateLarge)
			//.call(force.drag)
			;
}

var draw = function(json) {
	var force = d3.layout.force()
			.charge(-200)
			.linkDistance(10)
			.nodes(json.nodes)
			.links(json.links)
			.size([w, h])
			.start()
			;

	var link = vis.selectAll("line.link")
			.data(json.links)
		.enter().append("svg:line")
			.attr("class", "link")
			.style("stroke-width", function(d) { return Math.sqrt(d.value); })
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; })
			;

	var node = vis.selectAll("circle.node")
		.data(json.nodes, function(d){return d.name})
		.enter().append("svg:circle", function(d){return d.group})
			.attr("class", "node")
			//.attr("cx", function(d) { return d.x; })
			//.attr("cy", function(d) { return d.y; })
			.attr("r", 5)
			.style("fill", function(d) { return fill(d.group); })
			.on("mousedown", animateLarge)
			//.call(force.drag)
			;

	node.append("svg:title")
			.text(function(d) { return d.name; });

	vis.style("opacity", 1e-6)
		.transition()
			.duration(1000)
			.style("opacity", 1);

	force.on("tick", function() {
		link.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

		node.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
	});
};

function animateLarge(){
	d3.select(this)
		.transition()
			.duration(1000)
			.attr("r", 50);
}
