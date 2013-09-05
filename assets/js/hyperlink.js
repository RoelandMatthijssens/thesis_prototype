function addHyperlink(sourceList, destinationList, tagList) {
	//lists in format of [{resource, selector, [tags,...]},...]
	insertHyperlink("System", function(hyperlinkId){
		async.series([function(callback){
			async.timesSeries(sourceList.length, function(i, done){
					var source = sourceList[i];
					addResource(source.resource.url, source.resource.type, function(resourceId){
						console.log("Resource added" + i);
						addSelector(resourceId, source.selector.xPointer, function(selectorId){
							console.log("Selector added" + i);
							addSource(hyperlinkId, selectorId, function(sourceId){
								console.log("Source added" + i);
								async.timesSeries(tagList["source_"+i].length, function(h, done2){
									addSourceTag(sourceId, tagList["source_"+i][h], nullHandler);
									if(h<tagList["source_"+i].length-1){
										done2(null);
									} else if(i<sourceList.length-1){
										done(null);
									} else {
										callback(null);
									}
								}, function(){callback(null)});
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
							addDestination(hyperlinkId, selectorId, function(destinationId){
								console.log("Destination added" + i);
								async.timesSeries(tagList["dest_"+i].length, function(h, done2){
									addDestinationTag(destinationId, tagList["dest_"+i][h], nullHandler);
									if(h<tagList["dest_"+i].length-1){
										done2(null);
									} else if(i<destinationList.length-1){
										done(null);
									}
								}, nullHandler);
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
	var what = ["id", "creator", "createdAt", "visited"];
	var from = "hyperlink";
	select(what, from, where, callback);
}
