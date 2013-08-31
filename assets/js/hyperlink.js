function addHyperlink(sourceList, destinationList) {
	//lists in format of [{resource, selector, [tags,...]},...]
	insertHyperlink("System", function(tx, results){
		var hyperlinkId = results.insertId;
		async.timesSeries(sourceList.length, function(i, done){
			console.log(i);
				var source = sourceList[i];
				addResource(source.resource.url, source.resource.type, function(resourceId){
					if (i<sourceList.length-1) {done(null)};
					console.log("Resource added" + i);
					var resourceId = 1;
					addSelector(resourceId, source.selector.xPointer, function(selectorId){
						console.log("Selector added" + i);
						addSource(hyperlinkId, selectorId, function(){
							console.log("Source added" + i);
						});
					});
				});
		});
	});
}

function insertHyperlink(creator, callback){
	var query = "INSERT INTO hyperlink(creator, createdAt, visited) VALUES (?, ?, ?);";
	var date = new Date();
	insert(query, [creator, date.toISOString(), 0], callback);
}

function getHyperlink(where, callback){
	var what = ["creator", "createdAt", "visited"];
	var from = "hyperlink";
	select(what, from, where, callback);
}
