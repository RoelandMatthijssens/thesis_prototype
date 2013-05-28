function Tooltip(id, width){
	var tooltip = null;

	function init(){
		$("body").append("<div class='tooltip' id='"+id+"'></div>");
		tooltip = $("#"+id);
		if(width){
			tooltip.css("width", width);
		}
		hideTooltip();
	}

	function hideTooltip(){
		tooltip.hide();
	}

	function showTooltip(data, event){
		tooltip.html(data);
		tooltip.show();
		updatePosition(event);
	}

	function updatePosition(event){
		var xOffset = 20;
		var yOffset = 10;

		var toolTipWidth = tooltip.width();
		var toolTipHeight = tooltip.height();
		var windowX = $(window).scrollTop();
		var windowY = $(window).scrollLeft();
		var curX = event.pageX;
		var curY = event.pageY;
		var tooltipLeft = ((curX) < $(window).width() / 2) ? curX - toolTipWidth - xOffset*2 : curX + xOffset;
		if (tooltipLeft < windowX + xOffset){
		  tooltipLeft = windowX + xOffset;
		} 
		var tooltipTop = ((curY - windowY + yOffset*2 + toolTipHeight) > $(window).height()) ? curY - toolTipHeight - yOffset*2 : curY + yOffset;
		if (tooltipTop < windowY + yOffset){
			tooltipTop = curY + yOffset;
		} 
		tooltip.css('top', tooltipTop + 'px').css('left', tooltipLeft + 'px');
	}

	init();
	return {
		showTooltip: showTooltip,
		hideTooltip: hideTooltip,
		updatePosition: updatePosition
	}
}
