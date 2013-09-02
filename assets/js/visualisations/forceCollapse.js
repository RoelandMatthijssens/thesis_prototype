function forceCollapse(frameId){
	this.w = 700;
	this.h = 500;
	this.fill = d3.scale.category20();
	var me = this;
	
	this.vis = d3.select("#vis_"+frameId)
		.append("svg:svg")
			.attr("width", this.w)
			.attr("height", this.h)
			.attr("pointer-events", "all")
		.append('svg:g')
			.call(d3.behavior.zoom().on("zoom", redraw))
			.attr("test", "1")
		.append('svg:g')
			.attr("test", "2");
	
	this.vis.append('svg:rect')
		.attr('width', this.w)
		.attr('height', this.h)
		.attr('fill', 'white');

	function redraw() {
		me.vis.attr("transform",
			"translate(" + d3.event.translate + ")"
			+ " scale(" + d3.event.scale + ")");
	}

	this.draw =function draw(json) {
		var me = this;
		var force = d3.layout.force()
			.charge(-10)
			.linkDistance(10)
			.nodes(json.nodes)
			.links(json.links)
			.size([this.w, this.h])
			.start();
	
		var link = this.vis.selectAll("line.link")
			.data(json.links)
		.enter().append("svg:line")
			.attr("class", "link")
			.style("stroke-width", function(d) { return Math.sqrt(d.value); })
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });
	
		var node = this.vis.selectAll("circle.node")
			.data(json.nodes)
		.enter().append("svg:circle")
			.attr("class", "node")
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.attr("r",  function(d) { return Math.max(d.size*2, 0); })
			.style("fill", function(d) { return me.fill(d.group); })
			.call(force.drag);
	
		node.append("svg:title")
			.text(function(d) { return d.name; });
	
		this.vis.style("opacity", 1e-6)
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

	this.gatherData = function(){
		var url = getUrlFromFrame(frameId);
		var type = getContentType(url);
		addResource(url, type, function(resourceId){
			getLinkedResources(resourceId, function(data){
				var result = {"nodes":[], "links":[]};
				var nextTypeIndex = 1;
				var types = {};
				for(var key in data){
					var d = data[key];
					var amount = d.amount;
					var type = d.type
					types[type] = types[type] ? types[type] : nextTypeIndex++;
					result.nodes.push({"name":key, "group":types[type], "size":amount});
				};
				me.draw(result);
			});
		});
	}
	this.gatherData();
}

var data = {
	"nodes":[
		{	"name":"name",
			"group":1,
			"size":12
		},
		{	"name":"test",
			"group":1,
			"size":2
		}
	],
	"links":[
//		{	"source":0,
//			"target":1,
//			"value":1
//		}
	]
}
