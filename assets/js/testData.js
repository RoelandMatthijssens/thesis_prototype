function genTestData (url, amount) {
	for (var i = 0; i < amount; i++) {
		amount[i]
	};
	var i = 0;
	var data = [];
	while(i<amount){
		var d = genData(url);
		d.selector.xPointer = i + d.selector.xPointer;
		data.push(d);
		i++;
	}
	return data;
}

function genData (url) {
	var resource = {};
	var selector = {};
	var tags = [];
	resource.url = url;
	resource.type= "html";
	selector.xPointer = randomString("10");
	var data = {"resource":resource, "selector":selector, "tags":tags};
	return data;
}

function randomString(l){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for( var i=0; i < l; i++ ){
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
