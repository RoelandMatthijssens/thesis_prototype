//not used, but drawing a line between two points (x1,y1) and (x2, y2)
//can be done with the draw line function.

function DrawLine(x1, y1, x2, y2, container, id){

	if(y1 < y2){
		var pom = y1;
		y1 = y2;
		y2 = pom;
		pom = x1;
		x1 = x2;
		x2 = pom;
	}

	var a = Math.abs(x1-x2);
	var b = Math.abs(y1-y2);
	var c;
	var sx = (x1+x2)/2 ;
	var sy = (y1+y2)/2 ;
	var width = Math.sqrt(a*a + b*b ) ;
	var x = sx - width/2;
	var y = sy;

	a = width / 2;

	c = Math.abs(sx-x);

	b = Math.sqrt(Math.abs(x1-x)*Math.abs(x1-x)+Math.abs(y1-y)*Math.abs(y1-y) );

	var cosb = (b*b - a*a - c*c) / (2*a*c);
	var rad = Math.acos(cosb);
	var deg = (rad*180)/Math.PI

	htmlns = "http://www.w3.org/1999/xhtml";
	div = document.createElementNS(htmlns, "div");
	div.setAttribute('class', id);
	div.setAttribute('style','border:1px solid black;width:'+width+'px;height:0px;-moz-transform:rotate('+deg+'deg);-webkit-transform:rotate('+deg+'deg);position:absolute;top:'+y+'px;left:'+x+'px;');		

	container.append(div);
}

function getElementPosition(frameId, elementId){
	var frame = getFrame(frameId);
	var frameWindow = frame.contentWindow;
	var relativePos = getRelativeElementPosition(frameWindow, elementId);
	var rx = relativePos[0];
	var ry = relativePos[1];

	var fTop = $(frame).offset().top;
	var fLeft = $(frame).offset().left;
	var frameY = fTop - $(window).scrollTop();
	var frameX = fLeft - $(window).scrollLeft();

	var x = frameX + Math.max(0, rx);
	var y = frameY + Math.max(0, ry);

	return [x, y];
}

function getRelativeElementPosition(wrapper, elementId){
	var element = wrapper.document.getElementById(elementId);
	var eTop = $(element).offset().top;
	var eLeft = $(element).offset().left;
	var t = eTop-$(wrapper).scrollTop();
	var l = eLeft-$(wrapper).scrollLeft();
	var pos = [l, t];
	console.log(element);
	return pos;
}


function lala(){
	$(".line").remove();
	var pos = getElementPosition(1,"logo-title");
	var c = $("body");
	DrawLine(0,0,pos[0], pos[1], c, "line");
}
