//not used anymore
function Resource(){
	this.init = function init(obj){
		this.id = obj.id;
		this.url = obj.url;
		this.type = obj.type;
	}

	this.selectors = function selectors(callback){
		getSelectors({"resourceId":this.id}, function(tx, results){
			var res = [];
			for (var i = 0; i < results.length; i++) {
				var selector = new Selector();
				selector.init(results[i]);
				res.push(selector);
				callback(tx, res);
			};
		});
	}
}

function resourceById(id){
	var r = new Resource();
	getResource({"id":id}, function(tx, res){
		r.init(res[0]);
	});
	return r;
}
