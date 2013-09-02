function ribbons(frameId){
	this.width = 700;
	this.height = 500;
	this.innerRadius = Math.min(this.width, this.height)*0.41;
	this.outerRadius = this.innerRadius*1.1;
	var me = this;

	this.gatherData = function(){
		var url = getUrlFromFrame(frameId);
		var type = getContentType(url);
		var matrix = null;
		addResource(url, type, function(resourceId){
			var resourceList = [];
			async.series([
				function(callback){getConnectedResources(resourceId, function(rlist){
					resourceList = rlist;
					resourceList.push(resourceId);
					callback();
				});},
				function(callback){
					console.log(resourceList);
					matrix = new Array(resourceList.length);
					for (var i = 0; i < matrix.length; i++) {
						matrix[i]=new Array(resourceList.length);
					};
					for (var i = 0; i < matrix.length; i++) {!function(i){
						for (var j = 0; j < matrix[i].length; j++) {!function(j){
							getAmountOfHyperlinksBetweenResources(resourceList[i], resourceList[j], function(amount){
								matrix[i][j]=amount;
								console.log(i, j, matrix[i][j], resourceList.length);
								if(i===resourceList.length-1 && j === resourceList.length-1){callback()};
							});}(j);
						}}(i);
					};
				},
				function(callback){
					console.log(matrix);
					me.draw(matrix);
					callback();
				}
			]);
		});
//		return [
//			[11975,  5871, 8916, 2868],
//			[ 1951, 10048, 2060, 6171],
//			[ 8010, 16145, 8090, 8045],
//			[ 1013,		990,	940, 6907]
//		];
	}

	this.draw = function(data){

		this.chord = d3.layout.chord()
				.padding(.05)
				.sortSubgroups(d3.descending)
				.matrix(data);
		
		this.fill = d3.scale.ordinal()
				.domain(d3.range(4))
				.range(["#000000", "#FFDD89", "#957244", "#F26223"]);
		
		this.vis = d3.select("#vis_"+frameId)
			.append("svg")
				.attr("width", this.width)
				.attr("height", this.height)
			.append("g")
				.attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
		
		this.vis.append("g").selectAll("path")
				.data(this.chord.groups)
			.enter().append("path")
				.style("fill", function(d) { return me.fill(d.index); })
				.style("stroke", function(d) { return me.fill(d.index); })
				.attr("d", d3.svg.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius))
				.on("mouseover", fade(.1))
				.on("mouseout", fade(1));
		
		this.ticks = this.vis.append("g").selectAll("g")
				.data(this.chord.groups)
			.enter().append("g").selectAll("g")
				.data(groupTicks)
			.enter().append("g")
				.attr("transform", function(d) {
					return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
							+ "translate(" + me.outerRadius + ",0)";
				});
		
		this.ticks.append("line")
				.attr("x1", 1)
				.attr("y1", 0)
				.attr("x2", 5)
				.attr("y2", 0)
				.style("stroke", "#000");
		
		this.ticks.append("text")
				.attr("x", 8)
				.attr("dy", ".35em")
				.attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
				.style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
				.text(function(d) { return d.label; });
		
		this.vis.append("g")
				.attr("class", "chord")
			.selectAll("path")
				.data(this.chord.chords)
			.enter().append("path")
				.attr("d", d3.svg.chord().radius(this.innerRadius))
				.style("fill", function(d) { return me.fill(d.target.index); })
				.style("opacity", 1);
		
		// Returns an array of tick angles and labels, given a group.
		function groupTicks(d) {
			var k = (d.endAngle - d.startAngle) / d.value;
			return d3.range(0, d.value, 1000).map(function(v, i) {
				return {
					angle: v * k + d.startAngle,
					label: i % 5 ? null : v / 1000 + "k"
				};
			});
		}
		
		// Returns an event handler for fading a given chord group.
		function fade(opacity) {
			return function(g, i) {
				me.vis.selectAll(".chord path")
						.filter(function(d) { return d.source.index != i && d.target.index != i; })
					.transition()
						.style("opacity", opacity);
			};
		}
	}
	me.gatherData();
}
