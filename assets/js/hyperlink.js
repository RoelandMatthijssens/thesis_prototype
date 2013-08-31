function addHyperlink(sourceList, destinationList) {
	//lists in format of [{resource, selector, [tags,...]},...]
	insertHyperlink("System", function(tx, results){
		var hyperlinkId = results.insertId;
		async.series([function(callback){
			async.timesSeries(sourceList.length, function(i, done){
					var source = sourceList[i];
					addResource(source.resource.url, source.resource.type, function(resourceId){
						console.log("Resource added" + i);
						addSelector(resourceId, source.selector.xPointer, function(selectorId){
							console.log("Selector added" + i);
							addSource(hyperlinkId, selectorId, function(){
								console.log("Source added" + i);
						if (i<sourceList.length-1) {done(null)};
			callback(null);
							});
						});
					});
			});
		}, function(){

			async.timesSeries(destinationList.length, function(i, done){
					var destination = destinationList[i];
					addResource(destination.resource.url, destination.resource.type, function(resourceId){
						console.log("Resource added" + i);
						addSelector(resourceId, destination.selector.xPointer, function(selectorId){
							console.log("Selector added" + i);
							addDestination(hyperlinkId, selectorId, function(){
								console.log("Destination added" + i);
						if (i<destinationList.length-1) {done(null)};
							});
						});
					});
			});
		}]);

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
