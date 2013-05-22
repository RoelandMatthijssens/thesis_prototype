var data = [35,94,21,67,10, 123,15,15,8,3,1];


window.onload=function(){
	var circles = d3.select("svg").selectAll("circle").data(data);
	
	var enter = circles.enter()
		.append("circle")
			.attr("cx", function(d){return Math.random(d) * 100})
			.attr("cy", function(d){return Math.random(d) * 100})
			.attr("r",0);
	
	var exit = circles.exit().remove();

	enter.transition()
		.duration(750)
		.attr("r", Math.sqrt);
	
	exit.transition()
		.duration(750)
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r", 0);
}
