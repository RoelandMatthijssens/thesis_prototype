function addHyperlink(sourceList, destinationList, tagList) {
	//lists in format of [{resource, selector, [tags,...]},...]
	insertHyperlink("System", function(hyperlinkId){
		async.series([
			function(callback){
				async.timesSeries(sourceList.length, function(i, done){
					var source = sourceList[i];
					addResource(source.resource.url, source.resource.type, function(resourceId){
						addSelector(resourceId, source.selector.xPointer, function(selectorId){
							addSource(hyperlinkId, selectorId, function(sourceId){
								async.timesSeries(tagList["source_"+i].length, function(h, done2){
									console.log(h, tagList["source_"+i])
									addSourceTag(sourceId, tagList["source_"+i][h], function(){done2(null)});
								}, function(){done(null)});
							});
						});
					});
				}, function(){callback(null)});
			}, function(callback){
				async.timesSeries(destinationList.length, function(i, done){
					var destination = destinationList[i];
					addResource(destination.resource.url, destination.resource.type, function(resourceId){
						addSelector(resourceId, destination.selector.xPointer, function(selectorId){
							addDestination(hyperlinkId, selectorId, function(destinationId){
								async.timesSeries(tagList["dest_"+i].length, function(h, done2){
									addDestinationTag(destinationId, tagList["dest_"+i][h], function(){done2(null)});
								}, function(){done(null)});
							});
						});
					});
			}, function(){callback(null)});
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
